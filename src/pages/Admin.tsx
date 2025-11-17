import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HeroSlidesManager from "@/components/admin/HeroSlidesManager";
import ServicesManager from "@/components/admin/ServicesManager";
import TemplatesManager from "@/components/admin/TemplatesManager";
import CategoriesManager from "@/components/admin/CategoriesManager";
import KeywordsManager from "@/components/admin/KeywordsManager";
import AboutUsManager from "@/components/admin/AboutUsManager";
import ValuesManager from "@/components/admin/ValuesManager";
import TeamManager from "@/components/admin/TeamManager";
import ClientsManager from "@/components/admin/ClientsManager";

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);

      if (roles && roles.some(r => r.role === "admin")) {
        setIsAdmin(true);
      } else {
        navigate("/");
        toast({
          title: "Acceso denegado",
          description: "No tienes permisos de administrador.",
          variant: "destructive",
        });
      }
      
      setLoading(false);
    };

    checkAuth();
  }, [navigate, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente.",
    });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Cargando...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="hero" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="services">Servicios</TabsTrigger>
            <TabsTrigger value="templates">Plantillas</TabsTrigger>
            <TabsTrigger value="categories">Categorías</TabsTrigger>
            <TabsTrigger value="keywords">Palabras Clave</TabsTrigger>
            <TabsTrigger value="about">Nosotros</TabsTrigger>
            <TabsTrigger value="values">Valores</TabsTrigger>
            <TabsTrigger value="team">Equipo</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <HeroSlidesManager />
          </TabsContent>

          <TabsContent value="services">
            <ServicesManager />
          </TabsContent>

          <TabsContent value="templates">
            <TemplatesManager />
          </TabsContent>

          <TabsContent value="categories">
            <CategoriesManager />
          </TabsContent>

          <TabsContent value="keywords">
            <KeywordsManager />
          </TabsContent>

          <TabsContent value="about">
            <AboutUsManager />
          </TabsContent>

          <TabsContent value="values">
            <ValuesManager />
          </TabsContent>

          <TabsContent value="team">
            <TeamManager />
          </TabsContent>

          <TabsContent value="clients">
            <ClientsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
