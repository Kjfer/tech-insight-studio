import { Code2, FileSpreadsheet, BarChart3, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Lightbulb,
      title: "Asesoría Tecnológica",
      description: "Consultoría especializada para optimizar procesos, implementar soluciones tecnológicas y transformar digitalmente tu organización.",
      features: ["Análisis de procesos", "Arquitectura de soluciones", "Transformación digital"],
    },
    {
      icon: FileSpreadsheet,
      title: "Plantillas de Excel",
      description: "Herramientas avanzadas con macros, dashboards dinámicos y automatizaciones para gestión empresarial eficiente.",
      features: ["Dashboards interactivos", "Automatización VBA", "Análisis financiero"],
    },
    {
      icon: Code2,
      title: "Plantillas de Python",
      description: "Scripts y notebooks especializados para análisis de datos, automatización de tareas y desarrollo de soluciones personalizadas.",
      features: ["Análisis de datos", "Web scraping", "Machine Learning"],
    },
    {
      icon: BarChart3,
      title: "Plantillas de Power BI",
      description: "Reportes profesionales y dashboards interactivos para visualización de datos y business intelligence empresarial.",
      features: ["Visualización avanzada", "KPIs dinámicos", "Integración de datos"],
    },
  ];

  return (
    <section id="servicios" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Nuestros <span className="text-primary">Servicios</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluciones tecnológicas especializadas diseñadas para impulsar la eficiencia y el crecimiento de tu negocio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="hover-lift bg-card border-border group cursor-pointer"
            >
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-smooth">
                  <service.icon className="text-white" size={32} />
                </div>
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
