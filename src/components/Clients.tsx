import { useEffect, useRef } from "react";

const Clients = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Placeholder client logos (using initials)
  const clients = [
    { name: "Microsoft", initials: "MS" },
    { name: "Amazon", initials: "AZ" },
    { name: "Google", initials: "GG" },
    { name: "IBM", initials: "IBM" },
    { name: "Oracle", initials: "OR" },
    { name: "SAP", initials: "SAP" },
    { name: "Adobe", initials: "AD" },
    { name: "Cisco", initials: "CS" },
    { name: "Intel", initials: "IN" },
    { name: "Dell", initials: "DL" },
    { name: "HP", initials: "HP" },
    { name: "Samsung", initials: "SS" },
  ];

  // Duplicate for seamless loop
  const duplicatedClients = [...clients, ...clients];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
          Confían en <span className="text-primary">Nosotros</span>
        </h2>

        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary/30 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary/30 to-transparent z-10" />

          {/* Scrolling Container */}
          <div
            ref={scrollRef}
            className="flex gap-12 overflow-x-hidden"
            style={{ scrollBehavior: "auto" }}
          >
            {duplicatedClients.map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 h-24 flex items-center justify-center group cursor-pointer"
              >
                <div className="w-full h-full flex items-center justify-center rounded-xl bg-background border-2 border-border transition-smooth group-hover:border-primary group-hover:shadow-elegant">
                  <span className="text-2xl font-bold text-muted-foreground group-hover:text-primary transition-smooth">
                    {client.initials}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
