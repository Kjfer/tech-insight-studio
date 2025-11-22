import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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

interface HeroSlide {
  id: string;
  title: string;
  highlight: string;
  description: string;
  image_url: string;
  order_index: number;
}

const HeroSlidesManager = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    highlight: "",
    description: "",
    image_url: "",
    order_index: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .order("order_index");
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los slides",
        variant: "destructive",
      });
    } else {
      setSlides(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      const { error } = await supabase
        .from("hero_slides")
        .update(formData)
        .eq("id", editingId);
      
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo actualizar el slide",
          variant: "destructive",
        });
      } else {
        toast({ title: "Slide actualizado correctamente" });
        setIsOpen(false);
        setEditingId(null);
        resetForm();
        fetchSlides();
      }
    } else {
      const { error } = await supabase
        .from("hero_slides")
        .insert([formData]);
      
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo crear el slide",
          variant: "destructive",
        });
      } else {
        toast({ title: "Slide creado correctamente" });
        setIsOpen(false);
        resetForm();
        fetchSlides();
      }
    }
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingId(slide.id);
    setFormData({
      title: slide.title,
      highlight: slide.highlight,
      description: slide.description,
      image_url: slide.image_url,
      order_index: slide.order_index,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este slide?")) return;
    
    const { error } = await supabase
      .from("hero_slides")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el slide",
        variant: "destructive",
      });
    } else {
      toast({ title: "Slide eliminado correctamente" });
      fetchSlides();
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      highlight: "",
      description: "",
      image_url: "",
      order_index: slides.length,
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Slides del Hero</h2>
          <p className="text-muted-foreground">Gestiona las imágenes del carrusel principal</p>
        </div>
        <Button onClick={() => {
          resetForm();
          setIsOpen(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Slide
        </Button>
      </div>

      <div className="grid gap-4">
        {slides.map((slide) => (
          <Card key={slide.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex-1">
                <h3 className="font-semibold">{slide.title}</h3>
                <p className="text-sm text-muted-foreground">{slide.highlight}</p>
                <p className="text-xs text-muted-foreground mt-1">Orden: {slide.order_index}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(slide)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(slide.id)}>
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
            <SheetTitle>{editingId ? "Editar Slide" : "Nuevo Slide"}</SheetTitle>
            <SheetDescription>
              Completa la información del slide
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
              <Label htmlFor="highlight">Texto Destacado</Label>
              <Input
                id="highlight"
                value={formData.highlight}
                onChange={(e) => setFormData({ ...formData, highlight: e.target.value })}
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
              <Label htmlFor="order">Orden</Label>
              <Input
                id="order"
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
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

export default HeroSlidesManager;
