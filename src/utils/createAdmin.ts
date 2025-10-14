import { supabase } from "@/integrations/supabase/client";

export const createInitialAdmin = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('create-admin', {
      method: 'POST'
    });

    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('Erro ao criar admin:', error);
    return { success: false, error };
  }
};