import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2 } from "lucide-react";

interface Value {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const ValuesManager = () => {
  const [values, setValues] = useState<Value[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchValues();
  }, []);

  const fetchValues = async () => {
    const { data, error } = await supabase
      .from("values")
      .select("*")
      .order("created_at");
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los valores",
        variant: "destructive",
      });
    } else {
      setValues(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      const { error } = await supabase
        .from("values")
        .update(formData)
        .eq("id", editingId);
      
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo actualizar el valor",
          variant: "destructive",
        });
      } else {
        toast({ title: "Valor actualizado correctamente" });
        setEditingId(null);
        resetForm();
        fetchValues();
      }
    } else {
      const { error } = await supabase
        .from("values")
        .insert([formData]);
      
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo crear el valor",
          variant: "destructive",
        });
      } else {
        toast({ title: "Valor creado correctamente" });
        resetForm();
        fetchValues();
      }
    }
  };

  const handleEdit = (value: Value) => {
    setEditingId(value.id);
    setFormData({
      title: value.title,
      description: value.description,
      icon: value.icon,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este valor?")) return;
    
    const { error } = await supabase
      .from("values")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el valor",
        variant: "destructive",
      });
    } else {
      toast({ title: "Valor eliminado correctamente" });
      fetchValues();
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      icon: "",
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Editar Valor" : "Nuevo Valor"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <Label htmlFor="icon">Icono (nombre de Lucide)</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="Target, Users, Heart, etc."
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

      <div className="grid gap-4 md:grid-cols-2">
        {values.map((value) => (
          <Card key={value.id}>
            <CardContent className="flex items-start justify-between p-4">
              <div className="flex-1">
                <h3 className="font-semibold">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(value)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(value.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ValuesManager;
