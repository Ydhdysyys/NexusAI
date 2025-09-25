import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Target, Play, CheckCircle, Clock, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: number;
  question: string;
  category: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  tips: string[];
}

const InterviewPrep = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "Fale sobre você e sua experiência profissional.",
      category: "Apresentação Pessoal",
      difficulty: "Fácil",
      tips: [
        "Seja conciso e objetivo",
        "Foque em experiências relevantes para a vaga",
        "Demonstre entusiasmo e confiança"
      ]
    },
    {
      id: 2,
      question: "Quais são seus pontos fortes e fracos?",
      category: "Autoconhecimento",
      difficulty: "Médio",
      tips: [
        "Para pontos fortes, dê exemplos concretos",
        "Para pontos fracos, mostre como está trabalhando para melhorar",
        "Seja honesto, mas estratégico"
      ]
    },
    {
      id: 3,
      question: "Por que você quer trabalhar nesta empresa?",
      category: "Motivação",
      difficulty: "Médio",
      tips: [
        "Pesquise sobre a empresa antes da entrevista",
        "Conecte seus valores com os da empresa",
        "Mostre conhecimento sobre o setor"
      ]
    },
    {
      id: 4,
      question: "Como você lida com situações de pressão?",
      category: "Comportamental",
      difficulty: "Difícil",
      tips: [
        "Use a técnica STAR (Situação, Tarefa, Ação, Resultado)",
        "Dê exemplos específicos de situações reais",
        "Demonstre maturidade emocional"
      ]
    },
    {
      id: 5,
      question: "Onde você se vê em 5 anos?",
      category: "Planejamento de Carreira",
      difficulty: "Médio",
      tips: [
        "Seja realista mas ambicioso",
        "Conecte seus objetivos com oportunidades na empresa",
        "Demonstre planejamento e visão de futuro"
      ]
    }
  ];

  const categories = Array.from(new Set(questions.map(q => q.category)));

  const filteredQuestions = selectedCategory 
    ? questions.filter(q => q.category === selectedCategory)
    : questions;

  const getRandomQuestion = () => {
    const availableQuestions = filteredQuestions.filter(q => !answeredQuestions.includes(q.id));
    if (availableQuestions.length === 0) {
      toast({
        title: "Parabéns!",
        description: "Você já praticou todas as perguntas desta categoria."
      });
      return;
    }
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    setCurrentQuestion(availableQuestions[randomIndex]);
  };

  const markAsAnswered = () => {
    if (currentQuestion) {
      setAnsweredQuestions([...answeredQuestions, currentQuestion.id]);
      toast({
        title: "Pergunta respondida!",
        description: "Continue praticando para melhorar seu desempenho."
      });
      setCurrentQuestion(null);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Gravação iniciada",
        description: "Responda à pergunta e clique em parar quando terminar."
      });
    } else {
      toast({
        title: "Gravação finalizada",
        description: "Sua resposta foi salva para análise."
      });
    }
  };

  const progress = (answeredQuestions.length / filteredQuestions.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Preparação para Entrevistas
          </h2>
          <p className="text-muted-foreground">
            Pratique com simulações de entrevistas personalizadas
          </p>
        </div>
      </div>

      <Tabs defaultValue="practice" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="practice">Praticar</TabsTrigger>
          <TabsTrigger value="tips">Dicas</TabsTrigger>
          <TabsTrigger value="progress">Progresso</TabsTrigger>
        </TabsList>

        <TabsContent value="practice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" />
                <span>Simulação de Entrevista</span>
              </CardTitle>
              <CardDescription>
                Selecione uma categoria e pratique suas respostas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as categorias</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={getRandomQuestion} className="flex items-center space-x-2">
                  <Play className="h-4 w-4" />
                  <span>Nova Pergunta</span>
                </Button>
              </div>

              {currentQuestion && (
                <Card className="border-primary/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge variant="secondary">{currentQuestion.category}</Badge>
                        <Badge 
                          variant={currentQuestion.difficulty === 'Fácil' ? 'default' : 
                                   currentQuestion.difficulty === 'Médio' ? 'secondary' : 'destructive'}
                          className="ml-2"
                        >
                          {currentQuestion.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-lg font-medium">
                      {currentQuestion.question}
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center space-x-2">
                        <Lightbulb className="h-4 w-4 text-yellow-500" />
                        <span>Dicas para uma boa resposta:</span>
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {currentQuestion.tips.map((tip, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-primary">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex space-x-4">
                      <Button 
                        onClick={toggleRecording}
                        variant={isRecording ? "destructive" : "default"}
                        className="flex items-center space-x-2"
                      >
                        <div className={`h-3 w-3 rounded-full ${isRecording ? 'bg-white animate-pulse' : 'bg-red-500'}`} />
                        <span>{isRecording ? 'Parar Gravação' : 'Gravar Resposta'}</span>
                      </Button>
                      <Button 
                        onClick={markAsAnswered}
                        variant="outline"
                        className="flex items-center space-x-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Marcar como Respondida</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Antes da Entrevista</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Pesquise sobre a empresa e a vaga</li>
                  <li>• Prepare perguntas para fazer ao entrevistador</li>
                  <li>• Escolha uma roupa adequada</li>
                  <li>• Teste sua conexão de internet (entrevistas online)</li>
                  <li>• Chegue com 10-15 minutos de antecedência</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Durante a Entrevista</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Mantenha contato visual</li>
                  <li>• Seja claro e objetivo nas respostas</li>
                  <li>• Use exemplos concretos</li>
                  <li>• Demonstre entusiasmo</li>
                  <li>• Faça perguntas inteligentes</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Após a Entrevista</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Envie um e-mail de agradecimento</li>
                  <li>• Reflita sobre pontos de melhoria</li>
                  <li>• Aguarde o prazo informado para retorno</li>
                  <li>• Continue se candidatando a outras vagas</li>
                  <li>• Mantenha-se positivo</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Linguagem Corporal</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Postura ereta e confiante</li>
                  <li>• Aperto de mão firme</li>
                  <li>• Sorriso genuíno</li>
                  <li>• Gestos naturais</li>
                  <li>• Evite cruzar os braços</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Seu Progresso</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    Perguntas Praticadas: {answeredQuestions.length} / {filteredQuestions.length}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(progress)}%
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {answeredQuestions.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Respondidas</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {filteredQuestions.length - answeredQuestions.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Restantes</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {categories.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Categorias</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InterviewPrep;