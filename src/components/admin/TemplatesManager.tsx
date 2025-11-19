import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

interface Template {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  category_id: string | null;
  price: number | null;
  is_featured: boolean;
}

interface Category {
  id: string;
  name: string;
}

const TemplatesManager = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    category_id: "",
    price: "",
    is_featured: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchTemplates();
    fetchCategories();
  }, []);

  const fetchTemplates = async () => {
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .order("created_at");
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar las plantillas",
        variant: "destructive",
      });
    } else {
      setTemplates(data || []);
    }
  };

  const fetchCategories = async () => {
    const { data } = await supabase
      .from("template_categories")
      .select("*")
      .order("name");
    
    setCategories(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const dataToSubmit = {
      ...formData,
      price: formData.price ? parseFloat(formData.price) : null,
      category_id: formData.category_id || null,
    };

    if (editingId) {
      const { error } = await supabase
        .from("templates")
        .update(dataToSubmit)
        .eq("id", editingId);
      
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo actualizar la plantilla",
          variant: "destructive",
        });
      } else {
        toast({ title: "Plantilla actualizada correctamente" });
        setIsOpen(false);
        setEditingId(null);
        resetForm();
        fetchTemplates();
      }
    } else {
      const { error } = await supabase
        .from("templates")
        .insert([dataToSubmit]);
      
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo crear la plantilla",
          variant: "destructive",
        });
      } else {
        toast({ title: "Plantilla creada correctamente" });
        setIsOpen(false);
        resetForm();
        fetchTemplates();
      }
    }
  };

  const handleEdit = (template: Template) => {
    setEditingId(template.id);
    setFormData({
      title: template.title,
      description: template.description,
      image_url: template.image_url || "",
      category_id: template.category_id || "",
      price: template.price?.toString() || "",
      is_featured: template.is_featured,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta plantilla?")) return;
    
    const { error } = await supabase
      .from("templates")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar la plantilla",
        variant: "destructive",
      });
    } else {
      toast({ title: "Plantilla eliminada correctamente" });
      fetchTemplates();
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image_url: "",
      category_id: "",
      price: "",
      is_featured: false,
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Plantillas</h2>
          <p className="text-muted-foreground">Gestiona las plantillas disponibles</p>
        </div>
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Plantilla
        </Button>
      </div>

      <div className="grid gap-4">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex-1">
                <h3 className="font-semibold">{template.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
                {template.price && (
                  <p className="text-sm font-medium mt-1">${template.price}</p>
                )}
                {template.is_featured && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded mt-1 inline-block">
                    Destacada
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(template)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(template.id)}>
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
            <SheetTitle>{editingId ? "Editar Plantilla" : "Nueva Plantilla"}</SheetTitle>
            <SheetDescription>
              Completa la información de la plantilla
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
              <Label htmlFor="category">Categoría</Label>
              <Select
                value={formData.category_id}
                onValueChange={(value) => setFormData({ ...formData, category_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="price">Precio (Soles)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div>
              <Label>Imagen</Label>
              <ImageUpload
                currentImageUrl={formData.image_url}
                onImageUploaded={(url) => setFormData({ ...formData, image_url: url })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, is_featured: checked as boolean })
                }
              />
              <Label htmlFor="is_featured" className="cursor-pointer">
                Marcar como destacada
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

export default TemplatesManager;
