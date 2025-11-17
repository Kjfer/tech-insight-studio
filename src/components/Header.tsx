import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Servicios", href: "/servicios" },
    { label: "Portafolio", href: "/portafolio" },
    { label: "Sobre Nosotros", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled
          ? "bg-[#1e3a5f]/95 backdrop-blur-md shadow-elegant"
          : "bg-[#1e3a5f]"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="DatoDirecto" className="h-12 w-auto" />
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-[#3498db]">DATO</span>
              <span className="text-[#e74c3c]">DIRECTO</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`text-white/90 hover:text-[#3498db] transition-smooth font-medium ${
                  location.pathname === item.href ? "text-[#3498db]" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button
              asChild
              className="bg-[#3498db] hover:bg-[#2980b9] text-white"
            >
              <Link to="/contacto">Contactar</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 animate-fade-in bg-[#1e3a5f]">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 text-white/90 hover:text-[#3498db] transition-smooth font-medium ${
                  location.pathname === item.href ? "text-[#3498db]" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button
              asChild
              className="w-full mt-4 bg-[#3498db] hover:bg-[#2980b9] text-white"
            >
              <Link to="/contacto" onClick={() => setIsMobileMenuOpen(false)}>
                Contactar
              </Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
