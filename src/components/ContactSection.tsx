import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contato" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Entre em <span className="bg-gradient-primary bg-clip-text text-transparent">Contato</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Tem alguma dúvida ou precisa de ajuda? Nossa equipe está pronta para te orientar!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Fale Conosco</h3>
            
            <Card className="p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
              <CardContent className="p-0 flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">E-mail</h4>
                  <p className="text-muted-foreground">contato@nexusai.com.br</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
              <CardContent className="p-0 flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-success/10 group-hover:bg-success/20 transition-colors duration-300">
                  <Phone className="h-6 w-6 text-success" />
                </div>
                <div>
                  <h4 className="font-semibold">Telefone</h4>
                  <p className="text-muted-foreground">0800 123 4567</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
              <CardContent className="p-0 flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-warning/10 group-hover:bg-warning/20 transition-colors duration-300">
                  <MapPin className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <h4 className="font-semibold">Endereço</h4>
                  <p className="text-muted-foreground">São Paulo, SP - Brasil</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Envie uma Mensagem</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input 
                    id="name" 
                    placeholder="Seu nome"
                    className="transition-all duration-300 focus:shadow-glow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="seu@email.com"
                    className="transition-all duration-300 focus:shadow-glow"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Assunto</Label>
                <Input 
                  id="subject" 
                  placeholder="Como podemos te ajudar?"
                  className="transition-all duration-300 focus:shadow-glow"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea 
                  id="message" 
                  placeholder="Descreva sua dúvida ou sugestão..."
                  rows={5}
                  className="transition-all duration-300 focus:shadow-glow"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:opacity-90 shadow-nexus transition-all duration-300 transform hover:scale-105 hover:shadow-glow"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;