import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet, Code2, BarChart3 } from "lucide-react";

const PortfolioPreview = () => {
  const templates = [
    {
      icon: FileSpreadsheet,
      title: "Plantillas de Excel",
      description: "Herramientas de análisis y reportes automatizados para optimizar tu gestión de datos",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Code2,
      title: "Plantillas de Python",
      description: "Scripts y soluciones de automatización para análisis avanzado de datos",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: BarChart3,
      title: "Plantillas de Power BI",
      description: "Dashboards interactivos y reportes visuales para business intelligence",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Plantillas Especializadas</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Soluciones listas para usar, diseñadas por expertos para acelerar tus procesos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {templates.map((template, index) => (
            <Card key={index} className="hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader>
                <div className={`w-16 h-16 ${template.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                  <template.icon className={`w-8 h-8 ${template.color}`} />
                </div>
                <CardTitle className="text-2xl">{template.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{template.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/portafolio">
            <Button size="lg" variant="outline" className="shadow-lg">
              Explorar Todas las Plantillas
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
