import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2, Shield, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useLanguage } from '@/contexts/LanguageContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface UserData {
  user_id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'client';
  created_at: string;
}

export const AdminPanel = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [emailConfirmationRequired, setEmailConfirmationRequired] = useState(true);
  const [savingEmailSetting, setSavingEmailSetting] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          user_id, 
          email, 
          full_name, 
          created_at,
          user_roles!inner(role)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const transformedData = data?.map(user => ({
        user_id: user.user_id,
        email: user.email,
        full_name: user.full_name,
        created_at: user.created_at,
        role: (user.user_roles as any).role
      })) || [];
      
      setUsers(transformedData);
    } catch (error) {
      toast({
        title: t('admin.errorFetch'),
        description: t('admin.errorFetch'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    loadEmailConfirmationSetting();
  }, []);

  const loadEmailConfirmationSetting = () => {
    const saved = localStorage.getItem('emailConfirmationRequired');
    if (saved !== null) {
      setEmailConfirmationRequired(saved === 'true');
    }
  };

  const handleEmailConfirmationToggle = async (checked: boolean) => {
    setSavingEmailSetting(true);
    try {
      localStorage.setItem('emailConfirmationRequired', checked.toString());
      setEmailConfirmationRequired(checked);
      
      toast({
        title: t('admin.settingsSaved'),
        description: checked 
          ? t('admin.emailConfirmationEnabled')
          : t('admin.emailConfirmationDisabled'),
      });
    } catch (error) {
      toast({
        title: t('admin.error'),
        description: t('admin.errorSavingSettings'),
        variant: 'destructive',
      });
    } finally {
      setSavingEmailSetting(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    // Validate UUID format
    const uuidSchema = z.string().uuid();
    const validation = uuidSchema.safeParse(userId);
    
    if (!validation.success) {
      toast({
        title: t('admin.errorDelete'),
        description: 'ID de usuário inválido',
        variant: 'destructive',
      });
      setDeleteUserId(null);
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: t('admin.errorDelete'),
          description: 'Sessão expirada',
          variant: 'destructive',
        });
        return;
      }

      // Call edge function to properly delete user (including auth.users)
      const response = await fetch(
        `https://bmtmyjxnixujqvoltzia.supabase.co/functions/v1/delete-user`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Falha ao deletar usuário');
      }

      toast({
        title: t('admin.userDeleted'),
        description: t('admin.userDeletedDesc'),
      });

      fetchUsers();
    } catch (error) {
      toast({
        title: t('admin.errorDelete'),
        description: t('admin.errorDelete'),
        variant: 'destructive',
      });
    } finally {
      setDeleteUserId(null);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <CardTitle>{t('admin.authSettings')}</CardTitle>
          </div>
          <CardDescription>
            {t('admin.authSettingsDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-confirmation" className="text-base">
                {t('admin.requireEmailConfirmation')}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t('admin.emailConfirmationDesc')}
              </p>
            </div>
            <Switch
              id="email-confirmation"
              checked={emailConfirmationRequired}
              onCheckedChange={handleEmailConfirmationToggle}
              disabled={savingEmailSetting}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>{t('admin.title')}</CardTitle>
          </div>
          <CardDescription>
            {t('admin.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('admin.name')}</TableHead>
                <TableHead>{t('admin.email')}</TableHead>
                <TableHead>{t('admin.role')}</TableHead>
                <TableHead>{t('admin.createdAt')}</TableHead>
                <TableHead className="text-right">{t('admin.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell className="font-medium">{user.full_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'admin'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-secondary/10 text-secondary-foreground'
                      }`}
                    >
                      {user.role === 'admin' ? t('admin.admin') : t('admin.client')}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteUserId(user.user_id)}
                      disabled={user.role === 'admin'}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteUserId} onOpenChange={() => setDeleteUserId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('admin.deleteUser')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('admin.deleteConfirm')} {t('admin.deleteDesc')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('admin.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteUserId && handleDeleteUser(deleteUserId)}
              className="bg-destructive hover:bg-destructive/90"
            >
              {t('admin.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
