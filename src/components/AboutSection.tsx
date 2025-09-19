import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Target, Lightbulb, Heart } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="sobre" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Por que escolher o <span className="bg-gradient-primary bg-clip-text text-transparent">NexusAI</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Desenvolvemos uma plataforma pensada especificamente para jovens brasileiros 
            que estão dando os primeiros passos no mercado de trabalho.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-success/10">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Orientação Baseada em Dados</h3>
                  <p className="text-muted-foreground">
                    Nossa IA analisa milhares de vagas e perfis profissionais para oferecer 
                    conselhos precisos e atualizados com o mercado.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-warning/10">
                  <Target className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Foco no Primeiro Emprego</h3>
                  <p className="text-muted-foreground">
                    Entendemos os desafios únicos de quem está começando e adaptamos 
                    nossas estratégias para superar essas barreiras.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Aprendizado Contínuo</h3>
                  <p className="text-muted-foreground">
                    Acompanhe as tendências do mercado e desenvolva as habilidades 
                    mais requisitadas pelos empregadores.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <Heart className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Suporte Humanizado</h3>
                  <p className="text-muted-foreground">
                    Tecnologia avançada com toque humano. Nossa IA é treinada para 
                    ser empática e compreender suas necessidades individuais.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-gradient-primary text-white border-0">
              <CardContent className="p-0">
                <div className="text-3xl font-bold mb-2">+10.000</div>
                <div className="text-white/90 mb-4">Currículos otimizados</div>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    IA Avançada
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    Resultados Comprovados
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 bg-gradient-secondary text-white border-0">
              <CardContent className="p-0">
                <div className="text-3xl font-bold mb-2">85%</div>
                <div className="text-white/90 mb-4">Taxa de aprovação em processos</div>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    Preparação Eficaz
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    Confiança Total
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:opacity-90 shadow-nexus text-lg px-8 py-3 h-auto"
          >
            Comece Sua Jornada Profissional
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;