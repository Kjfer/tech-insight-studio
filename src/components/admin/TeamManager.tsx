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

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image_url: string | null;
}

const TeamManager = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    description: "",
    image_url: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("created_at");
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los miembros del equipo",
        variant: "destructive",
      });
    } else {
      setMembers(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      const { error } = await supabase
        .from("team_members")
        .update(formData)
        .eq("id", editingId);
      
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo actualizar el miembro",
          variant: "destructive",
        });
      } else {
        toast({ title: "Miembro actualizado correctamente" });
        setIsOpen(false);
        setEditingId(null);
        resetForm();
        fetchMembers();
      }
    } else {
      const { error } = await supabase
        .from("team_members")
        .insert([formData]);
      
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo crear el miembro",
          variant: "destructive",
        });
      } else {
        toast({ title: "Miembro creado correctamente" });
        setIsOpen(false);
        resetForm();
        fetchMembers();
      }
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      role: member.role,
      description: member.description,
      image_url: member.image_url || "",
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este miembro?")) return;
    
    const { error } = await supabase
      .from("team_members")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el miembro",
        variant: "destructive",
      });
    } else {
      toast({ title: "Miembro eliminado correctamente" });
      fetchMembers();
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      description: "",
      image_url: "",
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Equipo</h2>
          <p className="text-muted-foreground">Miembros del equipo</p>
        </div>
        <Button onClick={() => {
          resetForm();
          setIsOpen(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Miembro
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {members.map((member) => (
          <Card key={member.id}>
            <CardContent className="flex items-start justify-between p-4">
              <div className="flex-1">
                <h3 className="font-semibold break-words">{member.name}</h3>
                <p className="text-sm text-primary break-words">{member.role}</p>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-3 break-words">{member.description}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(member)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(member.id)}>
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
            <SheetTitle>{editingId ? "Editar Miembro" : "Nuevo Miembro del Equipo"}</SheetTitle>
            <SheetDescription>
              Completa la información del miembro
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div>
              <Label htmlFor="name">Nombre ({formData.name.length}/100)</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                maxLength={100}
                required
              />
            </div>
            <div>
              <Label htmlFor="role">Cargo ({formData.role.length}/100)</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                maxLength={100}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Descripción ({formData.description.length}/400)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                maxLength={400}
              />
            </div>
            <div>
              <Label>Imagen</Label>
              <ImageUpload
                currentImageUrl={formData.image_url}
                onImageUploaded={(url) => setFormData({ ...formData, image_url: url })}
                onImageDeleted={() => setFormData({ ...formData, image_url: "" })}
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

export default TeamManager;
