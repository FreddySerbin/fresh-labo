# 🚀 Quick Start - Développement Fresh Lab'O

## ⚡ Démarrage Immédiat

Vous avez la base de données Supabase configurée et le MCP opérationnel !
Voici comment commencer le développement **maintenant**.

---

## 📦 Étape 1 : Installer les Dépendances Essentielles

```bash
cd "d:\Informatique\Fresh LabO"

# Installer les packages Supabase
npm install @supabase/auth-helpers-nextjs @supabase/supabase-js

# Installer Zustand pour state management
npm install zustand

# Installer Zod pour validation
npm install zod

# Installer React Hook Form
npm install react-hook-form @hookform/resolvers

# Installer Sonner pour notifications
npm install sonner

# Installer date-fns pour manipulation dates
npm install date-fns
```

---

## 🔧 Étape 2 : Configuration Variables d'Environnement

Créez `.env.local` à la racine :

```bash
# Supabase (DÉJÀ CONFIGURÉ)
NEXT_PUBLIC_SUPABASE_URL=https://oqpzjyceerdmdxrszjib.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key_ici
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key_ici

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3001

# Google Calendar (À CONFIGURER PLUS TARD)
# GOOGLE_CLIENT_ID=
# GOOGLE_CLIENT_SECRET=
# GOOGLE_CALENDAR_ID=
# GOOGLE_REFRESH_TOKEN=

# Resend Email (À CONFIGURER PLUS TARD)
# RESEND_API_KEY=
# RESEND_FROM_EMAIL=
```

**📝 Note :** Récupérez vos clés Supabase depuis https://supabase.com/dashboard/project/oqpzjyceerdmdxrszjib/settings/api

---

## 🏗️ Étape 3 : Créer la Structure de Base

### 3.1 Client Supabase

```bash
# Créer les dossiers
New-Item -ItemType Directory -Force -Path "src\lib\supabase"
```

Créez `src/lib/supabase/client.ts` :

```typescript
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'

// Client pour les composants React
export const supabase = createClientComponentClient()

// Client admin pour les API routes (avec service role key)
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
```

### 3.2 Générer les Types TypeScript

```bash
# Installer Supabase CLI
npm install -g supabase

# Générer types depuis votre schéma
npx supabase gen types typescript --project-id oqpzjyceerdmdxrszjib > src/types/supabase.ts
```

### 3.3 Context d'Authentification

```bash
New-Item -ItemType Directory -Force -Path "src\contexts"
```

Créez `src/contexts/AuthContext.tsx` :

```typescript
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, userData: any) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Récupérer la session initiale
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Écouter les changements d'auth
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, userData: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    })
    if (error) throw error
    
    // Créer le profil utilisateur
    if (data.user) {
      await supabase.from('users').insert({
        id: data.user.id,
        full_name: userData.full_name,
        phone: userData.phone,
      })
    }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

### 3.4 Wrapper l'App

Modifiez `src/app/layout.tsx` :

```typescript
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from 'sonner'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} ${inter.variable}`}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  )
}
```

---

## 🎯 Étape 4 : Créer la Première Fonctionnalité

### 4.1 Page de Connexion

```bash
New-Item -ItemType Directory -Force -Path "src\app\auth\login"
```

Créez `src/app/auth/login/page.tsx` :

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signIn(formData.email, formData.password)
      toast.success('Connexion réussie !')
      router.push('/dashboard')
    } catch (error: any) {
      toast.error(error.message || 'Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-display-small text-dark-blue font-poppins font-bold mb-6 text-center">
          Connexion
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-body font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-cyan focus:border-transparent"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-body font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-cyan focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={loading}
          >
            Se connecter
          </Button>
        </form>

        <p className="mt-6 text-center text-body-small text-gray-600">
          Pas encore de compte ?{' '}
          <a href="/auth/register" className="text-primary-cyan hover:text-primary-orange font-semibold">
            S'inscrire
          </a>
        </p>
      </div>
    </div>
  )
}
```

### 4.2 API Route - Services

```bash
New-Item -ItemType Directory -Force -Path "src\app\api\services"
```

Créez `src/app/api/services/route.ts` :

```typescript
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    const { data: services, error } = await supabase
      .from('services')
      .select(`
        *,
        service_options (*)
      `)
      .eq('active', true)
      .order('category')
      .order('display_order')

    if (error) throw error

    return NextResponse.json({ services })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
```

---

## 🧪 Étape 5 : Tester

```bash
# Démarrer le serveur de développement
npm run dev
```

Ouvrez http://localhost:3001 et testez :

1. **Page d'accueil** → Doit s'afficher correctement
2. **Login** → Allez sur http://localhost:3001/auth/login
3. **API Services** → Testez http://localhost:3001/api/services

---

## 📋 Prochaines Étapes Recommandées

### Jour 1-2 : Authentification Complète
1. ✅ Page `/auth/register` (inscription)
2. ✅ Page `/auth/reset-password`
3. ✅ Middleware de protection
4. ✅ Tests de connexion/déconnexion

### Jour 3-4 : Flow de Réservation - Partie 1
1. ✅ Zustand store booking
2. ✅ Page `/booking/estimate`
3. ✅ Validation Zod

### Jour 5-7 : Flow de Réservation - Partie 2
1. ✅ Page `/booking/calendar`
2. ✅ Page `/booking/info`
3. ✅ Page `/booking/confirmation`
4. ✅ Page `/booking/success`

### Jour 8-10 : API Réservations
1. ✅ POST `/api/bookings` (création)
2. ✅ GET `/api/bookings` (liste)
3. ✅ Tests API

---

## 🎯 Commandes Utiles

```bash
# Développement
npm run dev                    # Démarrer serveur dev

# Qualité du code
npm run lint                   # ESLint
npm run type-check             # TypeScript check
npm run format                 # Prettier

# Build
npm run build                  # Build production
npm run start                  # Démarrer production

# Base de données (via MCP Supabase)
# Utilisez Cursor AI avec : "Via MCP Supabase, affiche-moi..."
```

---

## 🐛 Dépannage

### Erreur : Module not found '@/...'
```bash
# Vérifier tsconfig.json paths
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Erreur : Supabase client
```bash
# Vérifier .env.local
# Les clés doivent commencer par NEXT_PUBLIC_ pour être accessibles côté client
```

### Erreur : Port already in use
```bash
# Tuer le processus sur le port 3001
Get-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess | Stop-Process -Force
```

---

## 📚 Ressources

- **Documentation :** `docs/DEVELOPMENT_PLAN.md` (Plan complet)
- **Tâches :** `docs/TODO.md` (Liste détaillée)
- **Supabase Dashboard :** https://supabase.com/dashboard/project/oqpzjyceerdmdxrszjib
- **MCP Supabase :** Utilisez Cursor AI pour interagir avec la BDD

---

## ✅ Checklist Premier Jour

- [ ] Variables d'environnement configurées
- [ ] Dépendances installées
- [ ] Client Supabase créé
- [ ] Types TypeScript générés
- [ ] AuthProvider implémenté
- [ ] Page login fonctionnelle
- [ ] API services testée
- [ ] Serveur dev tourne

**Félicitations ! Vous êtes prêt à développer ! 🚀**

---

**Pour toute question, consultez :**
- `docs/DEVELOPMENT_PLAN.md` - Plan complet
- `docs/TODO.md` - Liste des tâches
- `docs/SUPABASE_MCP_SETUP.md` - Utilisation du MCP

**Bon développement ! 🧼✨**
