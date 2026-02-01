import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

// Client pour les API routes et Server Components avec gestion des cookies
// Respecte l'authentification de l'utilisateur connecté
export function createServerSupabaseClient() {
  const cookieStore = cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}

// Client admin pour les opérations nécessitant un accès complet
// ⚠️ ATTENTION: Cette clé contourne TOUTES les politiques RLS
// À n'utiliser QUE dans les API routes Next.js pour des opérations admin
// JAMAIS exposer ce client côté client !
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
