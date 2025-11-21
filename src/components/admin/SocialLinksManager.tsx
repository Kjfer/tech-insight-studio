import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, Linkedin, Instagram, Facebook, Twitter, Youtube, Mail } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaTiktok, FaWhatsapp } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  order_index: number;
}

const SOCIAL_ICONS = [
  { name: "Linkedin", label: "LinkedIn", component: Linkedin },
  { name: "Instagram", label: "Instagram", component: Instagram },
  { name: "Facebook", label: "Facebook", component: Facebook },
  { name: "Twitter", label: "Twitter/X", component: Twitter },
  { name: "Youtube", label: "YouTube", component: Youtube },
  { name: "FaTiktok", label: "TikTok", component: FaTiktok },
  { name: "FaWhatsapp", label: "WhatsApp", component: FaWhatsapp },
  { name: "Mail", label: "Email", component: Mail },
];

const SocialLinksManager = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    platform: "",
    url: "",
    icon: "",
    order_index: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .order("order_index");
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los enlaces sociales",
        variant: "destructive",
      });
    } else {
      setSocialLinks(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      const { error } = await supabase
        .from("social_links")
        .update(formData)
        .eq("id", editingId);
      
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo actualizar el enlace social",
          variant: "destructive",
        });
      } else {
        toast({ title: "Enlace social actualizado correctamente" });
        setIsOpen(false);
        setEditingId(null);
        resetForm();
        fetchSocialLinks();
      }
    } else {
      const { error } = await supabase
        .from("social_links")
        .insert([formData]);
      
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo crear el enlace social",
          variant: "destructive",
        });
      } else {
        toast({ title: "Enlace social creado correctamente" });
        setIsOpen(false);
        resetForm();
        fetchSocialLinks();
      }
    }
  };

  const handleEdit = (link: SocialLink) => {
    setEditingId(link.id);
    setFormData({
      platform: link.platform,
      url: link.url,
      icon: link.icon,
      order_index: link.order_index,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este enlace social?")) return;
    
    const { error } = await supabase
      .from("social_links")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el enlace social",
        variant: "destructive",
      });
    } else {
      toast({ title: "Enlace social eliminado correctamente" });
      fetchSocialLinks();
    }
  };

  const resetForm = () => {
    setFormData({
      platform: "",
      url: "",
      icon: "",
      order_index: 0,
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Enlaces de Redes Sociales</h2>
          <p className="text-muted-foreground">Gestiona los enlaces de redes sociales</p>
        </div>
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Enlace
        </Button>
      </div>

      <div className="grid gap-4">
        {socialLinks.map((link) => (
          <Card key={link.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex-1">
                <h3 className="font-semibold">{link.platform}</h3>
                <p className="text-sm text-muted-foreground">{link.url}</p>
                <p className="text-xs text-muted-foreground mt-1">Icono: {link.icon}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(link)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(link.id)}>
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
            <SheetTitle>{editingId ? "Editar Enlace Social" : "Nuevo Enlace Social"}</SheetTitle>
            <SheetDescription>
              Completa la información del enlace social
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div>
              <Label htmlFor="platform">Plataforma</Label>
              <Input
                id="platform"
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                placeholder="LinkedIn, Instagram, TikTok, etc."
                required
              />
            </div>
            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://..."
                required
              />
            </div>
            <div>
              <Label htmlFor="icon">Red Social</Label>
              <Select
                value={formData.icon}
                onValueChange={(value) => setFormData({ ...formData, icon: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una red social" />
                </SelectTrigger>
                <SelectContent>
                  {SOCIAL_ICONS.map((icon) => {
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
            <div>
              <Label htmlFor="order_index">Orden</Label>
              <Input
                id="order_index"
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
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

export default SocialLinksManager;
