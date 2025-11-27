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
  price_usd: number | null;
  video_url: string | null;
  is_featured: boolean;
}

interface Category {
  id: string;
  name: string;
}

const TemplatesManager = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [keywords, setKeywords] = useState<{ id: string; name: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    category_id: "",
    price: "",
    price_usd: "",
    video_url: "",
    is_featured: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchTemplates();
    fetchCategories();
    fetchKeywords();
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

  const fetchKeywords = async () => {
    const { data } = await supabase
      .from("keywords")
      .select("*")
      .order("name");
    
    setKeywords(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const dataToSubmit = {
      ...formData,
      price: formData.price ? parseFloat(formData.price) : null,
      price_usd: formData.price_usd ? parseFloat(formData.price_usd) : null,
      category_id: formData.category_id || null,
      video_url: formData.video_url || null,
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
        // Update keywords
        await updateTemplateKeywords(editingId);
        toast({ title: "Plantilla actualizada correctamente" });
        setIsOpen(false);
        setEditingId(null);
        resetForm();
        fetchTemplates();
      }
    } else {
      const { data: newTemplate, error } = await supabase
        .from("templates")
        .insert([dataToSubmit])
        .select()
        .single();
      
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo crear la plantilla",
          variant: "destructive",
        });
      } else {
        // Add keywords
        await updateTemplateKeywords(newTemplate.id);
        toast({ title: "Plantilla creada correctamente" });
        setIsOpen(false);
        resetForm();
        fetchTemplates();
      }
    }
  };

  const updateTemplateKeywords = async (templateId: string) => {
    // Delete existing keywords
    await supabase
      .from("template_keywords")
      .delete()
      .eq("template_id", templateId);

    // Insert new keywords
    if (selectedKeywords.length > 0) {
      const keywordRecords = selectedKeywords.map(keywordId => ({
        template_id: templateId,
        keyword_id: keywordId
      }));
      
      await supabase
        .from("template_keywords")
        .insert(keywordRecords);
    }
  };

  const handleEdit = async (template: Template) => {
    setEditingId(template.id);
    setFormData({
      title: template.title,
      description: template.description,
      image_url: template.image_url || "",
      category_id: template.category_id || "",
      price: template.price?.toString() || "",
      price_usd: template.price_usd?.toString() || "",
      video_url: template.video_url || "",
      is_featured: template.is_featured,
    });
    
    // Fetch keywords for this template
    const { data: templateKeywords } = await supabase
      .from("template_keywords")
      .select("keyword_id")
      .eq("template_id", template.id);
    
    setSelectedKeywords(templateKeywords?.map(tk => tk.keyword_id) || []);
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
      price_usd: "",
      video_url: "",
      is_featured: false,
    });
    setSelectedKeywords([]);
    setEditingId(null);
  };

  const toggleKeyword = (keywordId: string) => {
    setSelectedKeywords(prev =>
      prev.includes(keywordId)
        ? prev.filter(id => id !== keywordId)
        : [...prev, keywordId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Plantillas</h2>
          <p className="text-muted-foreground">Gestiona las plantillas disponibles</p>
        </div>
        <Button onClick={() => {
          resetForm();
          setIsOpen(true);
        }}>
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
                {(template.price || template.price_usd) && (
                  <div className="flex items-center gap-3 mt-1">
                    {template.price && (
                      <p className="text-sm font-medium">S/. {template.price}</p>
                    )}
                    {template.price_usd && (
                      <p className="text-sm font-medium">${template.price_usd} USD</p>
                    )}
                  </div>
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
                onChange={(e) => {
                  if (e.target.value.length <= 200) {
                    setFormData({ ...formData, description: e.target.value });
                  }
                }}
                required
                maxLength={200}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {formData.description.length}/200 caracteres
              </p>
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
            <div className="grid grid-cols-2 gap-4">
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
                <Label htmlFor="price_usd">Precio (USD)</Label>
                <Input
                  id="price_usd"
                  type="number"
                  step="0.01"
                  value={formData.price_usd}
                  onChange={(e) => setFormData({ ...formData, price_usd: e.target.value })}
                />
              </div>
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
              <Label htmlFor="video_url">Video de YouTube (opcional)</Label>
              <Input
                id="video_url"
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Si agregas un video, se mostrará en lugar de la imagen en la vista detallada
              </p>
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
            <div>
              <Label>Palabras Clave</Label>
              <div className="border rounded-md p-3 max-h-40 overflow-y-auto space-y-2">
                {keywords.map((keyword) => (
                  <div key={keyword.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`keyword-${keyword.id}`}
                      checked={selectedKeywords.includes(keyword.id)}
                      onCheckedChange={() => toggleKeyword(keyword.id)}
                    />
                    <Label
                      htmlFor={`keyword-${keyword.id}`}
                      className="cursor-pointer text-sm"
                    >
                      {keyword.name}
                    </Label>
                  </div>
                ))}
              </div>
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
