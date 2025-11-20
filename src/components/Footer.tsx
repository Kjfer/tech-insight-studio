import * as LucideIcons from "lucide-react";
import * as ReactIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useSocialLinks } from "@/hooks/useSupabaseData";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { socialLinks, loading } = useSocialLinks();

  const quickLinks = [
    { label: "Inicio", href: "/" },
    { label: "Servicios", href: "/servicios" },
    { label: "Portafolio", href: "/portafolio" },
    { label: "Sobre Nosotros", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
  ];

  const services = [
    "Asesoría Tecnológica",
    "Plantillas Excel",
    "Plantillas Python",
    "Plantillas Power BI",
  ];

  const getIcon = (iconName: string) => {
    // @ts-ignore
    const LucideIcon = LucideIcons[iconName];
    // @ts-ignore
    const ReactIcon = ReactIcons[iconName];
    
    return LucideIcon || ReactIcon || LucideIcons.Link;
  };

  return (
    <footer className="bg-[#2737A0] border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Link to="/">
              <img src={logo} alt="DatoDirecto" className="h-12 w-auto mb-4" />
            </Link>
            <p className="text-sm text-white/70 mb-4">
              Transformando datos en decisiones inteligentes.
            </p>
            {!loading && (
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = getIcon(social.icon);
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.platform}
                      className="w-10 h-10 rounded-lg bg-white/10 hover:bg-[#52B8D8] hover:text-white flex items-center justify-center transition-smooth text-white/80"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/70 hover:text-[#52B8D8] transition-smooth"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Servicios</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-sm text-white/70">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Contacto</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="mailto:djaramillo@datodirecto.com" className="hover:text-[#52B8D8] transition-smooth">
                  djaramillo@datodirecto.com
                </a>
              </li>
              <li>
                <a href="tel:+51987597973" className="hover:text-[#52B8D8] transition-smooth">
                  +51 987 597 973
                </a>
              </li>
              <li>Jirón Casapalca 1674  - Cercado de Lima</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/70 text-center md:text-left">
              © {currentYear} DatoDirecto. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
