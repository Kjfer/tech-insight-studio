import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "51987597973";
  const message = "Hola! Me gustaría solicitar información sobre sus servicios y plantillas disponibles.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in flex items-center gap-3">
      <span className="bg-background text-foreground px-4 py-2 rounded-full shadow-lg border border-border font-medium text-sm whitespace-nowrap">
        ¿Necesitas información?
      </span>
      <Button
        asChild
        className="rounded-full w-20 h-20 p-0 flex items-center justify-center shadow-glow bg-[#25D366] hover:bg-[#20BA5A] text-white animate-[pulse-scale_2s_ease-in-out_infinite] hover:animate-none"
      >
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Abrir WhatsApp en nueva pestaña">
          <FaWhatsapp size={56} aria-hidden="true" />
        </a>
      </Button>
    </div>
  );
};

export default WhatsAppButton;
