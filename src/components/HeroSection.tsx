import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/nexus-hero.jpg";

const HeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
      toast({
        title: "Redirecionando para Dashboard",
        description: "Acesse todas as funcionalidades do NexusAI"
      });
    } else {
      navigate('/auth', { state: { mode: 'register' } });
      toast({
        title: "Bem-vindo ao NexusAI!",
        description: "Para começar, complete seu cadastro.",
        duration: 3000,
      });
    }
  };

  const handleDemo = () => {
    toast({
      title: "Demonstração em breve!",
      description: "Estamos preparando uma demonstração incrível das funcionalidades do NexusAI.",
      duration: 4000,
    });
  };
  return (
    <section className="pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 text-accent-foreground mb-6 hover:bg-accent/70 transition-all duration-300 cursor-default">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span className="text-sm font-medium">Orientação Profissional com IA</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Sua jornada para o
              <span className="bg-gradient-primary bg-clip-text text-transparent hover:animate-pulse-glow transition-all duration-500"> mercado de trabalho </span>
              começa aqui
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              O NexusAI é seu assistente inteligente para encontrar oportunidades, 
              aprimorar seu currículo e conquistar a vaga dos seus sonhos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 shadow-nexus text-lg px-8 py-3 h-auto transition-all duration-300 transform hover:scale-105 hover:shadow-glow"
                onClick={handleGetStarted}
              >
                {user ? 'Acessar Dashboard' : 'Começar Agora'}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-3 h-auto transition-all duration-300 transform hover:scale-105"
                onClick={handleDemo}
              >
                Ver Demonstração
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left group cursor-default">
                <div className="text-2xl font-bold text-primary transition-all duration-300 group-hover:scale-110">500+</div>
                <div className="text-sm text-muted-foreground">Jovens Orientados</div>
              </div>
              <div className="text-center lg:text-left group cursor-default">
                <div className="text-2xl font-bold text-primary transition-all duration-300 group-hover:scale-110">95%</div>
                <div className="text-sm text-muted-foreground">Taxa de Sucesso</div>
              </div>
              <div className="text-center lg:text-left group cursor-default">
                <div className="text-2xl font-bold text-primary transition-all duration-300 group-hover:scale-110">24/7</div>
                <div className="text-sm text-muted-foreground">Suporte IA</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="flex-1 max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative group">
              <img 
                src={heroImage} 
                alt="NexusAI - Orientação Profissional com Inteligência Artificial" 
                className="w-full h-auto rounded-2xl shadow-2xl transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-secondary rounded-full opacity-70 blur-xl transition-all duration-500 group-hover:opacity-90"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-primary rounded-full opacity-50 blur-2xl transition-all duration-500 group-hover:opacity-70"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;