import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/nexus-hero.jpg";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 text-accent-foreground mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Orientação Profissional com IA</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Sua jornada para o
              <span className="bg-gradient-primary bg-clip-text text-transparent"> mercado de trabalho </span>
              começa aqui
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              O NexusAI é seu assistente inteligente para encontrar oportunidades, 
              aprimorar seu currículo e conquistar a vaga dos seus sonhos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 shadow-nexus text-lg px-8 py-3 h-auto"
              >
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-3 h-auto"
              >
                Ver Demonstração
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Jovens Orientados</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Taxa de Sucesso</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Suporte IA</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <img 
                src={heroImage} 
                alt="NexusAI - Orientação Profissional com Inteligência Artificial" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-secondary rounded-full opacity-70 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-primary rounded-full opacity-50 blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;