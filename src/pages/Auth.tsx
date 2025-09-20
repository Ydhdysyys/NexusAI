import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/AuthModal';
import { Brain } from 'lucide-react';

const Auth = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Set initial mode based on navigation state
  useEffect(() => {
    const state = location.state as { mode?: 'login' | 'register' };
    if (state?.mode) {
      setAuthMode(state.mode);
    }
  }, [location.state]);

  // Redirect to dashboard if already authenticated
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 flex items-center justify-center p-4">
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
          isOpen={true}
          onClose={() => {}} // Don't allow closing on auth page
          mode={authMode}
          onSwitchMode={setAuthMode}
        />
      </div>
    </div>
  );
};

export default Auth;