# 🎯 Instructions pour Cursor AI - Fresh Lab'O

## 📋 Vue d'Ensemble

Ce document guide Cursor AI dans le développement de Fresh Lab'O, une plateforme de réservation pour services de nettoyage professionnel. Chaque section fournit des instructions spécifiques pour différentes parties du projet.

## 🚀 Phase de Développement Actuelle

**STATUS: Foundation & Setup (Sprint 1)**

Nous sommes au tout début du projet. Les fichiers de configuration sont créés, mais aucun code applicatif n'existe encore.

## 📁 Fichiers Disponibles

### Configuration & Documentation ✅
- `.cursorrules` - Règles de développement (LIRE EN PREMIER)
- `MVP.md` - Spécifications complètes du MVP
- `PROJECT_SUMMARY.md` - Résumé du projet
- `README.md` - Guide installation
- `package.json` - Dépendances
- `tsconfig.json` - Configuration TypeScript
- `tailwind.config.ts` - Configuration Tailwind avec couleurs Fresh Lab'O
- `.env.example` - Template variables d'environnement

### Base de Données ✅
- `supabase/migrations/001_initial_schema.sql` - Schéma complet
- `supabase/migrations/002_seed_data.sql` - Données initiales

### À Créer 🔨
Tous les fichiers applicatifs Next.js sont à créer.

---

## 🎨 PARTIE 1: SETUP INITIAL

### 1.1 Initialiser le Projet Next.js

```bash
# Si besoin de réinitialiser
npx create-next-app@latest fresh-labo --typescript --tailwind --app --src-dir --import-alias "@/*"

# Ou utiliser le package.json fourni
npm install
```

### 1.2 Créer la Structure de Dossiers

```bash
mkdir -p src/{app,components,lib,hooks,types,styles}
mkdir -p src/components/{ui,layout,booking,common}
mkdir -p src/lib/{supabase,calendar,email,validations,utils}
mkdir -p src/app/{api,dashboard}
mkdir -p src/app/\(auth\)/{login,register}
mkdir -p src/app/\(booking\)/{services,estimate,confirmation}
mkdir -p public/{images,icons}
```

### 1.3 Installer Dépendances Manquantes

```bash
npm install @supabase/supabase-js @supabase/ssr googleapis
npm install framer-motion react-hook-form zod @hookform/resolvers
npm install zustand date-fns clsx tailwind-merge lucide-react
npm install resend react-datepicker jspdf nanoid
npm install -D @types/react-datepicker
npm install @tailwindcss/forms @tailwindcss/typography
```

---

## 🎨 PARTIE 2: DESIGN SYSTEM

### 2.1 Créer `src/styles/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import Fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');

:root {
  /* Fresh Lab'O Colors */
  --primary-cyan: #00BFFF;
  --primary-orange: #FF8C00;
  --dark-blue: #1A1A4D;
  --navy: #0F1035;
  --light-blue: #40E0D0;
  --accent-orange: #FFB347;
  
  /* Fonts */
  --font-poppins: 'Poppins', sans-serif;
  --font-inter: 'Inter', sans-serif;
}

@layer base {
  body {
    @apply font-inter text-gray-900 bg-white;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-poppins font-bold;
  }
}

@layer components {
  /* Bubble Animation for Background */
  .bubble {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(0, 191, 255, 0.3), rgba(64, 224, 208, 0.3));
    animation: float 4s ease-in-out infinite;
  }
  
  .bubble:nth-child(2) {
    animation-delay: 1s;
  }
  
  .bubble:nth-child(3) {
    animation-delay: 2s;
  }
}

