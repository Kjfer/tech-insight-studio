import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2 } from "lucide-react";

interface Keyword {
  id: string;
  name: string;
}

const KeywordsManager = () => {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
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
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Editar Palabra Clave" : "Nueva Palabra Clave"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">
                {editingId ? "Actualizar" : "Crear"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

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
    </div>
  );
};

export default KeywordsManager;
