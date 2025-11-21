import { useState, useMemo } from "react";
import { FileSpreadsheet, Code2, BarChart3, Eye, MessageCircle, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
import { useTemplates, useCategories } from "@/hooks/useSupabaseData";

const Portfolio = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [keywordSearch, setKeywordSearch] = useState("");
  
  const { templates = [], loading: templatesLoading } = useTemplates();
  const { categories = [], loading: categoriesLoading } = useCategories();

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

  const filters = ["Todos", ...categories.map(c => c.name)];

  const filteredTemplates = useMemo(() => {
    let result = templates;

    // Filter by category
    if (activeFilter !== "Todos") {
      result = result.filter((t) => t.category?.name === activeFilter);
    }

    // Filter by keyword search
    if (keywordSearch.trim()) {
      const searchLower = keywordSearch.toLowerCase();
      result = result.filter((t) => 
        t.title.toLowerCase().includes(searchLower) ||
        t.description.toLowerCase().includes(searchLower) ||
        t.keywords?.some((k: any) => k.keyword?.name.toLowerCase().includes(searchLower))
      );
    }

    return result;
  }, [templates, activeFilter, keywordSearch]);

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

              {/* Keyword Search */}
              <div className="max-w-md mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Buscar por palabras clave..."
                    value={keywordSearch}
                    onChange={(e) => setKeywordSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

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

            {/* Templates Grid */}
            {templatesLoading || categoriesLoading ? (
              <div className="text-center mt-12">
                <p className="text-muted-foreground">Cargando plantillas...</p>
              </div>
            ) : filteredTemplates.length === 0 ? (
              <div className="text-center mt-12">
                <p className="text-muted-foreground">No se encontraron plantillas con los filtros seleccionados.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => {
                  const Icon = categoryIcons[template.category?.name || ""] || FileSpreadsheet;
                  const color = categoryColors[template.category?.name || ""] || "text-gray-600";
                  
                  return (
                    <Card key={template.id} className="hover-lift overflow-hidden group">
                      <div className="h-48 relative overflow-hidden bg-muted">
                        {template.image_url ? (
                          <>
                            <img 
                              src={template.image_url} 
                              alt={template.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                            <div className="absolute bottom-3 left-3 w-10 h-10 rounded-lg bg-background/90 backdrop-blur-sm flex items-center justify-center">
                              <Icon className={`${color} w-5 h-5`} />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                              <Icon size={64} className={`${color} group-hover:scale-110 transition-smooth`} />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                          </>
                        )}
                      </div>
                      
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="secondary">{template.category?.name}</Badge>
                          {template.price && (
                            <span className="text-xl font-bold text-primary">S/. {template.price}</span>
                          )}
                        </div>
                        <CardTitle className="text-xl">{template.title}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {template.keywords?.slice(0, 3).map((kw: any) => (
                            <span
                              key={kw.keyword.id}
                              className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                            >
                              {kw.keyword.name}
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
                          Ver más
                        </Button>
                        <Button 
                          className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white"
                          asChild
                        >
                          <a
                            href={`https://wa.me/51987597973?text=${encodeURIComponent(`Hola! Me interesa la plantilla "${template.title}". ¿Podrían brindarme más información?`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MessageCircle size={16} className="mr-2" />
                            Contactar
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Template Detail Modal */}
            {selectedTemplate && (
              <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <div className="flex items-center gap-3 mb-4">
                      {(() => {
                        const Icon = categoryIcons[selectedTemplate.category?.name || ""] || FileSpreadsheet;
                        const color = categoryColors[selectedTemplate.category?.name || ""] || "text-gray-600";
                        return (
                          <>
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Icon className={`w-6 h-6 ${color}`} />
                            </div>
                            <Badge variant="secondary">{selectedTemplate.category?.name}</Badge>
                            {selectedTemplate.price && (
                              <span className="ml-auto text-2xl font-bold text-primary">${selectedTemplate.price}</span>
                            )}
                          </>
                        );
                      })()}
                    </div>
                    <DialogTitle className="text-2xl">{selectedTemplate.title}</DialogTitle>
                    <DialogDescription className="text-base">
                      {selectedTemplate.description}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="mt-6 space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4 text-lg">Características principales:</h4>
                      <ul className="grid grid-cols-2 gap-3">
                        {selectedTemplate.keywords?.map((kw: any) => (
                          <li key={kw.keyword.id} className="flex items-center text-sm">
                            <span className="w-2 h-2 rounded-full bg-primary mr-2" />
                            {kw.keyword.name}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {selectedTemplate.image_url && (
                      <div className="w-full rounded-lg overflow-hidden border border-border bg-muted/20">
                        <img 
                          src={selectedTemplate.image_url} 
                          alt={selectedTemplate.title}
                          className="w-full h-auto object-contain cursor-zoom-in hover:scale-[1.02] transition-transform duration-300"
                          onClick={(e) => {
                            const img = e.currentTarget;
                            if (img.requestFullscreen) {
                              img.requestFullscreen();
                            }
                          }}
                        />
                      </div>
                    )}
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
                        href={`https://wa.me/51987597973?text=${encodeURIComponent(`Hola! Me interesa la plantilla "${selectedTemplate.title}". ¿Podrían brindarme más información?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle size={16} className="mr-2" />
                        Contactar por WhatsApp
                      </a>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Portfolio;
