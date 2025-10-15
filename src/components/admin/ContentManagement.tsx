import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { FileText, Image, Video, Save } from 'lucide-react';

const ContentManagement = () => {
  const { toast } = useToast();
  const [heroContent, setHeroContent] = useState({
    title: 'Transforme sua Carreira com IA',
    subtitle: 'Prepare-se para entrevistas, construa currículos profissionais e desenvolva habilidades com ajuda de inteligência artificial',
    ctaText: 'Comece Agora'
  });

  const [featuresContent, setFeaturesContent] = useState([
    {
      id: 1,
      title: 'Construtor de Currículo Inteligente',
      description: 'Crie currículos profissionais com templates otimizados e sugestões de IA'
    },
    {
      id: 2,
      title: 'Preparação para Entrevistas',
      description: 'Pratique com simulações de entrevistas e receba feedback personalizado'
    },
    {
      id: 3,
      title: 'Desenvolvimento de Habilidades',
      description: 'Identifique gaps e receba recomendações de cursos personalizadas'
    }
  ]);

  const handleSaveHero = () => {
    toast({
      title: "Conteúdo salvo",
      description: "As alterações na seção hero foram salvas com sucesso"
    });
  };

  const handleSaveFeatures = () => {
    toast({
      title: "Funcionalidades salvas",
      description: "As alterações nas funcionalidades foram salvas com sucesso"
    });
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-primary" />
          <span>Gerenciamento de Conteúdo</span>
        </CardTitle>
        <CardDescription>
          Edite o conteúdo do site
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hero">
              <Image className="h-4 w-4 mr-2" />
              Hero
            </TabsTrigger>
            <TabsTrigger value="features">
              <FileText className="h-4 w-4 mr-2" />
              Funcionalidades
            </TabsTrigger>
            <TabsTrigger value="media">
              <Video className="h-4 w-4 mr-2" />
              Mídia
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="heroTitle">Título Principal</Label>
                <Input
                  id="heroTitle"
                  value={heroContent.title}
                  onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="heroSubtitle">Subtítulo</Label>
                <Textarea
                  id="heroSubtitle"
                  value={heroContent.subtitle}
                  onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="heroCta">Texto do Botão</Label>
                <Input
                  id="heroCta"
                  value={heroContent.ctaText}
                  onChange={(e) => setHeroContent({...heroContent, ctaText: e.target.value})}
                />
              </div>
              <Button onClick={handleSaveHero} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            {featuresContent.map((feature, index) => (
              <Card key={feature.id} className="border-primary/10">
                <CardContent className="pt-6 space-y-3">
                  <div>
                    <Label htmlFor={`featureTitle${index}`}>Título da Funcionalidade {index + 1}</Label>
                    <Input
                      id={`featureTitle${index}`}
                      value={feature.title}
                      onChange={(e) => {
                        const newFeatures = [...featuresContent];
                        newFeatures[index].title = e.target.value;
                        setFeaturesContent(newFeatures);
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`featureDesc${index}`}>Descrição</Label>
                    <Textarea
                      id={`featureDesc${index}`}
                      value={feature.description}
                      onChange={(e) => {
                        const newFeatures = [...featuresContent];
                        newFeatures[index].description = e.target.value;
                        setFeaturesContent(newFeatures);
                      }}
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button onClick={handleSaveFeatures} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Salvar Funcionalidades
            </Button>
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground py-8">
                  <Video className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Gerenciamento de mídia em desenvolvimento</p>
                  <p className="text-sm">Em breve você poderá fazer upload de imagens e vídeos</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContentManagement;
