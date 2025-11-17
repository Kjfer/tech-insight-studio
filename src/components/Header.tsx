import { useState, useEffect } from "react";
import { Menu, X, LogIn } from "lucide-react";
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
          ? "bg-[#2737A0]/95 backdrop-blur-md shadow-elegant"
          : "bg-[#2737A0]"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="DatoDirecto" className="h-12 w-auto" />
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-[#FFFFFF]">DATO</span>
              <span className="text-[#52B8D8]">DIRECTO</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`text-white/90 hover:text-[#52B8D8] transition-smooth font-medium ${
                  location.pathname === item.href ? "text-[#52B8D8]" : ""
                }`}
              >
              {item.label}
              </Link>
            ))}
            <Button
              asChild
              size="icon"
              className="bg-[#52B8D8] hover:bg-[#3da3c8] text-white"
            >
              <Link to="/auth" title="Iniciar Sesión">
                <LogIn className="h-5 w-5" />
              </Link>
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
          <nav className="md:hidden py-4 animate-fade-in bg-[#2737A0]">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 text-white/90 hover:text-[#52B8D8] transition-smooth font-medium ${
                  location.pathname === item.href ? "text-[#52B8D8]" : ""
                }`}
              >
              {item.label}
              </Link>
            ))}
            <Button
              asChild
              variant="outline"
              className="w-full mt-4 border-[#52B8D8] text-[#52B8D8] hover:bg-[#52B8D8] hover:text-white"
            >
              <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                <LogIn className="mr-2 h-4 w-4" />
                Iniciar Sesión
              </Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
