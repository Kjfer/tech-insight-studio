import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-hero opacity-10" />
      
      {/* Animated Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-fade-in">
            <Sparkles size={16} />
            <span className="text-sm font-medium">Innovación y Expertise Tecnológico</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 animate-fade-in leading-tight">
            Transformamos Datos en{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Decisiones Inteligentes
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Asesoría tecnológica especializada y plantillas profesionales de Excel, Python y Power BI para potenciar tu negocio con soluciones prácticas y efectivas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button
              size="lg"
              asChild
              className="gradient-primary hover-glow text-base sm:text-lg h-12 sm:h-14 px-8"
            >
              <Link to="/servicios">
                Ver Servicios
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base sm:text-lg h-12 sm:h-14 px-8"
            >
              <Link to="/portafolio">
                Ver Plantillas
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
