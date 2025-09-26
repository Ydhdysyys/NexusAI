import { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/AuthModal';
import { Brain } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const Auth = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Set initial mode based on navigation state
  useEffect(() => {
    const state = location.state as { mode?: 'login' | 'signup' };
    if (state?.mode) {
      setAuthMode(state.mode);
    }
  }, [location.state]);

  // Redirect to dashboard if already authenticated
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Fixed Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
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

        {/* Auth Modal as Component */}
        <AuthModal
          open={true}
          onOpenChange={() => navigate('/')} // Navigate back to homepage
          mode={authMode}
        />
      </div>
    </div>
  );
};

export default Auth;