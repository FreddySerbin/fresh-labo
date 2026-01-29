# 🚀 Guide de Démarrage Rapide - Fresh Lab'O

## ✅ Projet Créé avec Succès !

Votre projet Fresh Lab'O est maintenant configuré avec :

- ✅ Structure de dossiers complète
- ✅ Configuration Next.js 14 + TypeScript
- ✅ Tailwind CSS avec design system Fresh Lab'O
- ✅ Composants UI de base (Button, Bubbles)
- ✅ Layout (Header, Footer)
- ✅ Page d'accueil complète avec tous les composants
- ✅ Migrations SQL Supabase
- ✅ Documentation complète

## 📋 Prochaines Étapes

### 1. Installer les Dépendances

```bash
npm install
```

⏱️ Cela prendra quelques minutes...

### 2. Configurer les Variables d'Environnement

```bash
# Copier le fichier .env.example
copy .env.example .env.local

# Éditer .env.local avec vos vraies valeurs
```

Vous aurez besoin de :
- **Supabase** : Créer un projet sur https://supabase.com
- **Google Calendar API** : Configurer dans Google Cloud Console
- **Resend** : Créer un compte sur https://resend.com

📖 Voir `docs/QUICK_START.md` pour les instructions détaillées

### 3. Setup Supabase

1. Créer un projet sur https://supabase.com
2. Dans le SQL Editor, exécuter :
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_seed_data.sql`
3. Copier l'URL et les clés dans `.env.local`

### 4. Lancer le Serveur de Développement

```bash
npm run dev
```

Ouvrir http://localhost:3000 dans votre navigateur 🎉

## 📁 Structure du Projet

```
Fresh LabO/
├── src/
│   ├── app/
│   │   ├── layout.tsx           ✅ Layout racine avec fonts
│   │   └── page.tsx             ✅ Page d'accueil
│   ├── components/
│   │   ├── ui/
│   │   │   └── Button.tsx       ✅ Composant bouton
│   │   ├── layout/
│   │   │   ├── Header.tsx       ✅ Header avec navigation
│   │   │   └── Footer.tsx       ✅ Footer complet
│   │   ├── home/
│   │   │   ├── Hero.tsx         ✅ Section hero
│   │   │   ├── ServicesGrid.tsx ✅ Grille services
│   │   │   ├── HowItWorks.tsx   ✅ Comment ça marche
│   │   │   ├── WhyChooseUs.tsx  ✅ Pourquoi nous
│   │   │   ├── Testimonials.tsx ✅ Témoignages
│   │   │   └── CTASection.tsx   ✅ Call to action
│   │   └── common/
│   │       └── Bubbles.tsx      ✅ Animation bulles
│   ├── lib/
│   │   └── utils/
│   │       └── cn.ts            ✅ Utilitaire classes
│   ├── types/
│   │   └── index.ts             ✅ Types TypeScript
│   └── styles/
│       └── globals.css          ✅ Styles globaux
├── docs/                        ✅ Documentation complète
├── supabase/migrations/         ✅ Migrations SQL
└── Configuration files          ✅ Tous configurés
```

## 🎨 Design System

Le projet utilise les couleurs de la marque Fresh Lab'O :

- **Cyan Primaire** : `#00BFFF`
- **Orange Primaire** : `#FF8C00`
- **Bleu Nuit** : `#1A1A4D`

Toutes les couleurs sont configurées dans `tailwind.config.ts` et disponibles via :
```tsx
className="bg-primary-cyan text-primary-orange"
```

## 🧩 Composants Disponibles

### Button
```tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="lg">
  Réserver maintenant
</Button>
```

### Bubbles (Animation)
```tsx
import { Bubbles } from '@/components/common/Bubbles';

<Bubbles count={8} />
```

## 📖 Documentation

- `README.md` - Vue d'ensemble du projet
- `docs/MVP.md` - Spécifications MVP complètes
- `docs/PROJECT_SUMMARY.md` - Résumé du projet
- `docs/QUICK_START.md` - Guide setup détaillé
- `docs/CURSOR_INSTRUCTIONS.md` - Instructions pour Cursor AI
- `docs/ARCHITECTURE_V2.md` - Architecture détaillée

## 🔧 Scripts NPM

```bash
npm run dev          # Lancer le serveur de développement
npm run build        # Build pour production
npm start            # Lancer le serveur production
npm run lint         # Vérifier le code avec ESLint
npm run type-check   # Vérifier les types TypeScript
npm run format       # Formater le code avec Prettier
```

## 🐛 Dépannage

### Problème : "Module not found"

```bash
# Nettoyer et réinstaller
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Problème : Erreurs TypeScript

```bash
# Vérifier les types
npm run type-check
```

### Problème : Port 3000 déjà utilisé

```bash
# Utiliser un autre port
$env:PORT=3001
npm run dev
```

## 🚀 Prochaines Étapes de Développement

### À Faire (selon MVP.md) :

1. **API Routes** - Créer les endpoints pour :
   - Services (GET /api/services)
   - Réservations (POST /api/bookings)
   - Estimations (POST /api/estimates)

2. **Flow de Réservation** - Créer les pages :
   - `/booking/estimate` - Sélection service
   - `/booking/calendar` - Choix date
   - `/booking/confirmation` - Confirmation
   - `/booking/success` - Succès

3. **Intégrations** :
   - Supabase client (`src/lib/supabase/`)
   - Google Calendar (`src/lib/calendar/`)
   - Resend emails (`src/lib/email/`)

4. **Dashboard Client** :
   - Login/Register
   - Mes réservations
   - Profil

## 💡 Conseils

- Lire `.cursorrules` pour les règles de développement
- Respecter le design system (couleurs, typographie)
- Tester sur mobile (responsive-first)
- Toujours typer avec TypeScript (no `any`)
- Utiliser les composants UI existants

## 📞 Support

- Email : contact@freshlabo.com
- Téléphone : 06 95 05 77 96

---

**Bon développement ! 🧼✨**

N'oubliez pas de lire la documentation dans `docs/` pour plus de détails.
