import { Link } from "react-router-dom";
import { useState } from "react";
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
  
  const [selectedFeature, setSelectedFeature] = useState<number>(0);

  // Convert YouTube URL to embed format
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (videoIdMatch && videoIdMatch[1]) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
    return url;
  };

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
                  Selecciona una característica para conocer más detalles
                </p>
              </div>

              <div className="max-w-5xl mx-auto">
                {/* Feature Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                  {features.map((feature: any, index: number) => (
                    <Button
                      key={feature.id}
                      variant={selectedFeature === index ? "default" : "outline"}
                      size="lg"
                      onClick={() => setSelectedFeature(index)}
                      className="text-sm sm:text-base"
                    >
                      {feature.title}
                    </Button>
                  ))}
                </div>

                {/* Selected Feature Display */}
                {features[selectedFeature] && (
                  <Card className="overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative h-64 md:h-auto overflow-hidden">
                        <img 
                          src={features[selectedFeature].image_url} 
                          alt={features[selectedFeature].title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 flex flex-col justify-center">
                        <CardHeader className="p-0 mb-4">
                          <CardTitle className="text-2xl mb-2">
                            {features[selectedFeature].title}
                          </CardTitle>
                          <CardDescription className="text-base whitespace-normal">
                            {features[selectedFeature].description}
                          </CardDescription>
                        </CardHeader>
                        <Link to="/contacto">
                          <Button size="lg" className="gap-2 w-full sm:w-auto">
                            <MessageCircle size={20} />
                            Contáctanos
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                )}
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
                    src={getEmbedUrl(video.video_url)}
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
