import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="p-2 rounded-xl bg-gradient-primary">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">NexusAI</span>
            </div>
            <p className="text-background/80 mb-6 max-w-md">
              Transformando o futuro profissional de jovens brasileiros através da 
              inteligência artificial e orientação personalizada.
            </p>
            <div className="flex flex-col space-y-2 max-w-sm">
              <div className="flex items-center space-x-2 text-background/70">
                <Mail className="h-4 w-4" />
                <span className="text-sm">contato@nexusai.com.br</span>
              </div>
              <div className="flex items-center space-x-2 text-background/70">
                <Phone className="h-4 w-4" />
                <span className="text-sm">0800 123 4567</span>
              </div>
              <div className="flex items-center space-x-2 text-background/70">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">São Paulo, Brasil</span>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recursos</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Otimização de Currículo
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Preparação para Entrevistas
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Busca de Vagas
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Desenvolvimento de Skills
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Suporte</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Tutoriais
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-background/20 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Receba Dicas de Carreira
            </h3>
            <p className="text-background/80 mb-4 text-sm">
              Cadastre-se e receba semanalmente dicas exclusivas para acelerar sua carreira.
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="Seu melhor e-mail"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button className="bg-gradient-primary hover:opacity-90 px-6">
                Inscrever
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/60 text-sm mb-4 md:mb-0">
            © 2024 NexusAI. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-background/60 hover:text-background text-sm transition-colors">
              Privacidade
            </a>
            <a href="#" className="text-background/60 hover:text-background text-sm transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-background/60 hover:text-background text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;