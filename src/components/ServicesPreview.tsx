import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, FileSpreadsheet, Code, Lightbulb } from "lucide-react";
import consultingImg from "@/assets/service-consulting.jpg";
import excelImg from "@/assets/service-excel.jpg";
import pythonImg from "@/assets/service-python.jpg";
import powerbiImg from "@/assets/service-powerbi.jpg";

const ServicesPreview = () => {
  const services = [
    {
      icon: Lightbulb,
      title: "Asesoría Tecnológica",
      description: "Consultoría estratégica en implementación de soluciones tecnológicas",
      image: consultingImg,
    },
    {
      icon: BarChart3,
      title: "Business Intelligence",
      description: "Sistemas de análisis y visualización de datos personalizados",
      image: powerbiImg,
    },
    {
      icon: Code,
      title: "Desarrollo Web",
      description: "Soluciones integrales para control y gestión empresarial",
      image: pythonImg,
    },
    {
      icon: FileSpreadsheet,
      title: "Automatización",
      description: "Optimización de procesos mediante herramientas especializadas",
      image: excelImg,
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
            <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden group">
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-3 left-3 w-10 h-10 bg-primary/90 rounded-lg flex items-center justify-center">
                  <service.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <CardHeader>
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
