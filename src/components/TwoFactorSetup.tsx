import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Shield, Loader2, Copy, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TwoFactorSetupProps {
  onComplete?: () => void;
  onSkip?: () => void;
  requireSetup?: boolean;
}

export const TwoFactorSetup = ({ onComplete, onSkip, requireSetup = false }: TwoFactorSetupProps) => {
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [factorId, setFactorId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [step, setStep] = useState<'enroll' | 'verify' | 'complete'>('enroll');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const startEnrollment = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'Autenticador App'
      });

      if (error) throw error;

      setQrCode(data.totp.qr_code);
      setSecret(data.totp.secret);
      setFactorId(data.id);
      setStep('verify');
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Falha ao iniciar 2FA',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyAndEnable = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast({
        title: 'Erro',
        description: 'Digite o código de 6 dígitos',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.mfa.challenge({ factorId });
      if (error) throw error;

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: data.id,
        code: verificationCode,
      });

      if (verifyError) throw verifyError;

      // Generate backup codes (simulated - in production, store these securely)
      const codes = Array.from({ length: 8 }, () => 
        Math.random().toString(36).substring(2, 10).toUpperCase()
      );
      setBackupCodes(codes);
      setStep('complete');

      toast({
        title: 'Sucesso!',
        description: '2FA ativado com sucesso',
      });
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Código inválido',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const copyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: 'Copiado!',
      description: 'Códigos de backup copiados',
    });
  };

  useEffect(() => {
    if (step === 'enroll') {
      startEnrollment();
    }
  }, []);

  if (step === 'verify') {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Configure Autenticação em Dois Fatores</CardTitle>
          </div>
          <CardDescription>
            Escaneie o QR code com seu aplicativo autenticador
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertDescription>
              Use Google Authenticator, Authy, ou outro app compatível com TOTP
            </AlertDescription>
          </Alert>

          {qrCode && (
            <div className="flex flex-col items-center space-y-4">
              <img src={qrCode} alt="QR Code" className="w-64 h-64 border rounded-lg" />
              
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Não consegue escanear? Digite manualmente:
                </p>
                <code className="block p-2 bg-muted rounded text-xs break-all">
                  {secret}
                </code>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="code">Código de Verificação</Label>
            <Input
              id="code"
              type="text"
              placeholder="000000"
              maxLength={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
              className="text-center text-2xl tracking-widest"
            />
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={verifyAndEnable} 
              disabled={loading || verificationCode.length !== 6}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                'Verificar e Ativar'
              )}
            </Button>
            {!requireSetup && onSkip && (
              <Button variant="outline" onClick={onSkip}>
                Pular
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 'complete') {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <CardTitle>2FA Ativado!</CardTitle>
          </div>
          <CardDescription>
            Guarde seus códigos de backup em local seguro
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertDescription>
              <strong>IMPORTANTE:</strong> Salve estes códigos em local seguro. 
              Você pode usá-los se perder acesso ao seu autenticador.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label>Códigos de Backup</Label>
            <div className="bg-muted p-4 rounded-lg space-y-1 font-mono text-sm">
              {backupCodes.map((code, i) => (
                <div key={i}>{code}</div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={copyBackupCodes} variant="outline" className="flex-1">
              {copied ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copiar Códigos
                </>
              )}
            </Button>
            <Button onClick={onComplete} className="flex-1">
              Continuar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </CardContent>
    </Card>
  );
};
