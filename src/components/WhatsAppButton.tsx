import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const phoneNumber = "51987597973";
  const message = "Hola! Me gustaría solicitar información sobre sus servicios y plantillas disponibles.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 animate-fade-in flex items-center gap-3"
    >
      <span className="bg-background text-foreground px-4 py-2 rounded-full shadow-lg border border-border font-medium text-sm whitespace-nowrap">
        ¿Necesitas información?
      </span>
      <Button
        size="lg"
        className="rounded-full w-16 h-16 shadow-glow bg-[#25D366] hover:bg-[#20BA5A] text-white"
      >
        <MessageCircle size={28} />
      </Button>
    </a>
  );
};

export default WhatsAppButton;
