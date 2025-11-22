import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, Folder, FileText, Database, Table, BarChart, FileSpreadsheet, Code, Presentation } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface Category {
  id: string;
  name: string;
  icon: string;
}

const CATEGORY_ICONS = [
  { name: "Folder", label: "Carpeta", component: Folder },
  { name: "FileText", label: "Documento", component: FileText },
  { name: "Database", label: "Base de datos", component: Database },
  { name: "Table", label: "Tabla", component: Table },
  { name: "BarChart", label: "Gráfico", component: BarChart },
  { name: "FileSpreadsheet", label: "Hoja de cálculo", component: FileSpreadsheet },
  { name: "Code", label: "Código", component: Code },
  { name: "Presentation", label: "Presentación", component: Presentation },
];

const CategoriesManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("template_categories")
      .select("*")
      .order("name");
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar las categorías",
        variant: "destructive",
      });
    } else {
      setCategories(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      const { error } = await supabase
        .from("template_categories")
        .update(formData)
        .eq("id", editingId);
      
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo actualizar la categoría",
          variant: "destructive",
        });
      } else {
        toast({ title: "Categoría actualizada correctamente" });
        setIsOpen(false);
        setEditingId(null);
        resetForm();
        fetchCategories();
      }
    } else {
      const { error } = await supabase
        .from("template_categories")
        .insert([formData]);
      
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo crear la categoría",
          variant: "destructive",
        });
      } else {
        toast({ title: "Categoría creada correctamente" });
        setIsOpen(false);
        resetForm();
        fetchCategories();
      }
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      icon: category.icon,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta categoría?")) return;
    
    const { error } = await supabase
      .from("template_categories")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar la categoría",
        variant: "destructive",
      });
    } else {
      toast({ title: "Categoría eliminada correctamente" });
      fetchCategories();
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      icon: "",
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Categorías</h2>
          <p className="text-muted-foreground">Organiza categorías de plantillas</p>
        </div>
        <Button onClick={() => {
          resetForm();
          setIsOpen(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Categoría
        </Button>
      </div>

      <div className="grid gap-4">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex-1">
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-sm text-muted-foreground">Icono: {category.icon}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(category)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(category.id)}>
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
            <SheetTitle>{editingId ? "Editar Categoría" : "Nueva Categoría"}</SheetTitle>
            <SheetDescription>
              Completa la información de la categoría
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
                  {CATEGORY_ICONS.map((icon) => {
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

export default CategoriesManager;
