import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LogOut, 
  Image, 
  Briefcase, 
  FileText, 
  Folder, 
  Tag, 
  Info, 
  Heart, 
  Users, 
  Building2 
} from "lucide-react";
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

  const sections = [
    {
      category: "Contenido Principal",
      items: [
        { value: "hero", label: "Slides Hero", icon: Image, description: "Gestiona las imágenes del carrusel principal" },
        { value: "services", label: "Servicios", icon: Briefcase, description: "Administra los servicios ofrecidos" },
        { value: "templates", label: "Plantillas", icon: FileText, description: "Gestiona las plantillas disponibles" },
      ]
    },
    {
      category: "Configuración",
      items: [
        { value: "categories", label: "Categorías", icon: Folder, description: "Organiza categorías de plantillas" },
        { value: "keywords", label: "Palabras Clave", icon: Tag, description: "Gestiona palabras clave para SEO" },
      ]
    },
    {
      category: "Información de Empresa",
      items: [
        { value: "about", label: "Nosotros", icon: Info, description: "Misión, visión e historia" },
        { value: "values", label: "Valores", icon: Heart, description: "Valores corporativos" },
        { value: "team", label: "Equipo", icon: Users, description: "Miembros del equipo" },
        { value: "clients", label: "Clientes", icon: Building2, description: "Logos de clientes" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Panel de Administración
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Gestiona todo el contenido de tu sitio web</p>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="hero" className="space-y-8">
          <div className="space-y-6">
            {sections.map((section) => (
              <Card key={section.category} className="border-muted/40">
                <CardHeader>
                  <CardTitle className="text-lg">{section.category}</CardTitle>
                </CardHeader>
                <TabsList className="grid w-full gap-2 h-auto bg-transparent p-4 pt-0" style={{ gridTemplateColumns: `repeat(${section.items.length}, 1fr)` }}>
                  {section.items.map((item) => (
                    <TabsTrigger 
                      key={item.value} 
                      value={item.value}
                      className="flex flex-col items-center gap-2 h-auto py-4 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Card>
            ))}
          </div>

          <div className="mt-8">
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
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
