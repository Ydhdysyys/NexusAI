import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, User, BookOpen, Target, TrendingUp, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  full_name: string;
  email: string;
  career_field?: string;
  experience_level: string;
  bio?: string;
  created_at: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar perfil",
          description: error.message
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, toast]);

  const handleLogout = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-gradient-primary">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                NexusAI
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Olá, {profile?.full_name || user?.email}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Bem-vindo ao NexusAI
            </h1>
            <p className="text-xl text-muted-foreground">
              Sua jornada profissional personalizada começa agora
            </p>
          </div>

          {/* Profile Card */}
          <Card className="border-primary/20 shadow-nexus">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>Seu Perfil</span>
              </CardTitle>
              <CardDescription>
                Informações do seu perfil profissional
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nome</p>
                  <p className="text-lg">{profile?.full_name || 'Não informado'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">E-mail</p>
                  <p className="text-lg">{profile?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Área de Interesse</p>
                  <p className="text-lg">{profile?.career_field || 'Não definida'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nível de Experiência</p>
                  <Badge variant={profile?.experience_level === 'entry' ? 'secondary' : 'default'}>
                    {profile?.experience_level === 'entry' ? 'Iniciante' : profile?.experience_level}
                  </Badge>
                </div>
              </div>
              {profile?.bio && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bio</p>
                  <p className="text-base">{profile.bio}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-primary/20 hover:shadow-glow transition-all duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Currículo Inteligente</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Crie e otimize seu currículo com IA personalizada para sua área
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:shadow-glow transition-all duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Preparação para Entrevistas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Treine com simulações de entrevistas personalizadas
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:shadow-glow transition-all duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Desenvolvimento de Habilidades</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Identifique e desenvolva as habilidades mais demandadas
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;