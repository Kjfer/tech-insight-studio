import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useHeroSlides } from "@/hooks/useSupabaseData";

const Hero = () => {
  const { slides, loading } = useHeroSlides();

  if (loading) {
    return (
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="text-center">Cargando...</div>
      </section>
    );
  }

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
                    backgroundImage: `url(${slide.image_url})`,
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
                  <div className="max-w-4xl mx-auto text-center px-4">
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 animate-fade-in leading-tight whitespace-pre-wrap">
                      {slide.title}{" "}
                      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {slide.highlight}
                      </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in whitespace-pre-wrap leading-relaxed" style={{ animationDelay: "0.2s" }}>
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
