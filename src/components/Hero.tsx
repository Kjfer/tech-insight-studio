import { useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import heroData from "@/assets/hero-data.jpg";
import heroBi from "@/assets/hero-bi.jpg";
import heroWeb from "@/assets/hero-web.jpg";
import heroTemplates from "@/assets/hero-templates.jpg";

const Hero = () => {
  const slides = [
    {
      title: "Transformamos Datos en",
      highlight: "Decisiones Inteligentes",
      description: "Asesoría tecnológica especializada y plantillas profesionales de Excel, Python y Power BI para potenciar tu negocio con soluciones prácticas y efectivas.",
      image: heroData,
    },
    {
      title: "Business Intelligence",
      highlight: "(BI)",
      description: "Implementamos sistemas de análisis y visualización de datos personalizados para potenciar la toma de decisiones estratégicas.",
      image: heroBi,
    },
    {
      title: "Desarrollo de Sistemas Web",
      highlight: "y Web Services",
      description: "Creamos soluciones integrales para el control y gestión del personal, adaptadas a las necesidades operativas de su organización.",
      image: heroWeb,
    },
    {
      title: "Venta de Plantillas y",
      highlight: "Reportes Personalizados",
      description: "Ofrecemos plantillas de reporting diseñadas en función de los indicadores y métricas ya establecidas y amoldables para de su empresa, facilitando un análisis eficiente y profesional.",
      image: heroTemplates,
    },
  ];

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full h-full"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ 
                    backgroundImage: `url(${slide.image})`,
                  }}
                >
                  <div className="absolute inset-0 bg-background/80" />
                </div>

                {/* Animated Particles */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 animate-fade-in leading-tight">
                      {slide.title}{" "}
                      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {slide.highlight}
                      </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default Hero;
