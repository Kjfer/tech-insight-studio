import { useState } from "react";
import { Mail, Phone, MapPin, Send, Linkedin, Instagram } from "lucide-react";
import { FaTiktok, FaWhatsapp, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useSocialLinks } from "@/hooks/useSupabaseData";
import { supabase } from "@/integrations/supabase/client";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { socialLinks, loading: socialLinksLoading } = useSocialLinks();

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      FaLinkedin: Linkedin,
      FaTiktok: FaTiktok,
      FaInstagram: Instagram,
      FaWhatsapp: FaWhatsapp,
      FaFacebook: FaFacebook,
      FaTwitter: FaTwitter,
      FaYoutube: FaYoutube,
    };

    if (iconMap[iconName]) {
      return iconMap[iconName];
    }

    const LucideIcon = (LucideIcons as any)[iconName];
    if (LucideIcon) {
      return LucideIcon;
    }

    return Mail;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "¡Mensaje enviado!",
        description: "Nos pondremos en contacto contigo pronto.",
      });

      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar el mensaje. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "djaramillo@datodirecto.com",
      link: "mailto:djaramillo@datodirecto.com",
    },
    {
      icon: Phone,
      title: "Teléfono",
      content: "+51 987597973",
      link: "tel:+51987597973",
    },
    {
      icon: MapPin,
      title: "Ubicación",
      content: "Jirón Casapalca 1674  - Cercado de Lima",
      link: "https://maps.app.goo.gl/NxHmLRwK3jAjdMrz8",
    },
  ];


  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  Hablemos de tu <span className="text-primary">Proyecto</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  ¿Listo para transformar tus datos en decisiones inteligentes? Contáctanos hoy
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover-lift text-center">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-3">
                        <info.icon className="text-white" size={20} />
                      </div>
                      <CardTitle className="text-base">{info.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <a
                        href={info.link}
                        className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                      >
                        {info.content}
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <Card className="hover-lift">
                  <CardHeader>
                    <CardTitle className="text-2xl">Envíanos un mensaje</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Input
                          placeholder="Nombre completo *"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="Email *"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Input
                          placeholder="Empresa"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>
                      <div>
                        <Textarea
                          placeholder="Cuéntanos sobre tu proyecto *"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={5}
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full gradient-primary hover-glow"
                        disabled={isSubmitting}
                      >
                        <Send size={16} className="mr-2" />
                        {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Map & Social */}
                <div className="space-y-6">
                  <Card className="hover-lift">
                    <CardContent className="p-0">
                      <div className="h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                        <MapPin size={48} className="text-primary" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover-lift">
                    <CardHeader>
                      <CardTitle className="text-xl">Síguenos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {socialLinksLoading ? (
                        <div className="flex gap-4">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-12 h-12 rounded-xl bg-secondary animate-pulse" />
                          ))}
                        </div>
                      ) : (
                        <div className="flex gap-4 flex-wrap">
                          {socialLinks?.map((social) => {
                            const IconComponent = getIcon(social.icon);
                            return (
                              <a
                                key={social.id}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.platform}
                                className="w-12 h-12 rounded-xl bg-secondary hover:bg-primary hover:text-white flex items-center justify-center transition-smooth"
                              >
                                <IconComponent size={20} />
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ContactPage;
