import { Code2, FileSpreadsheet, BarChart3, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import consultingImg from "@/assets/service-consulting.jpg";
import excelImg from "@/assets/service-excel.jpg";
import pythonImg from "@/assets/service-python.jpg";
import powerbiImg from "@/assets/service-powerbi.jpg";

const Services = () => {
  const services = [
    {
      icon: Lightbulb,
      title: "Asesoría Tecnológica",
      description: "Consultoría especializada para optimizar procesos, implementar soluciones tecnológicas y transformar digitalmente tu organización.",
      features: ["Análisis de procesos", "Arquitectura de soluciones", "Transformación digital"],
      image: consultingImg,
    },
    {
      icon: FileSpreadsheet,
      title: "Plantillas de Excel",
      description: "Herramientas avanzadas con macros, dashboards dinámicos y automatizaciones para gestión empresarial eficiente.",
      features: ["Dashboards interactivos", "Automatización VBA", "Análisis financiero"],
      image: excelImg,
    },
    {
      icon: Code2,
      title: "Plantillas de Python",
      description: "Scripts y notebooks especializados para análisis de datos, automatización de tareas y desarrollo de soluciones personalizadas.",
      features: ["Análisis de datos", "Web scraping", "Machine Learning"],
      image: pythonImg,
    },
    {
      icon: BarChart3,
      title: "Plantillas de Power BI",
      description: "Reportes profesionales y dashboards interactivos para visualización de datos y business intelligence empresarial.",
      features: ["Visualización avanzada", "KPIs dinámicos", "Integración de datos"],
      image: powerbiImg,
    },
  ];

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="hover-lift bg-card border-border group cursor-pointer overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                      <service.icon className="text-white" size={24} />
                    </div>
                  </div>
                  <CardHeader>
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
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Services;
