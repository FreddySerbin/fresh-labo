# 🧼 Fresh Lab'O - Système de Réservation

![Fresh Lab'O](https://img.shields.io/badge/Fresh%20Lab'O-Nettoyage%20Professionnel-00BFFF?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

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

## 🚀 Quick Start

### 1. Installation

```bash
# Cloner le repository
git clone https://github.com/your-username/fresh-labo.git
cd fresh-labo

# Installer les dépendances
npm install
```

### 2. Configuration

Copier `.env.example` vers `.env.local` et remplir les valeurs :

```bash
cp .env.example .env.local
```

Variables requises :
- Supabase (URL + clés)
- Google Calendar API
- Resend (emails)

### 3. Base de données

Exécuter les migrations dans Supabase SQL Editor :

1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/002_seed_data.sql`

### 4. Lancer le serveur

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
src/
├── app/                    # Routes Next.js
│   ├── layout.tsx         # Layout racine
│   └── page.tsx           # Page d'accueil
├── components/
│   ├── ui/               # Composants UI réutilisables
│   ├── layout/           # Header, Footer
│   ├── home/             # Composants page d'accueil
│   ├── booking/          # Flow réservation
│   └── common/           # Composants communs
├── lib/
│   ├── supabase/         # Client Supabase
│   ├── calendar/         # Google Calendar
│   ├── email/            # Resend
│   ├── validations/      # Zod schemas
│   └── utils/            # Utilitaires
├── hooks/                # Custom hooks
├── types/                # Types TypeScript
└── styles/               # CSS global
```

## 🎨 Design System

### Couleurs Brand

```css
--primary-cyan: #00BFFF
--primary-orange: #FF8C00
--dark-blue: #1A1A4D
--navy: #0F1035
--light-blue: #40E0D0
--accent-orange: #FFB347
```

### Typographie

- **Titres:** Poppins Bold (700-800)
- **Corps:** Inter Regular (400-500)
- **Prix:** Poppins Bold (700)

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

## 📋 Scripts Disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build production
npm start            # Serveur production
npm run lint         # Linter ESLint
npm run type-check   # Vérification TypeScript
npm run format       # Format code avec Prettier
```

## 📖 Documentation

- [MVP.md](docs/MVP.md) - Spécifications complètes
- [PROJECT_SUMMARY.md](docs/PROJECT_SUMMARY.md) - Résumé projet
- [QUICK_START.md](docs/QUICK_START.md) - Guide démarrage rapide
- [ARCHITECTURE_V2.md](docs/ARCHITECTURE_V2.md) - Architecture détaillée
- [CURSOR_INSTRUCTIONS.md](docs/CURSOR_INSTRUCTIONS.md) - Guide Cursor AI

## 🔐 Sécurité

- ✅ Row Level Security (RLS) Supabase
- ✅ Validation server-side
- ✅ Rate limiting
- ✅ CSRF protection
- ✅ Variables d'environnement sécurisées
- ✅ HTTPS obligatoire

## 📦 Déploiement

### Vercel (Recommandé)

1. Push sur GitHub
2. Importer dans Vercel
3. Configurer les variables d'environnement
4. Déployer !

```bash
# Ou via CLI
npm i -g vercel
vercel --prod
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📞 Support

- **Email:** contact@freshlabo.com
- **Téléphone:** 06 95 05 77 96

## 🎉 Roadmap

### Phase 1 - MVP ✅
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

## 📝 License

Propriétaire - Fresh Lab'O © 2024

---

Fait avec ❤️ et 🧼 par Fresh Lab'O
