# Plan de Développement Complet - Fresh Lab'O

## 📋 Vue d'Ensemble

Ce document décrit le plan complet de développement de Fresh Lab'O avec Supabase comme backend principal, incluant l'authentification, la gestion des réservations, l'intégration Google Calendar et l'envoi d'emails.

**Status Actuel :** ✅ Base de données Supabase configurée avec 18 services et 29 options

---

## 🏗️ Architecture Globale

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (Next.js 14)                    │
├─────────────────────────────────────────────────────────────┤
│  • Pages (App Router)                                        │
│  • Components (React 18 + Framer Motion)                     │
│  • State Management (Zustand)                                │
│  • Validation (Zod + React Hook Form)                        │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                   API ROUTES (Next.js)                       │
├─────────────────────────────────────────────────────────────┤
│  • /api/auth/*        - Authentification                     │
│  • /api/bookings/*    - Gestion réservations                 │
│  • /api/services/*    - Services & options                   │
│  • /api/calendar/*    - Google Calendar                      │
│  • /api/estimates/*   - Devis                                │
│  • /api/emails/*      - Envoi emails (Resend)                │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND & SERVICES                          │
├──────────────────┬──────────────────┬───────────────────────┤
│   SUPABASE       │  GOOGLE CALENDAR │      RESEND           │
│                  │                  │                       │
│ • Auth           │ • Availability   │ • Confirmations       │
│ • PostgreSQL     │ • Event Creation │ • Reminders           │
│ • RLS Policies   │ • Sync           │ • Notifications       │
│ • Real-time      │                  │                       │
└──────────────────┴──────────────────┴───────────────────────┘
```

---

## 🔐 PHASE 1 : Authentification & Gestion Utilisateurs

### 1.1 Configuration Supabase Auth

**Objectif :** Permettre aux clients de créer un compte et se connecter.

#### Tâches

**1.1.1 Configuration Supabase (via Dashboard)**
```bash
# Dans Supabase Dashboard:
# - Authentication > Providers > Enable Email
# - Authentication > Email Templates > Personnaliser
# - Authentication > URL Configuration > Site URL, Redirect URLs
```

**1.1.2 Créer le Client Supabase**
```typescript
// src/lib/supabase/client.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'

// Client-side (components)
export const supabase = createClientComponentClient()

// Server-side (API routes)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Admin access
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
```

**1.1.3 Types TypeScript pour Supabase**
```bash
# Générer les types depuis le schéma
npx supabase gen types typescript --project-id oqpzjyceerdmdxrszjib > src/types/supabase.ts
```

**1.1.4 Auth Context Provider**
```typescript
// src/contexts/AuthContext.tsx
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
  resetPassword: (email: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Implementation avec gestion de session
}

export const useAuth = () => useContext(AuthContext)
```

**1.1.5 Pages d'Authentification**
- `/auth/login` - Connexion
- `/auth/register` - Inscription
- `/auth/reset-password` - Réinitialisation mot de passe
- `/auth/callback` - Callback OAuth

**1.1.6 Middleware de Protection**
```typescript
// src/middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protéger les routes /dashboard/*
  if (req.nextUrl.pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*']
}
```

#### Livrables Phase 1.1
- ✅ Client Supabase configuré
- ✅ Auth Context Provider
- ✅ Pages login/register/reset
- ✅ Middleware de protection
- ✅ Types TypeScript

---

### 1.2 Gestion du Profil Utilisateur

**Objectif :** Permettre aux utilisateurs de gérer leur profil.

#### Tâches

**1.2.1 API Route - Profil**
```typescript
// src/app/api/profile/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  return Response.json({ profile })
}

export async function PUT(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  const body = await request.json()
  
  const { data, error } = await supabase
    .from('users')
    .upsert({
      id: user.id,
      ...body,
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  return Response.json({ profile: data })
}
```

**1.2.2 Page Profil**
- `/dashboard/profile` - Modifier profil (nom, téléphone, adresse)
- Validation avec Zod + React Hook Form

#### Livrables Phase 1.2
- ✅ API Route profil (GET, PUT)
- ✅ Page édition profil
- ✅ Validation formulaire

---

## 📅 PHASE 2 : Système de Réservation

### 2.1 Flow de Réservation Complet

**Flow Utilisateur :**
```
1. Accueil → Choisir service
2. /booking/estimate → Sélection options + Calcul prix
3. /booking/calendar → Choisir date/heure
4. /booking/info → Infos client + Adresse
5. /booking/confirmation → Vérification finale
6. /booking/success → Confirmation + Numéro réservation
```

#### Tâches

**2.1.1 State Management (Zustand)**
```typescript
// src/store/bookingStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BookingState {
  // Service selection
  serviceId: string | null
  serviceName: string | null
  basePrice: number
  
  // Options
  selectedOptions: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
  
  // Date/Time
  scheduledDate: Date | null
  timeSlot: 'morning' | 'afternoon' | null
  
  // Client info
  clientName: string
  clientEmail: string
  clientPhone: string
  address: string
  postalCode: string
  city: string
  accessCode?: string
  floor?: string
  specialNotes?: string
  
  // Pricing
  estimatedPrice: number
  
  // Actions
  setService: (service: any) => void
  addOption: (option: any) => void
  removeOption: (optionId: string) => void
  setDateTime: (date: Date, slot: 'morning' | 'afternoon') => void
  setClientInfo: (info: any) => void
  calculateTotal: () => number
  reset: () => void
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      // Initial state
      serviceId: null,
      serviceName: null,
      basePrice: 0,
      selectedOptions: [],
      scheduledDate: null,
      timeSlot: null,
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      address: '',
      postalCode: '',
      city: '',
      estimatedPrice: 0,
      
      // Actions implementation
      setService: (service) => set({ 
        serviceId: service.id,
        serviceName: service.name,
        basePrice: service.base_price
      }),
      
      addOption: (option) => set((state) => ({
        selectedOptions: [...state.selectedOptions, option]
      })),
      
      removeOption: (optionId) => set((state) => ({
        selectedOptions: state.selectedOptions.filter(opt => opt.id !== optionId)
      })),
      
      setDateTime: (date, slot) => set({
        scheduledDate: date,
        timeSlot: slot
      }),
      
      setClientInfo: (info) => set(info),
      
      calculateTotal: () => {
        const state = get()
        const optionsTotal = state.selectedOptions.reduce(
          (sum, opt) => sum + (opt.price * opt.quantity),
          0
        )
        return state.basePrice + optionsTotal
      },
      
      reset: () => set({
        serviceId: null,
        serviceName: null,
        basePrice: 0,
        selectedOptions: [],
        scheduledDate: null,
        timeSlot: null,
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        address: '',
        postalCode: '',
        city: '',
        accessCode: '',
        floor: '',
        specialNotes: '',
        estimatedPrice: 0
      })
    }),
    {
      name: 'booking-storage',
    }
  )
)
```

**2.1.2 Validation Schemas (Zod)**
```typescript
// src/lib/validations/booking.ts
import { z } from 'zod'

export const clientInfoSchema = z.object({
  clientName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  clientEmail: z.string().email('Email invalide'),
  clientPhone: z.string().regex(/^0[1-9][0-9]{8}$/, 'Numéro de téléphone invalide'),
  address: z.string().min(5, 'Adresse invalide'),
  postalCode: z.string().regex(/^[0-9]{5}$/, 'Code postal invalide'),
  city: z.string().min(2, 'Ville invalide'),
  accessCode: z.string().optional(),
  floor: z.string().optional(),
  specialNotes: z.string().max(500, 'Maximum 500 caractères').optional()
})

export const bookingSchema = z.object({
  serviceId: z.string().uuid('Service invalide'),
  selectedOptions: z.array(z.object({
    id: z.string().uuid(),
    quantity: z.number().min(1)
  })),
  scheduledDate: z.date().min(new Date(), 'La date doit être dans le futur'),
  timeSlot: z.enum(['morning', 'afternoon']),
  ...clientInfoSchema.shape
})
```

**2.1.3 Pages de Réservation**

**Page 1 : /booking/estimate**
- Afficher le service sélectionné
- Liste des options disponibles
- Calcul en temps réel du prix total
- Bouton "Continuer vers le calendrier"

**Page 2 : /booking/calendar**
- Calendrier interactif (react-calendar ou similaire)
- Désactivation des dates passées
- Choix du créneau (Matin 9h-13h / Après-midi 14h-18h)
- Vérification de disponibilité via Google Calendar
- Bouton "Continuer vers les informations"

**Page 3 : /booking/info**
- Formulaire client (si non connecté)
- Pré-remplissage si connecté
- Adresse d'intervention
- Informations d'accès
- Notes spéciales
- Bouton "Voir le récapitulatif"

**Page 4 : /booking/confirmation**
- Récapitulatif complet :
  - Service + options
  - Date et heure
  - Adresse
  - Prix total
- CGV à accepter
- Bouton "Confirmer la réservation"

**Page 5 : /booking/success**
- Numéro de réservation (ex: FR-2026-0001)
- Récapitulatif de la réservation
- Liens vers :
  - Ajouter au calendrier (Google Calendar, iCal)
  - Dashboard (si connecté)
  - Retour accueil
- Email de confirmation envoyé

#### Livrables Phase 2.1
- ✅ Zustand store pour booking
- ✅ Schemas de validation Zod
- ✅ 5 pages du flow de réservation
- ✅ Navigation entre les étapes

---

### 2.2 API Routes - Réservations

**2.2.1 POST /api/bookings - Créer une réservation**
```typescript
// src/app/api/bookings/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { bookingSchema } from '@/lib/validations/booking'
import { createGoogleCalendarEvent } from '@/lib/google-calendar'
import { sendBookingConfirmationEmail } from '@/lib/emails'

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const body = await request.json()
    
    // Validation
    const validated = bookingSchema.parse(body)
    
    // Get user if authenticated
    const { data: { user } } = await supabase.auth.getUser()
    
    // Create booking
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        user_id: user?.id || null,
        service_id: validated.serviceId,
        status: 'pending',
        scheduled_date: validated.scheduledDate,
        scheduled_time_slot: validated.timeSlot,
        estimated_price: validated.estimatedPrice,
        address: validated.address,
        postal_code: validated.postalCode,
        city: validated.city,
        access_code: validated.accessCode,
        floor: validated.floor,
        special_notes: validated.specialNotes,
        client_name: validated.clientName,
        client_email: validated.clientEmail,
        client_phone: validated.clientPhone
      })
      .select()
      .single()
    
    if (error) throw error
    
    // Insert booking options
    if (validated.selectedOptions.length > 0) {
      const { error: optionsError } = await supabase
        .from('booking_options')
        .insert(
          validated.selectedOptions.map(opt => ({
            booking_id: booking.id,
            option_id: opt.id,
            quantity: opt.quantity,
            price_at_booking: opt.price
          }))
        )
      
      if (optionsError) throw optionsError
    }
    
    // Create Google Calendar event
    const calendarEvent = await createGoogleCalendarEvent({
      booking,
      service: validated.serviceName,
      timeSlot: validated.timeSlot
    })
    
    // Update booking with calendar event ID
    if (calendarEvent?.id) {
      await supabase
        .from('bookings')
        .update({ google_calendar_event_id: calendarEvent.id })
        .eq('id', booking.id)
    }
    
    // Send confirmation email
    await sendBookingConfirmationEmail({
      booking,
      clientEmail: validated.clientEmail
    })
    
    return Response.json({ 
      success: true,
      booking,
      bookingNumber: booking.booking_number
    })
    
  } catch (error: any) {
    console.error('Booking creation error:', error)
    return Response.json(
      { error: error.message || 'Erreur lors de la création de la réservation' },
      { status: 400 }
    )
  }
}

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  const { data: bookings, error } = await supabase
    .from('bookings')
    .select(`
      *,
      service:services(*),
      booking_options(
        *,
        option:service_options(*)
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
  
  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }
  
  return Response.json({ bookings })
}
```

**2.2.2 GET /api/bookings/[id] - Détails d'une réservation**
**2.2.3 PUT /api/bookings/[id] - Modifier une réservation (pending only)**
**2.2.4 DELETE /api/bookings/[id]/cancel - Annuler une réservation**

#### Livrables Phase 2.2
- ✅ API POST /api/bookings (création)
- ✅ API GET /api/bookings (liste)
- ✅ API GET /api/bookings/[id] (détails)
- ✅ API PUT /api/bookings/[id] (modification)
- ✅ API DELETE /api/bookings/[id]/cancel (annulation)

---

### 2.3 API Routes - Services & Estimations

**2.3.1 GET /api/services - Liste des services**
```typescript
// src/app/api/services/route.ts
export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })
  
  const { data: services, error } = await supabase
    .from('services')
    .select(`
      *,
      service_options(*)
    `)
    .eq('active', true)
    .order('category')
    .order('display_order')
  
  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }
  
  return Response.json({ services })
}
```

**2.3.2 GET /api/services/[category] - Services par catégorie**

**2.3.3 POST /api/estimates - Créer un devis**
```typescript
// src/app/api/estimates/route.ts
export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const body = await request.json()
  
  const { data: estimate, error } = await supabase
    .from('estimates')
    .insert({
      session_id: body.sessionId,
      user_email: body.email,
      service_category: body.category,
      service_id: body.serviceId,
      estimated_price: body.price,
      estimated_duration: body.duration,
      options: body.options,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 jours
    })
    .select()
    .single()
  
  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }
  
  return Response.json({ estimate })
}
```

#### Livrables Phase 2.3
- ✅ API GET /api/services
- ✅ API GET /api/services/[category]
- ✅ API POST /api/estimates

---

## 📆 PHASE 3 : Intégration Google Calendar

### 3.1 Configuration Google Calendar API

**Objectif :** Synchroniser les réservations avec Google Calendar pour gérer la disponibilité.

#### Tâches

**3.1.1 Configuration Google Cloud**
```bash
# 1. Aller sur console.cloud.google.com
# 2. Créer un nouveau projet "Fresh Labo"
# 3. Activer Google Calendar API
# 4. Créer des credentials OAuth 2.0
# 5. Ajouter les redirect URIs :
#    - http://localhost:3000/api/auth/callback/google (dev)
#    - https://fresh-labo.vercel.app/api/auth/callback/google (prod)
# 6. Copier Client ID et Client Secret
```

**Variables d'environnement :**
```env
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_CALENDAR_ID=xxx@group.calendar.google.com
GOOGLE_REFRESH_TOKEN=xxx
```

**3.1.2 Client Google Calendar**
```typescript
// src/lib/google-calendar/client.ts
import { google } from 'googleapis'

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NEXTAUTH_URL + '/api/auth/callback/google'
)

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
})

export const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

export async function createCalendarEvent(booking: any) {
  const startTime = new Date(booking.scheduled_date)
  
  // Set time based on slot
  if (booking.scheduled_time_slot === 'morning') {
    startTime.setHours(9, 0, 0)
  } else {
    startTime.setHours(14, 0, 0)
  }
  
  const endTime = new Date(startTime)
  endTime.setMinutes(endTime.getMinutes() + booking.estimated_duration)
  
  const event = {
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    resource: {
      summary: `Fresh Lab'O - ${booking.service.name}`,
      description: `
        Client: ${booking.client_name}
        Téléphone: ${booking.client_phone}
        Email: ${booking.client_email}
        
        Adresse:
        ${booking.address}
        ${booking.postal_code} ${booking.city}
        ${booking.floor ? 'Étage: ' + booking.floor : ''}
        ${booking.access_code ? 'Code: ' + booking.access_code : ''}
        
        ${booking.special_notes ? 'Notes: ' + booking.special_notes : ''}
        
        Numéro réservation: ${booking.booking_number}
      `,
      location: `${booking.address}, ${booking.postal_code} ${booking.city}`,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: 'Europe/Paris'
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'Europe/Paris'
      },
      colorId: '5', // Yellow
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 60 } // 1 hour before
        ]
      }
    }
  }
  
  const response = await calendar.events.insert(event)
  return response.data
}

export async function checkAvailability(date: Date, timeSlot: 'morning' | 'afternoon') {
  const startTime = new Date(date)
  const endTime = new Date(date)
  
  if (timeSlot === 'morning') {
    startTime.setHours(9, 0, 0)
    endTime.setHours(13, 0, 0)
  } else {
    startTime.setHours(14, 0, 0)
    endTime.setHours(18, 0, 0)
  }
  
  const response = await calendar.events.list({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    timeMin: startTime.toISOString(),
    timeMax: endTime.toISOString(),
    singleEvents: true
  })
  
  return response.data.items?.length === 0 // true if available
}

export async function updateCalendarEvent(eventId: string, updates: any) {
  const response = await calendar.events.patch({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    eventId,
    resource: updates
  })
  
  return response.data
}

export async function deleteCalendarEvent(eventId: string) {
  await calendar.events.delete({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    eventId
  })
}
```

**3.1.3 API Routes - Calendar**

**GET /api/calendar/availability**
```typescript
// src/app/api/calendar/availability/route.ts
import { checkAvailability } from '@/lib/google-calendar/client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const date = new Date(searchParams.get('date') || '')
  const slot = searchParams.get('slot') as 'morning' | 'afternoon'
  
  if (!date || !slot) {
    return Response.json({ error: 'Missing parameters' }, { status: 400 })
  }
  
  const isAvailable = await checkAvailability(date, slot)
  
  return Response.json({ available: isAvailable })
}
```

**GET /api/calendar/busy-dates**
```typescript
// Get all busy dates for the next 3 months
export async function GET() {
  const now = new Date()
  const threeMonthsLater = new Date()
  threeMonthsLater.setMonth(now.getMonth() + 3)
  
  const response = await calendar.events.list({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    timeMin: now.toISOString(),
    timeMax: threeMonthsLater.toISOString(),
    singleEvents: true
  })
  
  const busyDates = response.data.items?.map(event => ({
    date: event.start?.dateTime,
    slot: getTimeSlot(event.start?.dateTime)
  }))
  
  return Response.json({ busyDates })
}
```

#### Livrables Phase 3.1
- ✅ Configuration Google Cloud
- ✅ Client Google Calendar
- ✅ Fonctions CRUD événements
- ✅ API availability check
- ✅ API busy dates

---

## 📧 PHASE 4 : Système d'Emails (Resend)

### 4.1 Configuration & Templates

**Objectif :** Envoyer des emails de confirmation, rappels et notifications.

#### Tâches

**4.1.1 Configuration Resend**
```bash
# 1. Créer compte sur resend.com
# 2. Vérifier domaine (freshlabo.com ou sous-domaine)
# 3. Générer API Key
```

**Variables d'environnement :**
```env
RESEND_API_KEY=re_xxx
RESEND_FROM_EMAIL=contact@freshlabo.com
```

**4.1.2 Client Resend**
```typescript
// src/lib/emails/client.ts
import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)
```

**4.1.3 Templates d'Emails (React Email)**
```bash
npm install react-email @react-email/components
```

**Template 1 : Confirmation de réservation**
```typescript
// src/emails/BookingConfirmation.tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text
} from '@react-email/components'

interface BookingConfirmationProps {
  bookingNumber: string
  clientName: string
  serviceName: string
  date: string
  timeSlot: string
  address: string
  price: number
}

export default function BookingConfirmation({
  bookingNumber,
  clientName,
  serviceName,
  date,
  timeSlot,
  address,
  price
}: BookingConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Votre réservation Fresh Lab'O #{bookingNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Réservation Confirmée ✓</Heading>
          
          <Text style={text}>
            Bonjour {clientName},
          </Text>
          
          <Text style={text}>
            Votre réservation a été confirmée avec succès !
          </Text>
          
          <Section style={box}>
            <Text style={label}>Numéro de réservation</Text>
            <Text style={value}>{bookingNumber}</Text>
            
            <Text style={label}>Service</Text>
            <Text style={value}>{serviceName}</Text>
            
            <Text style={label}>Date & Heure</Text>
            <Text style={value}>
              {date} - {timeSlot === 'morning' ? 'Matin (9h-13h)' : 'Après-midi (14h-18h)'}
            </Text>
            
            <Text style={label}>Adresse</Text>
            <Text style={value}>{address}</Text>
            
            <Text style={label}>Prix</Text>
            <Text style={value}>{price}€</Text>
          </Section>
          
          <Button style={button} href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/bookings/${bookingNumber}`}>
            Voir ma réservation
          </Button>
          
          <Text style={footer}>
            Si vous avez des questions, contactez-nous :
            <br />
            📞 06 95 05 77 96
            <br />
            📧 contact@freshlabo.com
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = { backgroundColor: '#f6f9fc', fontFamily: 'Inter, sans-serif' }
const container = { margin: '0 auto', padding: '40px 20px' }
const h1 = { color: '#00BFFF', fontSize: '32px', fontWeight: 'bold' }
const text = { color: '#374151', fontSize: '16px', lineHeight: '24px' }
const box = { backgroundColor: '#fff', borderRadius: '8px', padding: '24px', margin: '24px 0' }
const label = { color: '#6B7280', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }
const value = { color: '#111827', fontSize: '16px', marginBottom: '16px' }
const button = { 
  backgroundColor: '#00BFFF',
  color: '#fff',
  padding: '12px 24px',
  borderRadius: '8px',
  textDecoration: 'none',
  display: 'inline-block'
}
const footer = { color: '#6B7280', fontSize: '14px', marginTop: '32px' }
```

**Template 2 : Rappel 24h avant**
**Template 3 : Réservation annulée**
**Template 4 : Service complété - Demande d'avis**

**4.1.4 Fonctions d'Envoi**
```typescript
// src/lib/emails/send.ts
import { resend } from './client'
import BookingConfirmation from '@/emails/BookingConfirmation'

export async function sendBookingConfirmationEmail(data: any) {
  const { booking, clientEmail } = data
  
  const { data: email, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: clientEmail,
    subject: `Réservation confirmée - Fresh Lab'O #${booking.booking_number}`,
    react: BookingConfirmation({
      bookingNumber: booking.booking_number,
      clientName: booking.client_name,
      serviceName: booking.service.name,
      date: new Date(booking.scheduled_date).toLocaleDateString('fr-FR'),
      timeSlot: booking.scheduled_time_slot,
      address: `${booking.address}, ${booking.postal_code} ${booking.city}`,
      price: booking.estimated_price
    })
  })
  
  if (error) {
    console.error('Email send error:', error)
    throw error
  }
  
  return email
}

export async function sendReminderEmail(booking: any) {
  // Implementation...
}

export async function sendCancellationEmail(booking: any) {
  // Implementation...
}

export async function sendReviewRequestEmail(booking: any) {
  // Implementation...
}
```

**4.1.5 Cron Job - Rappels automatiques**
```typescript
// src/app/api/cron/send-reminders/route.ts
import { supabaseAdmin } from '@/lib/supabase/client'
import { sendReminderEmail } from '@/lib/emails/send'

export async function GET(request: Request) {
  // Vérifier que c'est bien Vercel Cron qui appelle
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  // Trouver les réservations dans 24h
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  
  const dayAfterTomorrow = new Date(tomorrow)
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1)
  
  const { data: bookings } = await supabaseAdmin
    .from('bookings')
    .select('*')
    .eq('status', 'confirmed')
    .gte('scheduled_date', tomorrow.toISOString())
    .lt('scheduled_date', dayAfterTomorrow.toISOString())
  
  // Envoyer les rappels
  for (const booking of bookings || []) {
    await sendReminderEmail(booking)
  }
  
  return Response.json({ sent: bookings?.length || 0 })
}
```

**Configuration Vercel Cron :**
```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/send-reminders",
      "schedule": "0 9 * * *"
    }
  ]
}
```

#### Livrables Phase 4.1
- ✅ Configuration Resend
- ✅ 4 templates d'emails React
- ✅ Fonctions d'envoi
- ✅ Cron job rappels
- ✅ Configuration Vercel Cron

---

## 🏠 PHASE 5 : Dashboard Client

### 5.1 Pages Dashboard

**Objectif :** Permettre aux clients de gérer leurs réservations.

#### Structure
```
/dashboard
  ├── /dashboard                    # Vue d'ensemble
  ├── /dashboard/bookings           # Liste des réservations
  ├── /dashboard/bookings/[id]      # Détails réservation
  ├── /dashboard/profile            # Profil utilisateur
  └── /dashboard/history            # Historique
```

#### Tâches

**5.1.1 Layout Dashboard**
```typescript
// src/app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  )
}
```

**5.1.2 Page /dashboard - Vue d'ensemble**
- Prochaine réservation (card)
- Statistiques (total réservations, dépenses)
- Liens rapides

**5.1.3 Page /dashboard/bookings - Liste**
```typescript
// src/app/dashboard/bookings/page.tsx
export default async function BookingsPage() {
  const bookings = await getBookings()
  
  return (
    <div>
      <h1>Mes Réservations</h1>
      
      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">À venir</TabsTrigger>
          <TabsTrigger value="past">Passées</TabsTrigger>
          <TabsTrigger value="cancelled">Annulées</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <BookingsList bookings={bookings.filter(b => b.status === 'confirmed')} />
        </TabsContent>
        
        {/* ... autres tabs */}
      </Tabs>
    </div>
  )
}
```

**5.1.4 Page /dashboard/bookings/[id] - Détails**
- Toutes les informations de la réservation
- Boutons d'action :
  - Modifier (si pending)
  - Annuler (si confirmed, >48h avant)
  - Télécharger PDF
  - Ajouter au calendrier

**5.1.5 Composants Réutilisables**
- `<BookingCard>` - Card réservation
- `<BookingStatus>` - Badge de statut
- `<BookingTimeline>` - Timeline des événements
- `<CancelBookingDialog>` - Modal annulation

#### Livrables Phase 5.1
- ✅ Layout dashboard
- ✅ Page vue d'ensemble
- ✅ Page liste réservations
- ✅ Page détails réservation
- ✅ Composants UI réutilisables

---

## 🎨 PHASE 6 : Améliorations UX/UI

### 6.1 Features Additionnelles

**6.1.1 Notifications Toast**
```bash
npm install sonner
```

**6.1.2 Loading States**
- Skeleton loaders
- Spinners
- Progress bars

**6.1.3 Animations**
- Page transitions
- Micro-interactions
- Scroll animations

**6.1.4 Responsive Design**
- Mobile-first
- Tablette
- Desktop

**6.1.5 Accessibilité**
- ARIA labels
- Keyboard navigation
- Screen reader support

#### Livrables Phase 6.1
- ✅ Système de notifications
- ✅ Loading states partout
- ✅ Animations fluides
- ✅ 100% responsive
- ✅ Accessibilité (WCAG 2.1)

---

## 📊 PHASE 7 : Analytics & Monitoring

### 7.1 Tracking & Monitoring

**7.1.1 Vercel Analytics**
```bash
npm install @vercel/analytics
```

**7.1.2 Error Tracking (Sentry)**
```bash
npm install @sentry/nextjs
```

**7.1.3 Performance Monitoring**
- Core Web Vitals
- API response times
- Database query performance

**7.1.4 Business Metrics**
- Taux de conversion (estimate → booking)
- Services les plus populaires
- Revenu par catégorie
- Taux d'annulation

#### Livrables Phase 7.1
- ✅ Vercel Analytics configuré
- ✅ Sentry error tracking
- ✅ Dashboard de métriques
- ✅ Rapports automatiques

---

## 🧪 PHASE 8 : Tests & Qualité

### 8.1 Tests

**8.1.1 Tests Unitaires (Jest + React Testing Library)**
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
```

