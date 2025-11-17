import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const phoneNumber = "51993439301";
  const message = "Hola! Me gustaría solicitar información sobre sus servicios y plantillas disponibles.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 animate-fade-in"
    >
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
