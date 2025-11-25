import { Link } from "react-router-dom";
import { useBIHero, useBIFeatures, useBIVideo, useBIFAQs } from "@/hooks/useSupabaseData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";

const BusinessIntelligence = () => {
  const { hero, loading: heroLoading } = useBIHero();
  const { features, loading: featuresLoading } = useBIFeatures();
  const { video, loading: videoLoading } = useBIVideo();
  const { faqs, loading: faqsLoading } = useBIFAQs();

  // Group features by category
  const groupedFeatures = features.reduce((acc: any, feature: any) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {});

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        {!heroLoading && hero && (
          <section 
            className="relative py-32 bg-cover bg-center"
            style={{ backgroundImage: `url(${hero.image_url})` }}
          >
            <div className="absolute inset-0 bg-background/80" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 break-words">
                  {hero.title}
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground mb-8 break-words whitespace-normal">
                  {hero.description}
                </p>
                <Link to="/contacto">
                  <Button size="lg" className="gap-2">
                    <MessageCircle size={20} />
                    Contáctanos
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        {!featuresLoading && features.length > 0 && (
          <section className="py-20 bg-secondary/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Características de la <span className="text-primary">Plataforma</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Una plataforma completa de Business Intelligence con todas las herramientas que necesitas
                </p>
              </div>

              <div className="space-y-16">
                {Object.entries(groupedFeatures).map(([category, categoryFeatures]: [string, any]) => (
                  <div key={category}>
                    <h3 className="text-2xl font-bold mb-8 text-center">
                      <span className="gradient-text">{category}</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryFeatures.map((feature: any) => (
                        <Card key={feature.id} className="hover-lift group overflow-hidden">
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={feature.image_url} 
                              alt={feature.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                          </div>
                          <CardHeader>
                            <CardTitle className="text-xl break-words">{feature.title}</CardTitle>
                            <CardDescription className="text-base break-words whitespace-normal line-clamp-4">
                              {feature.description}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link to="/contacto">
                  <Button size="lg" variant="outline" className="gap-2">
                    <MessageCircle size={20} />
                    Solicita una Demo
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Video Section */}
        {!videoLoading && video && (
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4 break-words">
                    {video.title}
                  </h2>
                  <p className="text-lg text-muted-foreground break-words whitespace-normal">
                    {video.description}
                  </p>
                </div>
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-glow"
                    src={video.video_url}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQs Section */}
        {!faqsLoading && faqs.length > 0 && (
          <section className="py-20 bg-secondary/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Preguntas <span className="text-primary">Frecuentes</span>
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Respuestas a las preguntas más comunes sobre nuestra plataforma de BI
                  </p>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left break-words">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground break-words whitespace-normal">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <div className="text-center mt-12">
                  <Link to="/contacto">
                    <Button size="lg" className="gap-2">
                      <MessageCircle size={20} />
                      ¿Más preguntas? Contáctanos
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BusinessIntelligence;
