import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Verificar se já existe um admin
    const { data: existingAdmin } = await supabaseAdmin
      .from('user_roles')
      .select('id')
      .eq('role', 'admin')
      .single()

    if (existingAdmin) {
      return new Response(
        JSON.stringify({ error: 'Admin já existe no sistema' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Criar usuário admin
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: 'admin@gmail.com',
      password: 'admin1234',
      email_confirm: true,
      user_metadata: {
        full_name: 'Davi Eichelberger'
      }
    })

    if (authError) {
      throw authError
    }

    // Atualizar role para admin
    const { error: roleError } = await supabaseAdmin
      .from('user_roles')
      .update({ role: 'admin' })
      .eq('user_id', authData.user.id)

    if (roleError) {
      throw roleError
    }

    // Atualizar profile
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({ role: 'admin' })
      .eq('user_id', authData.user.id)

    if (profileError) {
      throw profileError
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Admin criado com sucesso',
        email: 'admin@gmail.com'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})