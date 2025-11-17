import { useState } from "react";
import { FileSpreadsheet, Code2, BarChart3, Eye, MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Portfolio = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState("Todos");

  const templates = [
    {
      id: 1,
      title: "Dashboard Financiero",
      category: "Excel",
      description: "Control financiero completo con KPIs, análisis de flujo de caja y proyecciones",
      features: ["Análisis P&L", "Flujo de caja", "Gráficos dinámicos", "Proyecciones"],
      icon: FileSpreadsheet,
      color: "text-green-600",
    },
    {
      id: 2,
      title: "Análisis de Ventas",
      category: "Power BI",
      description: "Dashboard interactivo para análisis de ventas, clientes y tendencias de mercado",
      features: ["Métricas de ventas", "Segmentación", "Análisis temporal", "Mapas"],
      icon: BarChart3,
      color: "text-yellow-600",
    },
    {
      id: 3,
      title: "Automatización RPA",
      category: "Python",
      description: "Scripts para automatización de procesos repetitivos y extracción de datos",
      features: ["Web scraping", "Automatización", "Procesamiento", "Reportes"],
      icon: Code2,
      color: "text-blue-600",
    },
    {
      id: 4,
      title: "Control de Inventario",
      category: "Excel",
      description: "Sistema completo de gestión de inventario con alertas y reorden automático",
      features: ["Stock mínimo", "Alertas", "Historial", "Reportes"],
      icon: FileSpreadsheet,
      color: "text-green-600",
    },
    {
      id: 5,
      title: "Análisis Predictivo",
      category: "Python",
      description: "Modelos de machine learning para predicción de ventas y tendencias",
      features: ["ML models", "Predicciones", "Visualización", "API"],
      icon: Code2,
      color: "text-blue-600",
    },
    {
      id: 6,
      title: "Dashboard Ejecutivo",
      category: "Power BI",
      description: "Panel ejecutivo con KPIs principales y análisis de desempeño empresarial",
      features: ["KPIs", "Tendencias", "Benchmarking", "Drill-down"],
      icon: BarChart3,
      color: "text-yellow-600",
    },
  ];

  const filters = ["Todos", "Excel", "Python", "Power BI"];

  const filteredTemplates = activeFilter === "Todos"
    ? templates
    : templates.filter((t) => t.category === activeFilter);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Nuestro <span className="text-primary">Portafolio</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Plantillas profesionales probadas y optimizadas para diferentes necesidades empresariales
              </p>

              {/* Filters */}
              <div className="flex flex-wrap justify-center gap-3">
                {filters.map((filter) => (
                  <Button
                    key={filter}
                    variant={activeFilter === filter ? "default" : "outline"}
                    onClick={() => setActiveFilter(filter)}
                    className={activeFilter === filter ? "gradient-primary" : ""}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="hover-lift overflow-hidden group">
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
                    <template.icon size={64} className={`${template.color} group-hover:scale-110 transition-smooth`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{template.category}</Badge>
                    </div>
                    <CardTitle className="text-xl">{template.title}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {template.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <Eye size={16} className="mr-2" />
                      Ver Demo
                    </Button>
                    <Button 
                      className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white"
                      asChild
                    >
                      <a
                        href={`https://wa.me/51993439301?text=${encodeURIComponent(`Hola! Me interesa la plantilla "${template.title}". ¿Podrían brindarme más información?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle size={16} className="mr-2" />
                        Consultar Plantilla
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Template Detail Modal */}
            <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedTemplate?.title}</DialogTitle>
                  <DialogDescription className="text-base">
                    {selectedTemplate?.description}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="mt-4">
                  <h4 className="font-semibold mb-3">Características principales:</h4>
                  <ul className="grid grid-cols-2 gap-3">
                    {selectedTemplate?.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center text-sm">
                        <span className="w-2 h-2 rounded-full bg-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 p-6 bg-secondary/50 rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    Vista previa del dashboard - Funcionalidad completa disponible en la versión descargable
                  </p>
                </div>

                <div className="flex gap-3 mt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setSelectedTemplate(null)}>
                    Cerrar
                  </Button>
                  <Button 
                    className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white"
                    asChild
                  >
                    <a
                      href={`https://wa.me/51993439301?text=${encodeURIComponent(`Hola! Me interesa la plantilla "${selectedTemplate?.title}". ¿Podrían brindarme más información?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle size={16} className="mr-2" />
                      Consultar Plantilla
                    </a>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Portfolio;
