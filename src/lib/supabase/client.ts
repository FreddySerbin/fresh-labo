import { createBrowserClient } from '@supabase/ssr'

// Client pour les composants React (client-side)
// ⚠️ Ce client utilise la clé ANON et respecte les politiques RLS
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
