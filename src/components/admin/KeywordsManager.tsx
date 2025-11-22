import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface Keyword {
  id: string;
  name: string;
}

const KeywordsManager = () => {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchKeywords();
  }, []);

  const fetchKeywords = async () => {
    const { data, error } = await supabase
      .from("keywords")
      .select("*")
      .order("name");
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar las palabras clave",
        variant: "destructive",
      });
    } else {
      setKeywords(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      const { error } = await supabase
        .from("keywords")
        .update(formData)
        .eq("id", editingId);
      
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo actualizar la palabra clave",
          variant: "destructive",
        });
      } else {
        toast({ title: "Palabra clave actualizada correctamente" });
        setIsOpen(false);
        setEditingId(null);
        resetForm();
        fetchKeywords();
      }
    } else {
      const { error } = await supabase
        .from("keywords")
        .insert([formData]);
      
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo crear la palabra clave",
          variant: "destructive",
        });
      } else {
        toast({ title: "Palabra clave creada correctamente" });
        setIsOpen(false);
        resetForm();
        fetchKeywords();
      }
    }
  };

  const handleEdit = (keyword: Keyword) => {
    setEditingId(keyword.id);
    setFormData({
      name: keyword.name,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta palabra clave?")) return;
    
    const { error } = await supabase
      .from("keywords")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar la palabra clave",
        variant: "destructive",
      });
    } else {
      toast({ title: "Palabra clave eliminada correctamente" });
      fetchKeywords();
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Palabras Clave</h2>
          <p className="text-muted-foreground">Gestiona palabras clave para SEO</p>
        </div>
        <Button onClick={() => {
          resetForm();
          setIsOpen(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Palabra Clave
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {keywords.map((keyword) => (
          <Card key={keyword.id}>
            <CardContent className="flex items-center justify-between p-4">
              <span className="font-medium">{keyword.name}</span>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => handleEdit(keyword)}>
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(keyword.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="overflow-y-auto w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{editingId ? "Editar Palabra Clave" : "Nueva Palabra Clave"}</SheetTitle>
            <SheetDescription>
              Completa la información de la palabra clave
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
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

export default KeywordsManager;
