import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, FileText, MessageSquare, TrendingUp, CheckCircle, Star, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import PageTransition from "@/components/PageTransition";

const Demo = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeDemo, setActiveDemo] = useState<'resume' | 'interview' | 'skills'>('resume');

  const demoFeatures = {
    resume: {
      icon: FileText,
      title: "Otimização de Currículo",
      description: "Veja como a IA analisa e melhora seu currículo em tempo real",
      steps: [
        "Upload do seu currículo atual",
        "Análise automática de pontos fortes e fracos",
        "Sugestões de melhorias baseadas em IA",
        "Geração de currículo otimizado em PDF"
      ],
      stats: [
        { label: "Aumento médio na taxa de resposta", value: "78%" },
        { label: "Tempo médio de otimização", value: "2 min" },
        { label: "Currículos otimizados", value: "10k+" }
      ]
    },
    interview: {
      icon: MessageSquare,
      title: "Preparação para Entrevistas",
      description: "Pratique com simulações realistas de entrevistas",
      steps: [
        "Escolha o tipo de vaga desejada",
        "Receba perguntas personalizadas",
        "Grave suas respostas em tempo real",
        "Obtenha feedback detalhado da IA"
      ],
      stats: [
        { label: "Taxa de aprovação após treino", value: "85%" },
        { label: "Perguntas disponíveis", value: "500+" },
        { label: "Feedback personalizado", value: "100%" }
      ]
    },
    skills: {
      icon: TrendingUp,
      title: "Desenvolvimento de Habilidades",
      description: "Aprimore suas competências com trilhas personalizadas",
      steps: [
        "Avaliação inicial de competências",
        "Trilha de aprendizado personalizada",
        "Exercícios práticos e desafios",
        "Certificados de conclusão"
      ],
      stats: [
        { label: "Habilidades disponíveis", value: "200+" },
        { label: "Tempo médio de conclusão", value: "30 dias" },
        { label: "Taxa de satisfação", value: "96%" }
      ]
    }
  };

  const currentDemo = demoFeatures[activeDemo];
  const Icon = currentDemo.icon;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="gap-2 hover-scale"
              >
                <ArrowLeft className="h-5 w-5" />
                {t('dashboard.backHome')}
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                NexusAI Demo
              </h1>
              <Button
                onClick={() => navigate('/auth')}
                className="bg-gradient-primary hover:opacity-90"
              >
                {t('hero.getStarted')}
              </Button>
            </div>
          </div>
        </header>

        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Explore o Poder da
                <span className="bg-gradient-primary bg-clip-text text-transparent"> IA </span>
                no seu desenvolvimento profissional
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Veja demonstrações interativas de como o NexusAI pode transformar sua carreira
              </p>
            </div>

            {/* Demo Navigation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {(Object.keys(demoFeatures) as Array<keyof typeof demoFeatures>).map((key) => {
                const feature = demoFeatures[key];
                const FeatureIcon = feature.icon;
                return (
                  <Card
                    key={key}
                    className={`cursor-pointer transition-all duration-300 hover-scale ${
                      activeDemo === key ? 'border-primary shadow-glow' : ''
                    }`}
                    onClick={() => setActiveDemo(key)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          activeDemo === key ? 'bg-gradient-primary' : 'bg-muted'
                        }`}>
                          <FeatureIcon className={`h-6 w-6 ${
                            activeDemo === key ? 'text-white' : 'text-muted-foreground'
                          }`} />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>

            {/* Demo Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Demo Video/Preview */}
              <Card className="overflow-hidden animate-fade-in">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="absolute inset-0 bg-grid-white/10" />
                    <Button
                      size="lg"
                      className="relative z-10 bg-gradient-primary hover:opacity-90 shadow-glow gap-2"
                    >
                      <Play className="h-5 w-5" />
                      Assistir Demo
                    </Button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-gradient-primary">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{currentDemo.title}</h3>
                        <p className="text-muted-foreground">{currentDemo.description}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Demo Steps */}
              <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <CardTitle>Como Funciona</CardTitle>
                  <CardDescription>Passo a passo do processo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentDemo.steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-3 group">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm transition-transform duration-300 group-hover:scale-110">
                          {index + 1}
                        </div>
                        <p className="text-foreground pt-1 transition-all duration-300 group-hover:translate-x-2">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {currentDemo.stats.map((stat, index) => (
                <Card
                  key={index}
                  className="text-center animate-fade-in hover-scale"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Testimonials */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-center mb-8">
                O que nossos usuários dizem
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Maria Silva",
                    role: "Desenvolvedora Front-end",
                    text: "O NexusAI me ajudou a otimizar meu currículo e consegui 3 entrevistas em uma semana!",
                    rating: 5
                  },
                  {
                    name: "João Santos",
                    role: "Designer UX/UI",
                    text: "As simulações de entrevista foram essenciais para minha aprovação. Recomendo muito!",
                    rating: 5
                  },
                  {
                    name: "Ana Costa",
                    role: "Analista de Dados",
                    text: "A trilha de desenvolvimento de habilidades me deu confiança para mudar de área.",
                    rating: 5
                  }
                ].map((testimonial, index) => (
                  <Card
                    key={index}
                    className="animate-fade-in hover-scale"
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <CardTitle className="text-base">{testimonial.name}</CardTitle>
                          <CardDescription className="text-sm">{testimonial.role}</CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{testimonial.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="pt-6 text-center">
                <h3 className="text-3xl font-bold mb-4">
                  Pronto para transformar sua carreira?
                </h3>
                <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Junte-se a milhares de profissionais que já estão usando o NexusAI
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-primary hover:opacity-90 shadow-nexus text-lg px-8 h-auto py-3"
                    onClick={() => navigate('/auth')}
                  >
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Começar Gratuitamente
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 h-auto py-3"
                    onClick={() => navigate('/')}
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Saber Mais
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default Demo;