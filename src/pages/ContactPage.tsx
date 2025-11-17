import { useState } from "react";
import { Mail, Phone, MapPin, Send, Linkedin, Instagram } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    // Success message
    toast({
      title: "¡Mensaje enviado!",
      description: "Nos pondremos en contacto contigo pronto.",
    });

    // Reset form
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "contacto@datodirecto.com",
      link: "mailto:contacto@datodirecto.com",
    },
    {
      icon: Phone,
      title: "Teléfono",
      content: "+52 (55) 1234-5678",
      link: "tel:+525512345678",
    },
    {
      icon: MapPin,
      title: "Ubicación",
      content: "Ciudad de México, CDMX",
      link: "#",
    },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: FaTiktok, href: "#", label: "TikTok" },
    { icon: Instagram, href: "#", label: "Instagram" },
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
                      <Button type="submit" className="w-full gradient-primary hover-glow">
                        <Send size={16} className="mr-2" />
                        Enviar Mensaje
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
                      <div className="flex gap-4">
                        {socialLinks.map((social, index) => (
                          <a
                            key={index}
                            href={social.href}
                            aria-label={social.label}
                            className="w-12 h-12 rounded-xl bg-secondary hover:bg-primary hover:text-white flex items-center justify-center transition-smooth"
                          >
                            <social.icon size={20} />
                          </a>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
