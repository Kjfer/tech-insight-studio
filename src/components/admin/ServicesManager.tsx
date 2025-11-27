import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, Code, Database, Globe, Server, Cloud, Cpu, Settings, Workflow } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  redirect_link: string | null;
}

const SERVICE_ICONS = [
  { name: "Code", label: "Código", component: Code },
  { name: "Database", label: "Base de datos", component: Database },
  { name: "Globe", label: "Web", component: Globe },
  { name: "Server", label: "Servidor", component: Server },
  { name: "Cloud", label: "Nube", component: Cloud },
  { name: "Cpu", label: "Procesador", component: Cpu },
  { name: "Settings", label: "Configuración", component: Settings },
  { name: "Workflow", label: "Flujo de trabajo", component: Workflow },
];

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
    redirect_link: null as string | null,
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
      redirect_link: service.redirect_link,
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
      redirect_link: null,
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
        <Button onClick={() => {
          resetForm();
          setIsOpen(true);
        }}>
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
              <Label htmlFor="title">Título ({formData.title.length}/100)</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                maxLength={100}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Descripción ({formData.description.length}/300)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                maxLength={300}
                required
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="icon">Icono</Label>
              <Select
                value={formData.icon}
                onValueChange={(value) => setFormData({ ...formData, icon: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un icono" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_ICONS.map((icon) => {
                    const IconComponent = icon.component;
                    return (
                      <SelectItem key={icon.name} value={icon.name}>
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          <span>{icon.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Imagen</Label>
              <ImageUpload
                currentImageUrl={formData.image_url}
                onImageUploaded={(url) => setFormData({ ...formData, image_url: url })}
                onImageDeleted={() => setFormData({ ...formData, image_url: "" })}
              />
            </div>
            <div>
              <Label htmlFor="redirect_link">Enlace de Redirección</Label>
              <Select
                value={formData.redirect_link || "none"}
                onValueChange={(value) => setFormData({ ...formData, redirect_link: value === "none" ? null : value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una redirección" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sin redirección</SelectItem>
                  <SelectItem value="/portafolio">Portafolio</SelectItem>
                  <SelectItem value="/business-intelligence">Business Intelligence</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Si seleccionas una redirección, se mostrará un botón "Ver más" en la card del servicio
              </p>
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
