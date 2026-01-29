# 🧼 Fresh Lab'O - Système de Réservation

![Fresh Lab'O Logo](public/logo.png)

Plateforme de réservation en ligne pour services de nettoyage professionnel avec intégration Google Calendar.

## 🎯 Vue d'ensemble

Fresh Lab'O permet aux clients de réserver facilement des services de nettoyage professionnel (matelas, véhicules, tapis, canapés) avec estimation de prix instantanée et planification via Google Calendar.

## ✨ Features MVP

- 🏠 Landing page moderne et attractive
- 🧮 Système d'estimation de prix dynamique
- 📅 Intégration Google Calendar (disponibilités temps réel)
- 📧 Confirmation par email automatique
- 👤 Espace client "Mes réservations"
- 📱 100% Responsive (mobile-first)
- 🔐 Authentification sécurisée (Supabase Auth)

## 🛠️ Stack Technique

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Calendar:** Google Calendar API
- **Emails:** Resend
- **Forms:** React Hook Form + Zod
- **State:** Zustand
- **Deployment:** Vercel

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn ou pnpm
- Compte Supabase (gratuit)
- Compte Google Cloud (API Calendar)
- Compte Resend (emails, gratuit)

## 🚀 Installation

### 1. Clone le repository

```bash
git clone https://github.com/your-username/fresh-labo.git
cd fresh-labo
```

### 2. Installer les dépendances

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configuration Supabase

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Dans le dashboard Supabase, aller dans Settings > API
3. Copier l'URL et la clé anonyme (anon key)
4. Dans SQL Editor, exécuter le fichier `supabase/migrations/001_initial_schema.sql`
5. Activer Row Level Security dans Database > Tables

### 4. Configuration Google Calendar API

1. Aller sur [Google Cloud Console](https://console.cloud.google.com)
2. Créer un nouveau projet
3. Activer Google Calendar API
4. Créer des credentials OAuth 2.0
5. Ajouter `http://localhost:3000/api/auth/google/callback` aux URIs de redirection
6. Télécharger le JSON des credentials

### 5. Variables d'environnement

Créer un fichier `.env.local` à la racine :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google Calendar
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
GOOGLE_CALENDAR_ID=your_calendar_id

# Resend (Emails)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@freshlabo.com

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. Lancer le serveur de développement

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du Projet

```
fresh-labo/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Routes authentification
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (booking)/           # Flow de réservation
│   │   │   ├── services/
│   │   │   ├── estimate/
│   │   │   └── confirmation/
│   │   ├── dashboard/           # Espace client
│   │   ├── api/                 # API Routes
│   │   │   ├── bookings/
│   │   │   ├── calendar/
│   │   │   ├── estimates/
│   │   │   └── auth/
│   │   ├── layout.tsx
│   │   └── page.tsx             # Landing page
│   │
│   ├── components/
│   │   ├── ui/                  # Composants UI réutilisables
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── ...
│   │   ├── layout/              # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── booking/             # Composants spécifiques booking
│   │   │   ├── ServiceCard.tsx
│   │   │   ├── PriceEstimator.tsx
│   │   │   ├── DatePicker.tsx
│   │   │   └── ConfirmationSummary.tsx
│   │   └── common/              # Composants communs
│   │       ├── LoadingSpinner.tsx
│   │       ├── Toast.tsx
│   │       └── ErrorBoundary.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts        # Supabase client-side
│   │   │   ├── server.ts        # Supabase server-side
│   │   │   └── database.types.ts # Types générés
│   │   ├── calendar/
│   │   │   ├── client.ts        # Google Calendar client
│   │   │   └── utils.ts
│   │   ├── email/
│   │   │   ├── resend.ts
│   │   │   └── templates/       # Templates emails
│   │   ├── validations/
│   │   │   └── schemas.ts       # Zod schemas
│   │   └── utils/
│   │       ├── pricing.ts       # Calculs prix
│   │       ├── formatting.ts
│   │       └── date.ts
│   │
│   ├── hooks/
│   │   ├── useBooking.ts
│   │   ├── useAuth.ts
│   │   └── useToast.ts
│   │
│   ├── types/
│   │   ├── booking.ts
│   │   ├── service.ts
│   │   └── user.ts
│   │
│   └── styles/
│       └── globals.css
│
├── public/
│   ├── images/
│   │   ├── logo.png
│   │   ├── services/
│   │   └── hero/
│   └── icons/
│
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   └── 002_seed_data.sql
│   └── config.toml
│
├── docs/
│   ├── MVP.md
│   ├── API.md
│   └── DEPLOYMENT.md
│
├── .cursorrules               # Règles pour Cursor AI
├── .env.example
├── .env.local
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🎨 Design System

### Couleurs

```css
--primary-cyan: #00BFFF;
--primary-orange: #FF8C00;
--dark-blue: #1A1A4D;
--navy: #0F1035;
--light-blue: #40E0D0;
--accent-orange: #FFB347;
```

### Typographie

- **Titres:** Poppins Bold (700-800)
- **Corps:** Inter Regular (400-500)
- **Prix:** Poppins Bold (700)

### Composants

Tous les composants UI suivent le design system défini dans `.cursorrules`

## 🧪 Tests

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 📦 Build & Déploiement

### Build local

```bash
npm run build
npm start
```

### Déploiement Vercel (Recommandé)

1. Push le code sur GitHub
2. Importer le projet dans Vercel
3. Configurer les variables d'environnement
4. Déployer !

```bash
# Ou via CLI
npm i -g vercel
vercel --prod
```

### Configuration Production

Variables d'environnement à configurer dans Vercel:
- Toutes les variables du `.env.local`
- `NEXT_PUBLIC_APP_URL` avec l'URL de production
- `GOOGLE_REDIRECT_URI` avec l'URL callback production

## 📖 Documentation

- [MVP Specification](docs/MVP.md) - Détails complets du MVP
- [API Documentation](docs/API.md) - Endpoints API
- [Deployment Guide](docs/DEPLOYMENT.md) - Guide de déploiement

## 🔐 Sécurité

- ✅ Variables d'environnement sécurisées
- ✅ Row Level Security (RLS) Supabase activé
- ✅ Validation server-side pour tous les inputs
- ✅ Rate limiting sur API routes
- ✅ CSRF protection
- ✅ XSS protection (React par défaut)
- ✅ SQL injection prevention (Supabase ORM)

## 🐛 Debugging

### Problèmes communs

**Le serveur ne démarre pas:**
```bash
# Nettoyer et réinstaller
rm -rf node_modules .next
npm install
npm run dev
```

**Erreurs Supabase:**
- Vérifier que les variables d'environnement sont correctes
- Vérifier que RLS est configuré correctement
- Vérifier les logs dans Supabase Dashboard

**Erreurs Google Calendar:**
- Vérifier que l'API est activée dans Google Cloud
- Vérifier que les credentials sont valides
- Vérifier que l'URI de redirection est correcte

## 📊 Monitoring

- **Application:** Vercel Analytics
- **Errors:** Sentry (à configurer)
- **Database:** Supabase Dashboard
- **Logs:** Vercel Logs

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est propriétaire de Fresh Lab'O.

## 👥 Équipe

- **Product Owner:** Fresh Lab'O
- **Tech Lead:** [Votre nom]
- **Design:** [Designer]

## 📞 Support

- **Email:** contact@freshlabo.com
- **Téléphone:** 06 95 05 77 96
- **GitHub Issues:** [Lien vers issues]

## 🚀 Roadmap

### Phase 1 - MVP (En cours)
- [x] Landing page
- [x] Système de réservation
- [x] Intégration Google Calendar
- [x] Espace client basique

### Phase 2 - Paiement (Q2 2024)
- [ ] Intégration Stripe
- [ ] Dashboard admin
- [ ] Gestion équipe
- [ ] Rapports & analytics

### Phase 3 - Growth (Q3 2024)
- [ ] Programme fidélité
- [ ] Reviews & ratings
- [ ] Chat support
- [ ] App mobile

## 🎉 Remerciements

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- Tous les contributeurs open-source !

---

Fait avec ❤️ et 🧼 par Fresh Lab'O
