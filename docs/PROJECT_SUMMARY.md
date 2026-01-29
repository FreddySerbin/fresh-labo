# Fresh Lab'O - Résumé de Projet

## 📌 Vue d'Ensemble

Fresh Lab'O est une plateforme de réservation en ligne pour services de nettoyage professionnel. Le système permet aux clients de sélectionner un service, configurer leurs options, obtenir une estimation instantanée et réserver un créneau via Google Calendar.

## 🎯 Objectif MVP

Créer un système de réservation fonctionnel en 6 semaines permettant :
- Sélection service parmi 4 catégories (Matelas, Véhicules, Tapis, Canapés)
- Configuration avec options et calcul prix temps réel
- Réservation avec intégration Google Calendar
- Confirmation par email automatique
- Espace client basique pour gérer réservations

## 🎨 Identité Visuelle

### Couleurs
- **Primaires:** Cyan #00BFFF, Orange #FF8C00
- **Sombres:** Bleu nuit #1A1A4D, Navy #0F1035
- **Accents:** Bleu clair #40E0D0, Orange clair #FFB347

### Typographie
- **Display/Titres:** Poppins Bold (700-800)
- **Corps de texte:** Inter Regular (400-500)
- **Prix:** Poppins Bold (700)

### Style
- Moderne, professionnel avec touches dynamiques
- Bulles animées (référence au logo)
- Coins arrondis (12-24px)
- Ombres douces pour profondeur
- Animations fluides

## 🏗️ Architecture Technique

### Stack
```
Frontend:  Next.js 14 + TypeScript + Tailwind CSS
Animations: Framer Motion
Backend:   Next.js API Routes
Database:  Supabase (PostgreSQL)
Auth:      Supabase Auth
Calendar:  Google Calendar API
Emails:    Resend
Forms:     React Hook Form + Zod
State:     Zustand
Deploy:    Vercel
```

### Structure
```
src/
├── app/                    # Routes Next.js
│   ├── (auth)/            # Login/Register
│   ├── (booking)/         # Flow réservation
│   ├── dashboard/         # Espace client
│   ├── api/               # API endpoints
│   └── page.tsx           # Landing page
├── components/            # Composants React
│   ├── ui/               # Design system
│   ├── layout/           # Header/Footer
│   ├── booking/          # Spécifique booking
│   └── common/           # Communs
├── lib/                   # Utilitaires
│   ├── supabase/
│   ├── calendar/
│   ├── email/
│   └── validations/
├── hooks/                 # Custom hooks
├── types/                 # TypeScript types
└── styles/               # CSS global
```

## 📊 Modèle de Données

### Tables Principales
1. **users** - Profils clients (extends Supabase Auth)
2. **services** - Services disponibles (matelas, véhicule, etc.)
3. **service_options** - Options configurables par service
4. **bookings** - Réservations clients
5. **booking_options** - Options sélectionnées par réservation
6. **estimates** - Estimations pour tracking conversions

### Relations
```
services (1) → (n) service_options
services (1) → (n) bookings
bookings (n) ↔ (n) service_options via booking_options
users (1) → (n) bookings
estimates (1) → (0-1) bookings (conversion)
```

## 🛣️ Parcours Utilisateur

### 1. Landing Page
Hero impactant → Présentation services → USPs → CTA Réserver

### 2. Sélection Service
4 catégories → Choix service spécifique → Configuration options

### 3. Estimation
Calcul temps réel → Récapitulatif détaillé → Validation

### 4. Informations
Formulaire coordonnées → Adresse (Google Places) → Notes spéciales

### 5. Date & Heure
Calendar picker → Disponibilités Google Calendar → Sélection créneau

### 6. Confirmation
Récapitulatif → Validation → Confirmation visuelle + Email + Calendar

### 7. Suivi
Dashboard "Mes réservations" → Détails → Annulation possible (conditions)

## 💰 Grille Tarifaire

### Matelas
- 1 Face: 60€ (base)
- 2 Faces: 80€ (base + 20€)
- King Size: 105€ (base + 30€)

### Véhicules
- Petit: 55€ | Moyen: 65€ | Grand: 80€
- 2 Sièges: 60€ | 4+ Sièges: 80€
- Options: Anti-Odeur +15€, Protection +20€

### Tapis
- Petit (<2m²): 50€
- Moyen (2-4m²): 90€
- Grand (>4m²): 120€
- Tapis supplémentaire: -10€

### Canapés
- Chaise: 15€ | Fauteuil: 35€
- 2 places: 70€ | 3 places: 80€
- 4 places: 90€ | 5 places: 110€ | 6+ places: 120€
- Options: Protection +15€, Traitement Cuir +25€

## 🔐 Sécurité

- ✅ Row Level Security (RLS) Supabase
- ✅ Validation server-side (Zod schemas)
- ✅ Rate limiting API routes
- ✅ CSRF protection
- ✅ Variables d'environnement sécurisées
- ✅ Authentification JWT (Supabase)
- ✅ HTTPS obligatoire en production

