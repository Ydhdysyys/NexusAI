import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, User, BookOpen, Target, TrendingUp, LogOut, ArrowLeft, Home, Settings as SettingsIcon, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import ResumeBuilder from '@/components/ResumeBuilder';
import InterviewPrep from '@/components/InterviewPrep';
import SkillsDevelopment from '@/components/SkillsDevelopment';
import ThemeToggle from '@/components/ThemeToggle';

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
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<'home' | 'resume' | 'interview' | 'skills'>('home');

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

  const renderContent = () => {
    switch (activeSection) {
      case 'resume':
        return <ResumeBuilder />;
      case 'interview':
        return <InterviewPrep />;
      case 'skills':
        return <SkillsDevelopment />;
      default:
        return renderHomeContent();
    }
  };

  const renderHomeContent = () => (
    <>
      {/* Welcome Section */}
      <div className="text-center space-y-4 animate-fade-in relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
          <Sparkles className="h-8 w-8 text-primary animate-pulse" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {t('dashboard.welcome')}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {user?.email?.split('@')[0] || ''}
        </p>
        <div className="flex items-center justify-center space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/settings')}
            className="flex items-center space-x-2 hover-scale"
          >
            <SettingsIcon className="h-4 w-4" />
            <span>Configurações</span>
          </Button>
        </div>
      </div>

      {/* Profile Card */}
      <Card className="border-primary/20 shadow-nexus animate-fade-in hover:shadow-glow transition-all duration-300">
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="border-primary/20 hover:border-primary/40 transition-all animate-fade-in bg-gradient-to-br from-blue-500/10 to-blue-600/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cursos Concluídos</p>
                <h3 className="text-3xl font-bold text-primary">12</h3>
              </div>
              <BookOpen className="h-10 w-10 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-primary/20 hover:border-primary/40 transition-all animate-fade-in bg-gradient-to-br from-green-500/10 to-green-600/5" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Habilidades</p>
                <h3 className="text-3xl font-bold text-primary">24</h3>
              </div>
              <Target className="h-10 w-10 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-primary/20 hover:border-primary/40 transition-all animate-fade-in bg-gradient-to-br from-purple-500/10 to-purple-600/5" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Progresso Geral</p>
                <h3 className="text-3xl font-bold text-primary">78%</h3>
              </div>
              <TrendingUp className="h-10 w-10 text-purple-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          className="group border-primary/20 hover:border-primary/40 hover:shadow-glow transition-all duration-300 cursor-pointer animate-fade-in hover-scale bg-gradient-to-br from-card to-card/50"
          onClick={() => setActiveSection('resume')}
        >
          <CardHeader>
            <div className="p-3 w-fit rounded-xl bg-gradient-primary mb-2 group-hover:scale-110 transition-transform">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-xl">
              {t('dashboard.resume')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {t('dashboard.resumeDesc')}
            </p>
          </CardContent>
        </Card>

        <Card 
          className="group border-primary/20 hover:border-primary/40 hover:shadow-glow transition-all duration-300 cursor-pointer animate-fade-in hover-scale bg-gradient-to-br from-card to-card/50"
          onClick={() => setActiveSection('interview')}
          style={{ animationDelay: '0.1s' }}
        >
          <CardHeader>
            <div className="p-3 w-fit rounded-xl bg-gradient-primary mb-2 group-hover:scale-110 transition-transform">
              <Target className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-xl">
              {t('dashboard.interview')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {t('dashboard.interviewDesc')}
            </p>
          </CardContent>
        </Card>

        <Card 
          className="group border-primary/20 hover:border-primary/40 hover:shadow-glow transition-all duration-300 cursor-pointer animate-fade-in hover-scale bg-gradient-to-br from-card to-card/50"
          onClick={() => setActiveSection('skills')}
          style={{ animationDelay: '0.2s' }}
        >
          <CardHeader>
            <div className="p-3 w-fit rounded-xl bg-gradient-primary mb-2 group-hover:scale-110 transition-transform">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-xl">
              {t('dashboard.skills')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {t('dashboard.skillsDesc')}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-gradient-primary">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  NexusAI
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 hover:bg-primary/10"
              >
              <Home className="h-4 w-4" />
                <span>{t('dashboard.backHome')}</span>
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>{t('auth.logout')}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {activeSection !== 'home' && (
            <Button 
              variant="outline" 
              onClick={() => setActiveSection('home')}
              className="flex items-center space-x-2 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar ao Dashboard</span>
            </Button>
          )}
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;