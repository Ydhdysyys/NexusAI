import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Brain, ArrowLeft, User, Bell, Shield, Palette, Save, Mail, Lock, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import ThemeToggle from '@/components/ThemeToggle';
import { TwoFactorSetup } from '@/components/TwoFactorSetup';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';

const Settings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [loading2FA, setLoading2FA] = useState(true);
  const [showSetup2FA, setShowSetup2FA] = useState(false);
  
  const [profile, setProfile] = useState({
    fullName: user?.email?.split('@')[0] || '',
    email: user?.email || '',
    phone: '',
    bio: ''
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReport: true,
    courseUpdates: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false
  });

  const saveProfile = () => {
    toast({
      title: t('settings.profileUpdated'),
      description: t('settings.profileUpdateDesc')
    });
  };

  const saveNotifications = () => {
    toast({
      title: t('settings.notificationsSaved'),
      description: t('settings.notificationsSavedDesc')
    });
  };

  const savePrivacy = () => {
    toast({
      title: t('settings.privacyUpdated'),
      description: t('settings.privacyUpdatedDesc')
    });
  };

  useEffect(() => {
    const check2FA = async () => {
      try {
        const { data } = await supabase.auth.mfa.listFactors();
        setMfaEnabled(data?.totp && data.totp.length > 0 || false);
      } catch (error) {
        console.error('[SETTINGS] Failed to check 2FA status');
      } finally {
        setLoading2FA(false);
      }
    };
    check2FA();
  }, []);

  const handleDisable2FA = async () => {
    try {
      const { data: factors } = await supabase.auth.mfa.listFactors();
      const totpFactor = factors?.totp?.[0];
      
      if (totpFactor) {
        const { error } = await supabase.auth.mfa.unenroll({ factorId: totpFactor.id });
        if (error) throw error;
        
        setMfaEnabled(false);
        toast({
          title: t('settings.2FADisabled'),
          description: t('settings.2FADisabledDesc'),
        });
      }
    } catch (error: any) {
      toast({
        title: t('settings.error2FA'),
        description: t('settings.error2FA'),
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar</span>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-gradient-primary">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Configurações
                </span>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{t('settings.profile')}</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4" />
                <span className="hidden sm:inline">{t('settings.security')}</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">{t('settings.notifications')}</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">{t('settings.privacy')}</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center space-x-2">
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">{t('settings.appearance')}</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="border-primary/20 shadow-nexus animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-primary" />
                    <span>Informações do Perfil</span>
                  </CardTitle>
                  <CardDescription>
                    Atualize suas informações pessoais e profissionais
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nome Completo</Label>
                      <Input
                        id="fullName"
                        value={profile.fullName}
                        onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>E-mail</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      placeholder="Conte um pouco sobre você..."
                    />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <Lock className="h-4 w-4" />
                      <span>Senha</span>
                    </Label>
                    <Button variant="outline" className="w-full sm:w-auto">
                      Alterar Senha
                    </Button>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={saveProfile} className="flex items-center space-x-2">
                      <Save className="h-4 w-4" />
                      <span>Salvar Alterações</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              {showSetup2FA ? (
                <TwoFactorSetup 
                  onComplete={() => {
                    setShowSetup2FA(false);
                    setMfaEnabled(true);
                  }}
                  onSkip={() => setShowSetup2FA(false)}
                />
              ) : (
                <Card className="border-primary/20 shadow-nexus animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                      <span>Segurança da Conta</span>
                    </CardTitle>
                    <CardDescription>
                      Gerencie suas configurações de segurança e autenticação
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        A autenticação em dois fatores (2FA) adiciona uma camada extra de segurança à sua conta
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-all">
                        <div className="space-y-1">
                          <Label className="text-base font-semibold">Autenticação em Dois Fatores</Label>
                          <p className="text-sm text-muted-foreground">
                            {mfaEnabled 
                              ? 'Protegendo sua conta com código TOTP' 
                              : 'Adicione uma camada extra de segurança'}
                          </p>
                          {mfaEnabled && (
                            <Badge className="mt-2 bg-green-500/10 text-green-600 hover:bg-green-500/20">
                              Ativado
                            </Badge>
                          )}
                        </div>
                        {!loading2FA && (
                          mfaEnabled ? (
                            <Button 
                              variant="outline" 
                              onClick={handleDisable2FA}
                              className="text-destructive hover:text-destructive"
                            >
                              Desativar
                            </Button>
                          ) : (
                            <Button onClick={() => setShowSetup2FA(true)}>
                              Ativar 2FA
                            </Button>
                          )
                        )}
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label className="flex items-center space-x-2">
                          <Lock className="h-4 w-4" />
                          <span>Alterar Senha</span>
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Mantenha sua senha forte e segura
                        </p>
                        <Button variant="outline" className="w-full sm:w-auto mt-2">
                          Alterar Senha
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card className="border-primary/20 shadow-nexus animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-primary" />
                    <span>Preferências de Notificação</span>
                  </CardTitle>
                  <CardDescription>
                    Gerencie como você recebe atualizações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-all">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Notificações por E-mail</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba atualizações importantes por e-mail
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, emailNotifications: checked})
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-all">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">Notificações Push</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba notificações no navegador
                        </p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, pushNotifications: checked})
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-all">
                      <div className="space-y-0.5">
                        <Label htmlFor="weekly-report">Relatório Semanal</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba um resumo do seu progresso semanalmente
                        </p>
                      </div>
                      <Switch
                        id="weekly-report"
                        checked={notifications.weeklyReport}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, weeklyReport: checked})
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-all">
                      <div className="space-y-0.5">
                        <Label htmlFor="course-updates">Atualizações de Cursos</Label>
                        <p className="text-sm text-muted-foreground">
                          Notificações sobre novos cursos e conteúdos
                        </p>
                      </div>
                      <Switch
                        id="course-updates"
                        checked={notifications.courseUpdates}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, courseUpdates: checked})
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={saveNotifications} className="flex items-center space-x-2">
                      <Save className="h-4 w-4" />
                      <span>Salvar Preferências</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy">
              <Card className="border-primary/20 shadow-nexus animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Privacidade e Segurança</span>
                  </CardTitle>
                  <CardDescription>
                    Controle quem pode ver suas informações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-border">
                      <Label className="text-base">Visibilidade do Perfil</Label>
                      <p className="text-sm text-muted-foreground mb-3">
                        Quem pode ver seu perfil
                      </p>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="visibility"
                            value="public"
                            checked={privacy.profileVisibility === 'public'}
                            onChange={(e) => setPrivacy({...privacy, profileVisibility: e.target.value})}
                            className="text-primary"
                          />
                          <span className="text-sm">Público - Todos podem ver</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="visibility"
                            value="private"
                            checked={privacy.profileVisibility === 'private'}
                            onChange={(e) => setPrivacy({...privacy, profileVisibility: e.target.value})}
                            className="text-primary"
                          />
                          <span className="text-sm">Privado - Apenas você</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-all">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-email">Mostrar E-mail</Label>
                        <p className="text-sm text-muted-foreground">
                          Exibir e-mail no seu perfil público
                        </p>
                      </div>
                      <Switch
                        id="show-email"
                        checked={privacy.showEmail}
                        onCheckedChange={(checked) => 
                          setPrivacy({...privacy, showEmail: checked})
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-all">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-phone">Mostrar Telefone</Label>
                        <p className="text-sm text-muted-foreground">
                          Exibir telefone no seu perfil público
                        </p>
                      </div>
                      <Switch
                        id="show-phone"
                        checked={privacy.showPhone}
                        onCheckedChange={(checked) => 
                          setPrivacy({...privacy, showPhone: checked})
                        }
                      />
                    </div>
                  </div>

                  <Separator />
                  
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                    <h4 className="font-medium text-destructive mb-2">Zona de Perigo</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Ações irreversíveis da conta
                    </p>
                    <Button variant="destructive" size="sm">
                      Excluir Conta
                    </Button>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={savePrivacy} className="flex items-center space-x-2">
                      <Save className="h-4 w-4" />
                      <span>Salvar Configurações</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance">
              <Card className="border-primary/20 shadow-nexus animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="h-5 w-5 text-primary" />
                    <span>Aparência</span>
                  </CardTitle>
                  <CardDescription>
                    Personalize a interface do aplicativo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-border">
                      <Label className="text-base mb-3 block">Tema</Label>
                      <div className="flex items-center space-x-4">
                        <ThemeToggle />
                        <span className="text-sm text-muted-foreground">
                          Alternar entre modo claro e escuro
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border border-border">
                      <Label className="text-base">Tamanho da Fonte</Label>
                      <p className="text-sm text-muted-foreground mb-3">
                        Ajuste o tamanho do texto na interface
                      </p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Pequeno</Button>
                        <Button variant="default" size="sm">Médio</Button>
                        <Button variant="outline" size="sm">Grande</Button>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border border-border">
                      <Label className="text-base">Cor de Destaque</Label>
                      <p className="text-sm text-muted-foreground mb-3">
                        Escolha a cor principal do aplicativo
                      </p>
                      <div className="flex space-x-2">
                        <div className="w-10 h-10 rounded-lg bg-blue-500 hover:scale-110 transition-transform cursor-pointer border-2 border-primary" />
                        <div className="w-10 h-10 rounded-lg bg-purple-500 hover:scale-110 transition-transform cursor-pointer" />
                        <div className="w-10 h-10 rounded-lg bg-green-500 hover:scale-110 transition-transform cursor-pointer" />
                        <div className="w-10 h-10 rounded-lg bg-orange-500 hover:scale-110 transition-transform cursor-pointer" />
                        <div className="w-10 h-10 rounded-lg bg-pink-500 hover:scale-110 transition-transform cursor-pointer" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="flex items-center space-x-2">
                      <Save className="h-4 w-4" />
                      <span>Salvar Aparência</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Settings;
