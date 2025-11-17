import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const AboutUsManager = () => {
  const [aboutData, setAboutData] = useState({
    id: "",
    mission: "",
    vision: "",
    history: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchAboutUs();
  }, []);

  const fetchAboutUs = async () => {
    const { data, error } = await supabase
      .from("about_us")
      .select("*")
      .single();
    
    if (data) {
      setAboutData(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (aboutData.id) {
      const { error } = await supabase
        .from("about_us")
        .update({
          mission: aboutData.mission,
          vision: aboutData.vision,
          history: aboutData.history,
        })
        .eq("id", aboutData.id);
      
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo actualizar",
          variant: "destructive",
        });
      } else {
        toast({ title: "Información actualizada correctamente" });
      }
    } else {
      const { data, error } = await supabase
        .from("about_us")
        .insert([{
          mission: aboutData.mission,
          vision: aboutData.vision,
          history: aboutData.history,
        }])
        .select()
        .single();
      
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo crear",
          variant: "destructive",
        });
      } else {
        setAboutData(data);
        toast({ title: "Información creada correctamente" });
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Editar Sobre Nosotros</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="mission">Misión</Label>
            <Textarea
              id="mission"
              value={aboutData.mission}
              onChange={(e) => setAboutData({ ...aboutData, mission: e.target.value })}
              required
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="vision">Visión</Label>
            <Textarea
              id="vision"
              value={aboutData.vision}
              onChange={(e) => setAboutData({ ...aboutData, vision: e.target.value })}
              required
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="history">Nuestra Historia</Label>
            <Textarea
              id="history"
              value={aboutData.history}
              onChange={(e) => setAboutData({ ...aboutData, history: e.target.value })}
              required
              rows={6}
            />
          </div>
          <Button type="submit">Guardar Cambios</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AboutUsManager;