**8.1.2 Tests E2E (Playwright)**
```bash
npm install -D @playwright/test
```

**Scénarios E2E :**
- Flow de réservation complet
- Connexion/inscription
- Modification de profil
- Annulation de réservation

**8.1.3 Tests API (Postman/Thunder Client)**
- Collection de tests pour toutes les API routes

#### Livrables Phase 8.1
- ✅ Tests unitaires (>70% coverage)
- ✅ Tests E2E (scénarios critiques)
- ✅ Tests API automatisés
- ✅ CI/CD avec GitHub Actions

---

## 📦 PHASE 9 : Déploiement & Production

### 9.1 Configuration Production

**9.1.1 Variables d'Environnement Vercel**
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Google Calendar
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALENDAR_ID=
GOOGLE_REFRESH_TOKEN=

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=

# App
NEXT_PUBLIC_APP_URL=https://fresh-labo.vercel.app
CRON_SECRET=
```

**9.1.2 Domaine Personnalisé**
- freshlabo.com → Vercel
- Configuration DNS
- Certificat SSL

**9.1.3 Optimisations**
- Image optimization
- Code splitting
- Caching strategy
- CDN configuration

#### Livrables Phase 9.1
- ✅ App déployée sur Vercel
- ✅ Domaine configuré
- ✅ SSL activé
- ✅ Optimisations prod

---

## 📅 CALENDRIER DE DÉVELOPPEMENT

### Sprint 1 (Semaine 1-2) : Fondations
- ✅ Configuration Supabase Auth
- ✅ Pages authentification
- ✅ Auth Context Provider
- ✅ Middleware de protection
- ✅ Types TypeScript

### Sprint 2 (Semaine 3-4) : Réservations Core
- ✅ Zustand store booking
- ✅ Pages flow réservation (1-5)
- ✅ API POST /api/bookings
- ✅ Validation Zod
- ✅ Page success

### Sprint 3 (Semaine 5-6) : Google Calendar
- ✅ Configuration Google Cloud
- ✅ Client Google Calendar
- ✅ API availability
- ✅ Création événements auto
- ✅ Integration dans booking flow

### Sprint 4 (Semaine 7-8) : Emails & Notifications
- ✅ Configuration Resend
- ✅ Templates React Email
- ✅ Email confirmation
- ✅ Cron job rappels
- ✅ Email annulation

### Sprint 5 (Semaine 9-10) : Dashboard Client
- ✅ Layout dashboard
- ✅ Page liste réservations
- ✅ Page détails + actions
- ✅ Page profil
- ✅ Composants UI

### Sprint 6 (Semaine 11-12) : Polish & Tests
- ✅ Animations & transitions
- ✅ Responsive complet
- ✅ Tests E2E
- ✅ Optimisations
- ✅ Déploiement prod

**TOTAL : 12 semaines (3 mois)**

---

## 🎯 PRIORISATION DES FEATURES

### MVP (Must Have) - Phase 1
1. ✅ Authentification basique (email/password)
2. ✅ Flow de réservation complet
3. ✅ Création réservation dans Supabase
4. ✅ Email de confirmation
5. ✅ Dashboard simple (liste réservations)

### Phase 2 (Should Have)
1. ✅ Google Calendar integration
2. ✅ Rappels automatiques
3. ✅ Annulation de réservation
4. ✅ Profil utilisateur
5. ✅ Historique complet

### Phase 3 (Nice to Have)
1. Notifications push
2. Programme de fidélité
3. Codes promo
4. Réservations récurrentes
5. Chat support

---

## 📈 MÉTRIQUES DE SUCCÈS

### KPIs Techniques
- ⚡ Lighthouse Score : >90
- 🚀 Page Load Time : <2s
- 🎯 API Response Time : <200ms
- 📊 Test Coverage : >70%
- 🐛 Error Rate : <0.1%

### KPIs Business
- 📈 Taux de conversion : >15%
- ⭐ Satisfaction client : >4.5/5
- 🔄 Taux de retour : >30%
- ❌ Taux d'annulation : <5%
- 📧 Taux d'ouverture email : >40%

---

## 🛠️ STACK TECHNIQUE FINALE

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand (state)
- React Hook Form + Zod

### Backend
- Next.js API Routes
- Supabase (PostgreSQL + Auth)
- Google Calendar API
- Resend (emails)

### Infrastructure
- Vercel (hosting)
- Supabase (database)
- GitHub (code)
- GitHub Actions (CI/CD)

### Monitoring
- Vercel Analytics
- Sentry
- Supabase Dashboard

---

## 📚 DOCUMENTATION À CRÉER

1. **README.md** - Guide de démarrage
2. **API_DOCUMENTATION.md** - Toutes les API routes
3. **DEPLOYMENT.md** - Guide de déploiement
4. **CONTRIBUTING.md** - Guide pour contributeurs
5. **CHANGELOG.md** - Historique des versions
6. **USER_GUIDE.md** - Guide utilisateur
7. **ADMIN_GUIDE.md** - Guide administrateur

---

## ✅ CHECKLIST FINALE

### Sécurité
- [ ] RLS policies testées
- [ ] Variables d'environnement sécurisées
- [ ] Rate limiting API
- [ ] CSRF protection
- [ ] XSS prevention
- [ ] SQL injection protection (via Supabase)

### Performance
- [ ] Images optimisées
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Caching strategy
- [ ] CDN configured

### SEO
- [ ] Meta tags
- [ ] Open Graph
- [ ] Sitemap.xml
- [ ] robots.txt
- [ ] Schema.org markup

### Legal
- [ ] CGV
- [ ] Mentions légales
- [ ] Politique de confidentialité
- [ ] RGPD compliance
- [ ] Cookies banner

---

**🎉 FÉLICITATIONS ! Vous avez maintenant un plan complet pour développer Fresh Lab'O !**

**Prochaine étape :** Commencer le Sprint 1 - Authentification & Fondations

*Document créé le 29/01/2026*
*Dernière mise à jour : 29/01/2026*
