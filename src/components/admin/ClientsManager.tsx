import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import ImageUpload from "./ImageUpload";

interface Client {
  id: string;
  name: string;
  logo_url: string;
}

const ClientsManager = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    logo_url: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at");
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los clientes",
        variant: "destructive",
      });
    } else {
      setClients(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from("clients")
      .insert([formData]);
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudo crear el cliente",
        variant: "destructive",
      });
    } else {
      toast({ title: "Cliente agregado correctamente" });
      resetForm();
      fetchClients();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este cliente?")) return;
    
    const { error } = await supabase
      .from("clients")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el cliente",
        variant: "destructive",
      });
    } else {
      toast({ title: "Cliente eliminado correctamente" });
      fetchClients();
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      logo_url: "",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Agregar Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre del Cliente</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <ImageUpload
              currentImageUrl={formData.logo_url}
              onImageUploaded={(url) => setFormData({ ...formData, logo_url: url })}
            />
            <Button type="submit">Agregar Cliente</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {clients.map((client) => (
          <Card key={client.id}>
            <CardContent className="p-4">
              <div className="aspect-square flex items-center justify-center bg-muted rounded mb-2">
                <img
                  src={client.logo_url}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <p className="text-sm font-medium text-center mb-2">{client.name}</p>
              <Button 
                size="sm" 
                variant="destructive" 
                className="w-full"
                onClick={() => handleDelete(client.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientsManager;