@layer utilities {
  /* Custom Utilities */
  .gradient-fresh {
    background: linear-gradient(135deg, #00BFFF 0%, #40E0D0 100%);
  }
  
  .gradient-warm {
    background: linear-gradient(135deg, #FF8C00 0%, #FFB347 100%);
  }
  
  .text-gradient-fresh {
    background: linear-gradient(135deg, #00BFFF 0%, #40E0D0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}
```

### 2.2 Créer Composants UI de Base

**Priority Order:**
1. `Button.tsx` - Bouton principal
2. `Card.tsx` - Cartes pour services
3. `Input.tsx` - Input formulaire
4. `Modal.tsx` - Modale confirmation
5. `LoadingSpinner.tsx` - Loading state
6. `Toast.tsx` - Notifications

**Pour chaque composant:**
- Utiliser TypeScript strict
- Props bien typées
- Variants pour différents styles
- Responsive par défaut
- Animations Framer Motion
- Respect couleurs Fresh Lab'O

**Exemple structure Button.tsx:**

```typescript
import { FC, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'font-poppins font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-gradient-fresh text-white shadow-soft-cyan hover:shadow-glow-cyan',
    secondary: 'border-2 border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-white',
    ghost: 'text-primary-cyan hover:bg-primary-cyan hover:bg-opacity-10',
    danger: 'bg-error text-white hover:bg-red-700',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin">⏳</span>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
};
```

---

## 🏠 PARTIE 3: LANDING PAGE

### 3.1 Structure de la Landing Page

Fichier: `src/app/page.tsx`

**Sections à créer:**
1. Header (sticky navigation)
2. Hero Section (fullscreen avec bulles animées)
3. Services Section (grid 4 services)
4. How It Works (3 étapes)
5. Why Choose Us (3 USPs)
6. CTA Section
7. Footer

### 3.2 Hero Section - Inspirations

**Éléments visuels:**
- Background: Gradient bleu avec bulles flottantes animées
- Titre principal: "Rafraîchissez vos espaces avec notre service de lavage professionnel"
- Sous-titre: "Des prix Fresh pour un résultat impeccable"
- CTA primaire: "Réserver maintenant" (bouton cyan large)
- CTA secondaire: "Voir nos services" (bouton outline orange)
- Image/Illustration: Produits de nettoyage ou avant/après

**Code référence bulles:**
```tsx
<div className="absolute inset-0 overflow-hidden">
  {[...Array(5)].map((_, i) => (
    <motion.div
      key={i}
      className="bubble"
      initial={{ y: '100%', x: `${Math.random() * 100}%` }}
      animate={{
        y: '-100%',
        x: `${Math.random() * 100}%`,
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        delay: i * 0.5,
      }}
      style={{
        width: 50 + Math.random() * 100,
        height: 50 + Math.random() * 100,
      }}
    />
  ))}
</div>
```

### 3.3 Services Section

**Créer 4 ServiceCard:**
1. Matelas (🛏️) - "À partir de 60€"
2. Véhicules (🚗) - "À partir de 55€"
3. Tapis (🧵) - "À partir de 50€"
4. Canapés (🛋️) - "À partir de 15€"

**Chaque card:**
- Hover effect (scale + shadow)
- Icon emoji
- Titre service
- Prix "à partir de"
- Bouton "Réserver"
- Link vers `/booking/services?category=matelas`

---

## 📅 PARTIE 4: BOOKING FLOW

### 4.1 Architecture du Flow

```
/booking/services → Sélection catégorie + service
/booking/estimate → Configuration options + calcul prix
/booking/details → Formulaire client
/booking/calendar → Choix date/heure
/booking/confirmation → Récapitulatif + validation
/booking/success → Confirmation finale
```

### 4.2 Page Services (`src/app/(booking)/services/page.tsx`)

**Fonctionnalités:**
- Afficher services selon catégorie (query param)
- Grid de ServiceCard avec détails
- Sélection → Navigate vers `/booking/estimate?serviceId=xxx`
- State management: Zustand store pour booking flow

**Store Zustand (`src/lib/store/booking.ts`):**
```typescript
import { create } from 'zustand';

interface BookingState {
  serviceId: string | null;
  selectedOptions: Array<{ optionId: string; quantity: number }>;
  estimatedPrice: number;
  clientInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    // ...
  } | null;
  scheduledDate: Date | null;
  
  // Actions
  setService: (id: string) => void;
  addOption: (optionId: string, quantity: number) => void;
  removeOption: (optionId: string) => void;
  setClientInfo: (info: any) => void;
  setScheduledDate: (date: Date) => void;
  calculatePrice: () => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  // Initial state
  serviceId: null,
  selectedOptions: [],
  estimatedPrice: 0,
  clientInfo: null,
  scheduledDate: null,
  
  // Actions
  setService: (id) => set({ serviceId: id }),
  
  addOption: (optionId, quantity) => set((state) => ({
    selectedOptions: [
      ...state.selectedOptions.filter(o => o.optionId !== optionId),
      { optionId, quantity }
    ]
  })),
  
  removeOption: (optionId) => set((state) => ({
    selectedOptions: state.selectedOptions.filter(o => o.optionId !== optionId)
  })),
  
  setClientInfo: (info) => set({ clientInfo: info }),
  
  setScheduledDate: (date) => set({ scheduledDate: date }),
  
  calculatePrice: () => {
    // Logic to calculate from service + options
    // Fetch from Supabase or calculate locally
  },
  
  reset: () => set({
    serviceId: null,
    selectedOptions: [],
    estimatedPrice: 0,
    clientInfo: null,
    scheduledDate: null,
  }),
}));
```

### 4.3 Page Estimate avec Calcul Prix Temps Réel

**Composant PriceCalculator:**
- Afficher service sélectionné
- Liste options disponibles (checkboxes/selects)
- Calcul automatique à chaque changement
- Affichage détaillé (base + options + total)
- Bouton "Continuer" vers details

**Logique Calcul:**
```typescript
// src/lib/utils/pricing.ts

export const calculateBookingPrice = (
  basePrice: number,
  options: Array<{ price: number; quantity: number }>
): number => {
  const optionsTotal = options.reduce(
    (sum, opt) => sum + (opt.price * opt.quantity),
    0
  );
  
  return basePrice + optionsTotal;
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
};
```

---

## 📧 PARTIE 5: FORMULAIRES & VALIDATION

### 5.1 Zod Schemas (`src/lib/validations/schemas.ts`)

```typescript
import { z } from 'zod';

export const clientInfoSchema = z.object({
  fullName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().regex(/^0[1-9]\d{8}$/, 'Numéro de téléphone invalide'),
  address: z.string().min(10, 'Adresse complète requise'),
  postalCode: z.string().regex(/^\d{5}$/, 'Code postal invalide'),
  city: z.string().min(2, 'Ville requise'),
  accessCode: z.string().optional(),
  floor: z.string().optional(),
  specialNotes: z.string().max(500, 'Maximum 500 caractères').optional(),
});

export type ClientInfo = z.infer<typeof clientInfoSchema>;

export const bookingSchema = z.object({
  serviceId: z.string().uuid('Service invalide'),
  selectedOptions: z.array(z.object({
    optionId: z.string().uuid(),
    quantity: z.number().min(1),
  })),
  scheduledDate: z.date().min(new Date(), 'Date doit être dans le futur'),
  clientInfo: clientInfoSchema,
});

export type Booking = z.infer<typeof bookingSchema>;
```

### 5.2 Formulaire avec React Hook Form

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clientInfoSchema, type ClientInfo } from '@/lib/validations/schemas';

export const ClientInfoForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClientInfo>({
    resolver: zodResolver(clientInfoSchema),
  });
  
  const onSubmit = async (data: ClientInfo) => {
    // Save to store and navigate
    useBookingStore.getState().setClientInfo(data);
    // router.push('/booking/calendar');
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Nom complet"
        {...register('fullName')}
        error={errors.fullName?.message}
      />
      
      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />
      
      {/* ... autres champs */}
      
      <Button type="submit" isLoading={isSubmitting}>
        Continuer
      </Button>
    </form>
  );
};
```

---

## 📅 PARTIE 6: GOOGLE CALENDAR INTEGRATION

### 6.1 Setup Client (`src/lib/calendar/client.ts`)

```typescript
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Set refresh token (obtenu lors du setup initial)
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

export const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

export { oauth2Client };
```

### 6.2 API Route: Disponibilités (`src/app/api/calendar/availability/route.ts`)

```typescript
import { NextResponse } from 'next/server';
import { calendar } from '@/lib/calendar/client';
import { startOfDay, endOfDay, addDays } from 'date-fns';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date');
    
    if (!dateParam) {
      return NextResponse.json({ error: 'Date required' }, { status: 400 });
    }
    
    const date = new Date(dateParam);
    const timeMin = startOfDay(date).toISOString();
    const timeMax = endOfDay(date).toISOString();
    
    // Fetch events from Google Calendar
    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: 'startTime',
    });
    
    const events = response.data.items || [];
    
    // Determine available slots (morning/afternoon)
    const morningBooked = events.some(e => {
      const start = new Date(e.start?.dateTime || '');
      return start.getHours() < 14;
    });
    
    const afternoonBooked = events.some(e => {
      const start = new Date(e.start?.dateTime || '');
      return start.getHours() >= 14;
    });
    
    return NextResponse.json({
      date: dateParam,
      slots: {
        morning: { available: !morningBooked, time: '9h-12h' },
        afternoon: { available: !afternoonBooked, time: '14h-18h' },
      },
    });
  } catch (error) {
    console.error('Calendar availability error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}
```

### 6.3 API Route: Créer Event (`src/app/api/calendar/create-event/route.ts`)

```typescript
import { NextResponse } from 'next/server';
import { calendar } from '@/lib/calendar/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { booking } = body;
    
    // Create event in Google Calendar
    const event = {
      summary: `Fresh Lab'O - ${booking.serviceName}`,
      description: `
        Client: ${booking.clientName}
        Email: ${booking.clientEmail}
        Téléphone: ${booking.clientPhone}
        Adresse: ${booking.address}
        Notes: ${booking.specialNotes || 'Aucune'}
      `,
      location: booking.address,
      start: {
        dateTime: booking.scheduledDate,
        timeZone: 'Europe/Paris',
      },
      end: {
        dateTime: booking.scheduledEnd,
        timeZone: 'Europe/Paris',
      },
      attendees: [
        { email: booking.clientEmail },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 24h avant
          { method: 'popup', minutes: 120 },      // 2h avant
        ],
      },
    };
    
    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: event,
      sendUpdates: 'all', // Send invitation to client
    });
    
    return NextResponse.json({
      success: true,
      eventId: response.data.id,
      eventLink: response.data.htmlLink,
    });
  } catch (error) {
    console.error('Calendar create event error:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
```

---

## 💾 PARTIE 7: SUPABASE INTEGRATION

### 7.1 Client Setup (`src/lib/supabase/client.ts`)

```typescript
import { createBrowserClient } from '@supabase/ssr';

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
```

### 7.2 Server Client (`src/lib/supabase/server.ts`)

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createServerSupabaseClient = () => {
  const cookieStore = cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
};
```

### 7.3 API Route: Créer Booking (`src/app/api/bookings/create/route.ts`)

```typescript
import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { bookingSchema } from '@/lib/validations/schemas';

export async function POST(request: Request) {
  try {
    const supabase = createServerSupabaseClient();
    const body = await request.json();
    
    // Validate
    const validated = bookingSchema.parse(body);
    
    // Get service details
    const { data: service } = await supabase
      .from('services')
      .select('*')
      .eq('id', validated.serviceId)
      .single();
    
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    
    // Calculate total price
    const { data: options } = await supabase
      .from('service_options')
      .select('*')
      .in('id', validated.selectedOptions.map(o => o.optionId));
    
    let totalPrice = service.base_price;
    options?.forEach(option => {
      const selected = validated.selectedOptions.find(o => o.optionId === option.id);
      if (selected) {
        totalPrice += option.price_modifier * selected.quantity;
      }
    });
    
    // Create booking
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        service_id: validated.serviceId,
        user_id: null, // TODO: Get from auth
        status: 'pending',
        scheduled_date: validated.scheduledDate.toISOString(),
        estimated_price: totalPrice,
        address: validated.clientInfo.address,
        postal_code: validated.clientInfo.postalCode,
        city: validated.clientInfo.city,
        client_name: validated.clientInfo.fullName,
        client_email: validated.clientInfo.email,
        client_phone: validated.clientInfo.phone,
        special_notes: validated.clientInfo.specialNotes,
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // Create booking options
    for (const opt of validated.selectedOptions) {
      const option = options?.find(o => o.id === opt.optionId);
      if (option) {
        await supabase.from('booking_options').insert({
          booking_id: booking.id,
          option_id: opt.optionId,
          quantity: opt.quantity,
          price_at_booking: option.price_modifier,
        });
      }
    }
    
    // Create Google Calendar event
    // await createCalendarEvent(booking);
    
    // Send confirmation email
    // await sendConfirmationEmail(booking);
    
    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        bookingNumber: booking.booking_number,
      },
    });
  } catch (error) {
    console.error('Create booking error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
```

---

## 📧 PARTIE 8: EMAIL NOTIFICATIONS

### 8.1 Setup Resend (`src/lib/email/resend.ts`)

```typescript
import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to,
      subject,
      html,
    });
    
    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
};
```

### 8.2 Email Template (`src/lib/email/templates/confirmation.ts`)

```typescript
export const confirmationEmailTemplate = (booking: any) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Inter', sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #00BFFF 0%, #40E0D0 100%); padding: 30px; text-align: center; color: white; }
    .content { padding: 30px; background: #f9f9f9; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    .button { display: inline-block; padding: 12px 30px; background: #FF8C00; color: white; text-decoration: none; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Réservation Confirmée</h1>
      <p>Fresh Lab'O</p>
    </div>
    
    <div class="content">
      <p>Bonjour <strong>${booking.client_name}</strong>,</p>
      
      <p>Votre réservation est confirmée ! Voici les détails :</p>
      
      <table style="width: 100%; margin: 20px 0;">
        <tr><td><strong>Numéro de réservation :</strong></td><td>${booking.booking_number}</td></tr>
        <tr><td><strong>Service :</strong></td><td>${booking.service_name}</td></tr>
        <tr><td><strong>Date :</strong></td><td>${new Date(booking.scheduled_date).toLocaleDateString('fr-FR')}</td></tr>
        <tr><td><strong>Créneau :</strong></td><td>${booking.scheduled_time_slot === 'morning' ? 'Matin (9h-12h)' : 'Après-midi (14h-18h)'}</td></tr>
        <tr><td><strong>Adresse :</strong></td><td>${booking.address}, ${booking.postal_code} ${booking.city}</td></tr>
        <tr><td><strong>Total :</strong></td><td><strong>${booking.estimated_price}€ TTC</strong></td></tr>
      </table>
      
      <p>Un membre de notre équipe arrivera dans le créneau horaire indiqué. Vous recevrez un rappel 24h avant l'intervention.</p>
      
      <p style="text-align: center; margin: 30px 0;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">
          Voir ma réservation
        </a>
      </p>
      
      <p>Des questions ? Répondez à cet email ou appelez-nous au <strong>06 95 05 77 96</strong></p>
    </div>
    
    <div class="footer">
      <p>Fresh Lab'O - Service de nettoyage professionnel</p>
      <p>contact@freshlabo.com | 06 95 05 77 96</p>
    </div>
  </div>
</body>
</html>
`;

export const sendConfirmationEmail = async (booking: any) => {
  return sendEmail({
    to: booking.client_email,
    subject: `✅ Votre réservation Fresh Lab'O #${booking.booking_number}`,
    html: confirmationEmailTemplate(booking),
  });
};
```

---

## 🎯 PRIORITÉS & ORDRE DE DÉVELOPPEMENT

### Phase 1: Foundation (Jours 1-5) ✅
1. ✅ Setup projet (fait)
2. 🔨 Créer design system (composants UI)
3. 🔨 Setup Supabase connexion
4. 🔨 Setup Google Calendar OAuth
5. 🔨 Créer utilities & helpers

### Phase 2: Landing Page (Jours 6-8)
1. Layout (Header + Footer)
2. Hero Section
3. Services Grid
4. How It Works
5. CTA Sections

### Phase 3: Booking Flow (Jours 9-15)
1. Services selection page
2. Price estimator avec options
3. Client info form
4. Calendar date picker
5. Confirmation page
6. Success page

### Phase 4: Backend (Jours 16-20)
1. API routes (bookings, calendar, estimates)
2. Supabase queries
3. Email notifications
4. Google Calendar integration

### Phase 5: Dashboard (Jours 21-24)
1. Auth (login/register)
2. Bookings list
3. Booking details
4. Cancel booking

### Phase 6: Polish (Jours 25-29)
1. Testing
2. Bug fixes
3. Performance optimization
4. Deployment

---

## ⚠️ RÈGLES IMPORTANTES

### À RESPECTER ABSOLUMENT:

1. **TypeScript Strict**
   - Jamais de `any`
   - Toujours typer les props
   - Utiliser les interfaces

2. **Couleurs Brand**
   - Toujours utiliser les couleurs Fresh Lab'O
   - Cyan #00BFFF pour primaire
   - Orange #FF8C00 pour accents
   - Pas de purple, pas de couleurs génériques

3. **Responsive First**
   - Mobile d'abord
   - Tester sur mobile avant desktop

4. **Performance**
   - Next.js Image pour images
   - Lazy loading
   - Code splitting

5. **Sécurité**
   - Validation server-side
   - RLS Supabase activé
   - Sanitize inputs

6. **UX**
   - Loading states partout
   - Error handling graceful
   - Messages clairs en français

---

## 🆘 EN CAS DE PROBLÈME

### Debugging Checklist:

- [ ] Variables d'environnement définies ?
- [ ] Dépendances installées ?
- [ ] Migrations Supabase exécutées ?
- [ ] Google Calendar OAuth configuré ?
- [ ] Console browser pour erreurs frontend ?
- [ ] Terminal pour erreurs backend ?

### Ressources:

- Next.js Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs
- Tailwind Docs: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/

---

## ✅ CHECKLIST AVANT CHAQUE COMMIT

- [ ] Code TypeScript sans erreurs
- [ ] Composants responsive testés
- [ ] Couleurs brand respectées
- [ ] Pas de console.log en production
- [ ] Loading states présents
- [ ] Error handling en place
- [ ] Format avec Prettier
- [ ] Lint avec ESLint

---

**Cursor AI, tu as maintenant toutes les instructions pour développer Fresh Lab'O avec excellence ! 🚀🧼**

**Commence par le design system (composants UI), puis la landing page, puis le booking flow. Respecte l'ordre des priorités et les règles définies.**

**Bonne chance ! Let's build something fresh! ✨**
