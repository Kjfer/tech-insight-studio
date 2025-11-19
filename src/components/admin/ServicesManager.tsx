import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ImageUpload from "./ImageUpload";

interface Service {
  id: string;
  title: string;
  description: string;
  image_url: string;
  icon: string;
  show_in_home: boolean;
}

const ServicesManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    icon: "",
    show_in_home: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("created_at");
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los servicios",
        variant: "destructive",
      });
    } else {
      setServices(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      const { error } = await supabase
        .from("services")
        .update(formData)
        .eq("id", editingId);
      
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo actualizar el servicio",
          variant: "destructive",
        });
      } else {
        toast({ title: "Servicio actualizado correctamente" });
        setIsOpen(false);
        setEditingId(null);
        resetForm();
        fetchServices();
      }
    } else {
      const { error } = await supabase
        .from("services")
        .insert([formData]);
      
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo crear el servicio",
          variant: "destructive",
        });
      } else {
        toast({ title: "Servicio creado correctamente" });
        setIsOpen(false);
        resetForm();
        fetchServices();
      }
    }
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      description: service.description,
      image_url: service.image_url,
      icon: service.icon,
      show_in_home: service.show_in_home,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este servicio?")) return;
    
    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el servicio",
        variant: "destructive",
      });
    } else {
      toast({ title: "Servicio eliminado correctamente" });
      fetchServices();
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image_url: "",
      icon: "",
      show_in_home: false,
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Servicios</h2>
          <p className="text-muted-foreground">Administra los servicios ofrecidos</p>
        </div>
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Servicio
        </Button>
      </div>

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex-1">
                <h3 className="font-semibold">{service.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                {service.show_in_home && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded mt-1 inline-block">
                    En inicio
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(service)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(service.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="overflow-y-auto w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{editingId ? "Editar Servicio" : "Nuevo Servicio"}</SheetTitle>
            <SheetDescription>
              Completa la información del servicio
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="icon">Icono (nombre de lucide-react)</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="ej: Code, Database, Globe"
                required
              />
            </div>
            <div>
              <Label>Imagen</Label>
              <ImageUpload
                onImageUploaded={(url) => setFormData({ ...formData, image_url: url })}
                currentImageUrl={formData.image_url}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="show_in_home"
                checked={formData.show_in_home}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, show_in_home: checked as boolean })
                }
              />
              <Label htmlFor="show_in_home" className="cursor-pointer">
                Mostrar en página principal
              </Label>
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                {editingId ? "Actualizar" : "Crear"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ServicesManager;
