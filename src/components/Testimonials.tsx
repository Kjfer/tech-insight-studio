import { useTestimonials } from "@/hooks/useSupabaseData";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star } from "lucide-react";

const Testimonials = () => {
  const { testimonials = [], loading } = useTestimonials();

  if (loading || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Lo Que Dicen <span className="text-primary">Nuestros Clientes</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Testimonios reales de clientes satisfechos que confían en nuestros servicios
        </p>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2">
                <Card className="h-full border-muted/40 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-4">
                      {testimonial.image_url && (
                        <img
                          src={testimonial.image_url}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        {testimonial.company && (
                          <p className="text-sm text-primary">{testimonial.company}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>

                    <p className="text-muted-foreground italic flex-1 break-words whitespace-normal line-clamp-6">
                      "{testimonial.content}"
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