## 📅 Planning Développement

### Sprint 1: Foundation (5j)
Setup projet, design system, DB, OAuth Google

### Sprint 2: Landing Page (3j)
Hero, services grid, sections, responsive

### Sprint 3: Booking Flow (7j)
Sélection service, configurateur, estimation, formulaire

### Sprint 4: Calendar & Confirmation (5j)
Date picker, Google Calendar, emails, PDF

### Sprint 5: Dashboard Client (4j)
Auth, liste réservations, annulation

### Sprint 6: Polish & Launch (5j)
Bug fixes, tests, optimisation, déploiement

**Total: 29 jours (~6 semaines)**

## 📈 KPIs à Tracker

### Acquisition
- Visiteurs uniques
- Taux rebond
- Sources trafic

### Conversion
- Taux démarrage booking
- Taux complétion
- Taux abandon par étape
- Temps moyen booking

### Engagement
- Réservations/jour
- Panier moyen
- Services populaires
- Créneaux préférés

### Rétention
- Création compte
- Clients récurrents
- Taux annulation

## 🚀 Quick Start

### 1. Installation
```bash
npm install
```

### 2. Configuration
Copier `.env.example` vers `.env.local` et remplir les valeurs

### 3. Setup Supabase
```bash
# Exécuter dans SQL Editor Supabase
001_initial_schema.sql
002_seed_data.sql
```

### 4. Setup Google Calendar
- Créer projet Google Cloud
- Activer Calendar API
- Générer credentials OAuth 2.0
- Copier dans .env.local

### 5. Lancer
```bash
npm run dev
```

Ouvrir http://localhost:3000

## 📚 Documentation

- **[MVP.md](docs/MVP.md)** - Spécifications complètes MVP
- **[README.md](README.md)** - Guide installation & développement
- **[.cursorrules](.cursorrules)** - Règles développement Cursor AI
- **[API.md](docs/API.md)** - Documentation API (à créer)

## 🔄 Roadmap Post-MVP

### Phase 2 (Q2 2024)
- Paiement en ligne Stripe
- Dashboard admin complet
- Gestion équipe/techniciens
- Rapports & analytics avancés

### Phase 3 (Q3 2024)
- Programme fidélité
- Système de reviews
- Chat support temps réel
- Blog & conseils
- App mobile (React Native)

### Phase 4 (Q4 2024+)
- Multi-villes/franchise
- API publique
- IA optimisation planning
- Tracking flotte véhicules
- Multi-langues

## 💡 Décisions Techniques Clés

### Pourquoi Next.js 14 ?
- SSR/SSG pour SEO
- API Routes intégrées
- App Router moderne
- Optimisation images/fonts auto
- Déploiement facile (Vercel)

### Pourquoi Supabase ?
- PostgreSQL performant
- Auth intégrée sécurisée
- RLS natif
- Real-time (futur)
- Free tier généreux

### Pourquoi Tailwind CSS ?
- Développement rapide
- Design system cohérent
- Optimisation bundle auto
- Responsive facile
- Custom theme puissant

### Pourquoi Google Calendar ?
- API fiable et gratuite
- UX familière utilisateurs
- Sync bidirectionnelle
- Reminders automatiques
- Intégration mobile native

## ⚠️ Limitations MVP

**Out of Scope:**
- ❌ Paiement en ligne (Phase 2)
- ❌ Dashboard admin avancé
- ❌ Gestion multi-utilisateurs
- ❌ App mobile native
- ❌ Programme fidélité
- ❌ Chat support
- ❌ Multi-langues

**Ces features viendront après validation MVP**

## 📞 Contacts

- **Email:** contact@freshlabo.com
- **Téléphone:** 06 95 05 77 96
- **Site:** (à définir)

## 📄 Licence

Propriétaire - Fresh Lab'O © 2024

---

## ✅ Checklist Démarrage Cursor

Pour démarrer le développement avec Cursor :

1. ✅ Lire `.cursorrules` (règles de développement)
2. ✅ Lire `MVP.md` (spécifications)
3. ✅ Installer dépendances: `npm install`
4. ✅ Copier `.env.example` → `.env.local`
5. ✅ Setup Supabase project
6. ✅ Exécuter migrations SQL
7. ✅ Setup Google Calendar OAuth
8. ✅ Configurer toutes variables d'env
9. ✅ Lancer dev server: `npm run dev`
10. ✅ Commencer par Sprint 1 (Foundation)

**Le projet est prêt à être développé ! 🚀**

Cursor AI dispose maintenant de toutes les informations nécessaires pour :
- Comprendre le contexte métier Fresh Lab'O
- Suivre les guidelines de design et code
- Respecter l'architecture définie
- Utiliser les bonnes technologies
- Produire du code cohérent et de qualité

**Next Step:** Initialiser le projet Next.js et commencer le développement ! 🧼✨
