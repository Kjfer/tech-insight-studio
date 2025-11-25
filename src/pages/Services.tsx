import { Code2, FileSpreadsheet, BarChart3, Lightbulb, LucideIcon, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useServices } from "@/hooks/useSupabaseData";

const iconMap: Record<string, LucideIcon> = {
  Lightbulb,
  BarChart3,
  Code2,
  FileSpreadsheet,
};

const Services = () => {
  const { services, loading } = useServices();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Nuestros <span className="text-primary">Servicios</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Soluciones tecnológicas especializadas diseñadas para impulsar la eficiencia y el crecimiento de tu negocio
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Cargando servicios...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service) => {
                  const IconComponent = iconMap[service.icon] || Lightbulb;
                  return (
                    <Card
                      key={service.id}
                      className="hover-lift bg-card border-border group cursor-pointer overflow-hidden"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={service.image_url} 
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                          <IconComponent className="text-white" size={24} />
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl mb-2 break-words">{service.title}</CardTitle>
                        <CardDescription className="text-base line-clamp-3 break-words">{service.description}</CardDescription>
                      </CardHeader>
                      {service.redirect_link && (
                        <CardContent className="pt-0">
                          <Link to={service.redirect_link}>
                            <Button variant="outline" size="sm" className="w-full gap-2">
                              Ver más
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Services;
