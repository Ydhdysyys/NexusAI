import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { createInitialAdmin } from '@/utils/createAdmin';
import { Shield } from 'lucide-react';

const SetupAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const { toast } = useToast();

  const handleCreateAdmin = async () => {
    setLoading(true);
    
    const result = await createInitialAdmin();
    
    if (result.success) {
      setCreated(true);
      toast({
        title: 'Admin criado com sucesso!',
        description: 'Email: admin@gmail.com | Senha: admin1234',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Erro ao criar admin',
        description: result.error?.message || 'Tente novamente',
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-nexus-purple/10 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-nexus-purple" />
          </div>
          <CardTitle className="text-2xl">Criar Administrador</CardTitle>
          <CardDescription>
            Configure o administrador inicial do sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!created ? (
            <>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <p className="text-sm font-medium">Credenciais do Admin:</p>
                <p className="text-sm text-muted-foreground">
                  <strong>Nome:</strong> Davi Eichelberger
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Email:</strong> admin@gmail.com
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Senha:</strong> admin1234
                </p>
              </div>
              
              <Button 
                onClick={handleCreateAdmin} 
                disabled={loading}
                className="w-full bg-nexus-purple hover:bg-nexus-purple-dark text-white font-semibold"
              >
                {loading ? 'Criando...' : 'Criar Admin'}
              </Button>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="bg-success/10 text-success p-4 rounded-lg">
                <p className="font-semibold">Administrador criado!</p>
                <p className="text-sm mt-2">Você já pode fazer login com as credenciais acima.</p>
              </div>
              <Button 
                onClick={() => window.location.href = '/auth'}
                className="w-full bg-nexus-purple hover:bg-nexus-purple-dark text-white font-semibold"
              >
                Ir para Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SetupAdmin;