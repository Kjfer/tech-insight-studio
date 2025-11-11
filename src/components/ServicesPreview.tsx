import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, FileSpreadsheet, Code, Lightbulb } from "lucide-react";

const ServicesPreview = () => {
  const services = [
    {
      icon: Lightbulb,
      title: "Asesoría Tecnológica",
      description: "Consultoría estratégica en implementación de soluciones tecnológicas",
    },
    {
      icon: BarChart3,
      title: "Business Intelligence",
      description: "Sistemas de análisis y visualización de datos personalizados",
    },
    {
      icon: Code,
      title: "Desarrollo Web",
      description: "Soluciones integrales para control y gestión empresarial",
    },
    {
      icon: FileSpreadsheet,
      title: "Automatización",
      description: "Optimización de procesos mediante herramientas especializadas",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Nuestros Servicios</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Soluciones tecnológicas integrales para impulsar tu negocio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/servicios">
            <Button size="lg" className="shadow-lg">
              Ver Todos los Servicios
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
