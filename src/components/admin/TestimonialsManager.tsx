import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Star, Pencil } from "lucide-react";
import ImageUpload from "./ImageUpload";

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openSheet, setOpenSheet] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    image_url: "",
    rating: 5,
    order_index: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("order_index");
    
    if (!error && data) {
      setTestimonials(data);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      role: "",
      company: "",
      content: "",
      image_url: "",
      rating: 5,
      order_index: testimonials.length,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      const { error } = await supabase
        .from("testimonials")
        .update(formData)
        .eq("id", editingItem.id);
      
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo actualizar el testimonio.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Éxito",
        description: "Testimonio actualizado correctamente.",
      });
    } else {
      const { error } = await supabase
        .from("testimonials")
        .insert([formData]);
      
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo crear el testimonio.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Éxito",
        description: "Testimonio creado correctamente.",
      });
    }
    
    setOpenSheet(false);
    resetForm();
    fetchTestimonials();
  };

  const handleEdit = (testimonial: any) => {
    setEditingItem(testimonial);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company || "",
      content: testimonial.content,
      image_url: testimonial.image_url || "",
      rating: testimonial.rating || 5,
      order_index: testimonial.order_index,
    });
    setOpenSheet(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este testimonio?")) return;
    
    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el testimonio.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Éxito",
      description: "Testimonio eliminado correctamente.",
    });
    
    fetchTestimonials();
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Testimonios</h3>
          <p className="text-sm text-muted-foreground">Total: {testimonials.length}</p>
        </div>
        <Sheet open={openSheet} onOpenChange={(open) => { setOpenSheet(open); if (!open) resetForm(); }}>
          <SheetTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="mr-2 h-4 w-4" /> Agregar Testimonio
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>{editingItem ? "Editar" : "Agregar"} Testimonio</SheetTitle>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre * ({formData.name.length}/100)</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    maxLength={100}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Cargo * ({formData.role.length}/100)</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    maxLength={100}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Empresa ({formData.company.length}/100)</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    maxLength={100}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating">Calificación</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="rating"
                      type="number"
                      min="1"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                      className="w-20"
                    />
                    <div className="flex gap-1">
                      {Array.from({ length: formData.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order_index">Orden</Label>
                  <Input
                    id="order_index"
                    type="number"
                    value={formData.order_index}
                    onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Testimonio * ({formData.content.length}/300)</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  maxLength={300}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Imagen</Label>
                <ImageUpload
                  currentImageUrl={formData.image_url}
                  onImageUploaded={(url) => setFormData({ ...formData, image_url: url })}
                  onImageDeleted={() => setFormData({ ...formData, image_url: "" })}
                  recommendedSpecs="Recomendado: 200x200px, máx 500KB"
                />
              </div>

              <Button type="submit" className="w-full">
                {editingItem ? "Actualizar" : "Crear"} Testimonio
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {testimonial.image_url && (
                    <img
                      src={testimonial.image_url}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{testimonial.role}</p>
                    {testimonial.company && (
                      <p className="text-sm text-primary truncate">{testimonial.company}</p>
                    )}
                    <div className="flex gap-1 my-2">
                      {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-sm italic line-clamp-3 break-words">"{testimonial.content}"</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(testimonial)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(testimonial.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsManager;
