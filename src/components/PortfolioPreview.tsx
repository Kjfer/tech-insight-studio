import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet, Code2, BarChart3, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTemplates } from "@/hooks/useSupabaseData";

const PortfolioPreview = () => {
  const { templates, loading } = useTemplates(true);

  const categoryIcons: Record<string, any> = {
    "Excel": FileSpreadsheet,
    "Python": Code2,
    "Power BI": BarChart3,
  };

  const categoryColors: Record<string, string> = {
    "Excel": "text-green-600",
    "Python": "text-blue-600",
    "Power BI": "text-yellow-600",
  };

  if (loading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Cargando plantillas destacadas...</p>
          </div>
        </div>
      </section>
    );
  }

  if (templates.length === 0) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Plantillas Especializadas</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Soluciones listas para usar, diseñadas por expertos para acelerar tus procesos
            </p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground mb-6">No hay plantillas destacadas en este momento.</p>
            <Link to="/portafolio">
              <Button size="lg" variant="outline" className="shadow-lg">
                Explorar Todas las Plantillas
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

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
          {templates.map((template) => {
            const categoryName = template.category?.name || "General";
            const Icon = categoryIcons[categoryName] || FileSpreadsheet;
            const color = categoryColors[categoryName] || "text-primary";

            return (
              <Card key={template.id} className="hover:shadow-xl transition-all hover:-translate-y-1 relative">
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    <Star className="w-3 h-3 mr-1 fill-primary" />
                    Destacada
                  </Badge>
                </div>
                <CardHeader>
                  {template.image_url ? (
                    <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-lg">
                      <img 
                        src={template.image_url} 
                        alt={template.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className={`w-8 h-8 ${color}`} />
                    </div>
                  )}
                  <CardTitle className="text-2xl">{template.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base line-clamp-3">{template.description}</CardDescription>
                  {template.keywords && template.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {template.keywords.slice(0, 3).map((kw: any) => (
                        <Badge
                          key={kw.keyword.id}
                          variant="secondary"
                          className="text-xs"
                        >
                          {kw.keyword.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {template.price && (
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">S/. {template.price}</span>
                      <span className="text-sm text-muted-foreground">Soles</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
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
