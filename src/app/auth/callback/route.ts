import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/dashboard'

  if (code) {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            cookieStore.set(name, value, options)
          },
          remove(name: string, options: any) {
            cookieStore.delete(name)
          },
        },
      }
    )

    // Échanger le code contre une session
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Redirection vers le dashboard ou la page demandée
      return NextResponse.redirect(new URL(next, request.url))
    }
  }

  // En cas d'erreur, rediriger vers la page d'erreur
  return NextResponse.redirect(new URL('/auth/auth-code-error', request.url))
}
