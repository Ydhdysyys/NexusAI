import { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/AuthModal';
import { PasswordResetForm } from '@/components/PasswordResetForm';
import { Brain, Globe } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Auth = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'pt', label: '🇧🇷 Português', flag: '🇧🇷' },
    { code: 'en', label: '🇺🇸 English', flag: '🇺🇸' },
    { code: 'es', label: '🇪🇸 Español', flag: '🇪🇸' },
    { code: 'fr', label: '🇫🇷 Français', flag: '🇫🇷' },
    { code: 'de', label: '🇩🇪 Deutsch', flag: '🇩🇪' },
    { code: 'it', label: '🇮🇹 Italiano', flag: '🇮🇹' },
    { code: 'zh', label: '🇨🇳 中文', flag: '🇨🇳' },
    { code: 'ja', label: '🇯🇵 日本語', flag: '🇯🇵' },
    { code: 'ko', label: '🇰🇷 한국어', flag: '🇰🇷' },
    { code: 'ru', label: '🇷🇺 Русский', flag: '🇷🇺' },
    { code: 'ar', label: '🇸🇦 العربية', flag: '🇸🇦' },
    { code: 'hi', label: '🇮🇳 हिन्दी', flag: '🇮🇳' },
  ] as const;

  // Check for password recovery flow
  useEffect(() => {
    const checkPasswordRecovery = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const type = hashParams.get('type');
      
      if (type === 'recovery') {
        setIsPasswordReset(true);
      }
    };
    
    checkPasswordRecovery();
  }, []);

  // Set initial mode based on navigation state or URL params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const modeParam = searchParams.get('mode');
    
    if (modeParam === 'reset') {
      setAuthMode('reset');
    } else {
      const state = location.state as { mode?: 'login' | 'signup' };
      if (state?.mode) {
        setAuthMode(state.mode);
      }
    }
  }, [location.state, location.search]);

  // Redirect to dashboard if already authenticated (unless doing password reset)
  if (user && !isPasswordReset) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Fixed Theme Toggle and Language Selector */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="hover-scale">
              <Globe className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="max-h-[400px] overflow-y-auto">
            {languages.map((lang) => (
              <DropdownMenuItem 
                key={lang.code}
                onClick={() => setLanguage(lang.code as any)} 
                className={language === lang.code ? 'bg-primary/10' : ''}
              >
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-3 rounded-xl bg-gradient-primary">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              NexusAI
            </span>
          </div>
          <p className="text-muted-foreground">
            Sua jornada profissional começa aqui
          </p>
        </div>

        {/* Show password reset form or auth modal */}
        {isPasswordReset ? (
          <PasswordResetForm />
        ) : (
          <AuthModal
            open={true}
            onOpenChange={() => navigate('/')}
            mode={authMode}
          />
        )}
      </div>
    </div>
  );
};

export default Auth;