import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, Heart, Users, Award, Target, Eye, Lightbulb, Shield, Sparkles } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface Value {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const VALUE_ICONS = [
  { name: "Heart", label: "Corazón", component: Heart },
  { name: "Users", label: "Usuarios", component: Users },
  { name: "Award", label: "Premio", component: Award },
  { name: "Target", label: "Objetivo", component: Target },
  { name: "Eye", label: "Visión", component: Eye },
  { name: "Lightbulb", label: "Innovación", component: Lightbulb },
  { name: "Shield", label: "Seguridad", component: Shield },
  { name: "Sparkles", label: "Excelencia", component: Sparkles },
];

const ValuesManager = () => {
  const [values, setValues] = useState<Value[]>([]);
  const [isOpen, setIsOpen] = useState(false);
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
        setIsOpen(false);
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
        setIsOpen(false);
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
    setIsOpen(true);
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Valores</h2>
          <p className="text-muted-foreground">Valores corporativos</p>
        </div>
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Valor
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {values.map((value) => (
          <Card key={value.id}>
            <CardContent className="flex items-start justify-between p-4">
              <div className="flex-1">
                <h3 className="font-semibold break-words">{value.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 break-words">{value.description}</p>
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

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="overflow-y-auto w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{editingId ? "Editar Valor" : "Nuevo Valor"}</SheetTitle>
            <SheetDescription>
              Completa la información del valor
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
                maxLength={300}
              />
              <p className="text-xs text-muted-foreground mt-1">Máximo 300 caracteres.</p>
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
                  {VALUE_ICONS.map((icon) => {
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

export default ValuesManager;
