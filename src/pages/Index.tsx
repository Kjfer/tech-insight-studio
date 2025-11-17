import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesPreview from "@/components/ServicesPreview";
import PortfolioPreview from "@/components/PortfolioPreview";
import Clients from "@/components/Clients";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ServicesPreview />
      <PortfolioPreview />
      <Clients />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);
};

export default Index;
