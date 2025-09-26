import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        {/* Fixed Theme Toggle for mobile */}
        <div className="fixed top-4 right-4 z-50 md:hidden">
          <ThemeToggle />
        </div>
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
