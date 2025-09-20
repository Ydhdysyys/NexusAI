import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Modal from "@/components/ui/modal";
import { Eye, EyeOff, Mail, Lock, User, Check } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  onSwitchMode: (mode: 'login' | 'register') => void;
}

const AuthModal = ({ isOpen, onClose, mode, onSwitchMode }: AuthModalProps) => {
  const { signUp, signIn, verifyOtp, resendConfirmation, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    verificationCode: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'verify'>('form');

  // Close modal if user becomes authenticated
  useEffect(() => {
    if (user && isOpen) {
      onClose();
    }
  }, [user, isOpen, onClose]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (mode === 'register') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('As senhas não coincidem');
        }
        
        const { error } = await signUp(formData.email, formData.password, formData.name);
        if (!error) {
          setStep('verify');
        }
      } else {
        const { error } = await signIn(formData.email, formData.password);
        if (!error) {
          onClose();
        }
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await verifyOtp(formData.email, formData.verificationCode);
      if (!error) {
        onClose();
      }
    } catch (error: any) {
      console.error('Verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      await resendConfirmation(formData.email);
    } catch (error: any) {
      console.error('Resend error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetModal = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      verificationCode: ''
    });
    setStep('form');
    setShowPassword(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleSwitchMode = (newMode: 'login' | 'register') => {
    resetModal();
    onSwitchMode(newMode);
  };

  if (step === 'verify') {
    return (
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Verificar E-mail"
      >
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
            <Mail className="h-8 w-8 text-success" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Confirme seu e-mail</h3>
            <p className="text-muted-foreground">
              Enviamos um código de verificação para<br />
              <strong>{formData.email}</strong>
            </p>
          </div>

          <form onSubmit={handleVerification} className="space-y-4">
            <div>
              <Label htmlFor="verification-code">Código de Verificação</Label>
              <Input
                id="verification-code"
                placeholder="Digite o código de 6 dígitos"
                className="text-center text-lg tracking-widest"
                maxLength={6}
                value={formData.verificationCode}
                onChange={(e) => handleInputChange('verificationCode', e.target.value)}
                required
              />
            </div>

            <div className="space-y-3">
              <Button 
                type="submit"
                className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Verificar E-mail
                  </>
                )}
              </Button>
              
              <Button 
                type="button"
                variant="ghost" 
                className="w-full text-muted-foreground hover:text-foreground transition-colors"
                onClick={handleResendCode}
                disabled={isLoading}
              >
                Reenviar código
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={mode === 'login' ? 'Entrar na sua conta' : 'Criar conta no NexusAI'}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {mode === 'register' && (
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                className="pl-10 transition-all duration-300 focus:shadow-glow"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="pl-10 transition-all duration-300 focus:shadow-glow"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pl-10 pr-10 transition-all duration-300 focus:shadow-glow"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {mode === 'register' && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 transition-all duration-300 focus:shadow-glow"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required
              />
            </div>
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02]"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            mode === 'login' ? 'Entrar' : 'Criar Conta'
          )}
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => handleSwitchMode(mode === 'login' ? 'register' : 'login')}
            className="text-primary hover:text-primary/80 transition-colors text-sm"
          >
            {mode === 'login' 
              ? 'Não tem uma conta? Cadastre-se' 
              : 'Já tem uma conta? Entre'
            }
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AuthModal;