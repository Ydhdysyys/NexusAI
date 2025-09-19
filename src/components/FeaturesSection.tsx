import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  MessageSquare, 
  Search, 
  TrendingUp, 
  Users, 
  Zap 
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Otimização de Currículo",
    description: "IA analisa e otimiza seu currículo para cada vaga específica, destacando suas melhores qualidades.",
    action: "Otimizar Currículo"
  },
  {
    icon: MessageSquare,
    title: "Preparação para Entrevistas",
    description: "Simulações de entrevistas personalizadas com feedback inteligente para você se destacar.",
    action: "Treinar Entrevistas"
  },
  {
    icon: Search,
    title: "Busca Inteligente de Vagas",
    description: "Encontre oportunidades perfeitas com base no seu perfil, experiência e objetivos profissionais.",
    action: "Buscar Vagas"
  },
  {
    icon: TrendingUp,
    title: "Desenvolvimento de Habilidades",
    description: "Identifique gaps de competências e receba um plano personalizado de capacitação.",
    action: "Desenvolver Skills"
  },
  {
    icon: Users,
    title: "Networking Estratégico",
    description: "Conecte-se com profissionais da sua área e expanda sua rede de contatos.",
    action: "Fazer Networking"
  },
  {
    icon: Zap,
    title: "Orientação Personalizada",
    description: "Mentoria 24/7 com IA que entende seus objetivos e traça o melhor caminho profissional.",
    action: "Obter Orientação"
  }
];

const FeaturesSection = () => {
  return (
    <section id="recursos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Recursos que <span className="bg-gradient-primary bg-clip-text text-transparent">Transformam</span> Carreiras
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubra como nossa inteligência artificial pode acelerar sua entrada no mercado de trabalho
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-nexus transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-2xl bg-gradient-primary w-fit group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button 
                    variant="outline" 
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {feature.action}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:opacity-90 shadow-nexus text-lg px-8 py-3 h-auto"
          >
            Experimentar Todos os Recursos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;