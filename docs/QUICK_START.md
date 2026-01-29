# 🚀 Fresh Lab'O - Quick Start Guide

## ⚡ Commandes Essentielles

### Installation Initiale

```bash
# 1. Installer toutes les dépendances
npm install

# 2. Copier le fichier d'environnement
cp .env.example .env.local

# 3. Éditer .env.local avec vos vraies valeurs
# (Supabase, Google Calendar, Resend)
```

### Développement

```bash
# Lancer le serveur de développement
npm run dev

# Lancer avec mode debug
npm run dev -- --turbo

# Vérifier les types TypeScript
npm run type-check

# Formater le code
npm run format

# Linter
npm run lint
```

### Build & Production

```bash
# Build pour production
npm run build

# Lancer en mode production (après build)
npm start

# Tester le build localement
npm run build && npm start
```

---

## 🗄️ Setup Supabase

### 1. Créer un Projet Supabase

1. Aller sur https://supabase.com
2. Créer un nouveau projet
3. Choisir une région proche (ex: Europe West)
4. Attendre que le projet soit prêt (~2 minutes)

### 2. Exécuter les Migrations

1. Aller dans **SQL Editor** dans le dashboard Supabase
2. Copier le contenu de `supabase/migrations/001_initial_schema.sql`
3. Coller et exécuter (Run)
4. Faire de même avec `supabase/migrations/002_seed_data.sql`

### 3. Récupérer les Credentials

1. Aller dans **Settings > API**
2. Copier:
   - `URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ secret!)

### 4. Vérifier RLS

1. Aller dans **Database > Tables**
2. Vérifier que RLS est activé (badge vert) sur:
   - users
   - bookings
   - booking_options
   - estimates

---

## 📅 Setup Google Calendar

### 1. Créer un Projet Google Cloud

1. Aller sur https://console.cloud.google.com
2. Créer un nouveau projet "Fresh Labo Calendar"
3. Activer l'API Google Calendar:
   - Menu > APIs & Services > Library
   - Rechercher "Google Calendar API"
   - Activer

### 2. Créer Credentials OAuth 2.0

1. Menu > APIs & Services > Credentials
2. Créer des identifiants > ID client OAuth 2.0
3. Type d'application: Application Web
4. Nom: "Fresh Labo Booking"
5. URIs de redirection autorisés:
   ```
   http://localhost:3000/api/auth/google/callback
   https://votre-domaine.com/api/auth/google/callback
   ```
6. Créer et télécharger le JSON

### 3. Obtenir le Refresh Token

**Option A: Utiliser OAuth Playground**

1. Aller sur https://developers.google.com/oauthplayground
2. Settings (⚙️) > Use your own OAuth credentials
3. Entrer Client ID et Client Secret
4. Step 1: Sélectionner "Calendar API v3" > `https://www.googleapis.com/auth/calendar`
5. Authorize APIs
6. Step 2: Exchange authorization code for tokens
7. Copier le `refresh_token`

**Option B: Créer un script temporaire**

```javascript
// get-refresh-token.js
const { google } = require('googleapis');
const readline = require('readline');

const oauth2Client = new google.auth.OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'http://localhost:3000/api/auth/google/callback'
);

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
});

console.log('Authorize this app by visiting:', authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the code from that page here: ', async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  console.log('Refresh Token:', tokens.refresh_token);
  rl.close();
});
```

```bash
node get-refresh-token.js
```

### 4. Créer un Calendar Dédié

1. Aller sur https://calendar.google.com
2. Créer un nouveau calendrier "Fresh Lab'O Réservations"
3. Settings > Calendrier > Intégrer le calendrier
4. Copier l'ID du calendrier (format: xxx@group.calendar.google.com)

### 5. Variables d'Environnement

```env
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
GOOGLE_CALENDAR_ID=xxx@group.calendar.google.com
GOOGLE_REFRESH_TOKEN=xxx
```

---

## 📧 Setup Resend (Emails)

### 1. Créer un Compte

1. Aller sur https://resend.com
2. S'inscrire (gratuit jusqu'à 3000 emails/mois)
3. Vérifier l'email

### 2. Obtenir l'API Key

1. Dashboard > API Keys
2. Create API Key
3. Nom: "Fresh Labo Production"
4. Permission: Full Access
5. Copier la clé (elle ne sera affichée qu'une fois!)

### 3. Configurer le Domaine (Optionnel mais recommandé)

1. Dashboard > Domains
2. Add Domain
3. Entrer votre domaine (ex: freshlabo.com)
4. Ajouter les enregistrements DNS fournis
5. Vérifier

**Note:** En dev, vous pouvez utiliser `onboarding@resend.dev` comme expéditeur

### 4. Variables d'Environnement

```env
RESEND_API_KEY=re_xxx
RESEND_FROM_EMAIL=noreply@freshlabo.com
# Ou en dev:
RESEND_FROM_EMAIL=onboarding@resend.dev
```

---

## 🧪 Tester l'Installation

### 1. Test Connexion Supabase

Créer `scripts/test-supabase.js`:

```javascript
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testConnection() {
  const { data, error } = await supabase.from('services').select('count');
  
  if (error) {
    console.error('❌ Supabase Error:', error);
  } else {
    console.log('✅ Supabase Connected!');
    console.log('Services count:', data);
  }
}

testConnection();
```

```bash
node -r dotenv/config scripts/test-supabase.js
```

### 2. Test Google Calendar

Créer `scripts/test-calendar.js`:

```javascript
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

async function testCalendar() {
  try {
    const response = await calendar.calendarList.list();
    console.log('✅ Google Calendar Connected!');
    console.log('Calendars:', response.data.items?.map(c => c.summary));
  } catch (error) {
    console.error('❌ Calendar Error:', error);
  }
}

testCalendar();
```

```bash
node -r dotenv/config scripts/test-calendar.js
```

### 3. Test Resend

Créer `scripts/test-email.js`:

```javascript
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
  try {
    const { data } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: 'your-email@example.com',
      subject: 'Test Fresh Lab\'O',
      html: '<h1>Ça marche ! 🎉</h1>',
    });
    
    console.log('✅ Email Sent!');
    console.log('ID:', data.id);
  } catch (error) {
    console.error('❌ Email Error:', error);
  }
}

testEmail();
```

```bash
node -r dotenv/config scripts/test-email.js
```

---

## 🐛 Troubleshooting

### Problème: "Module not found"

```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Problème: "Supabase RLS policy violation"

1. Vérifier que RLS est activé
2. Vérifier les policies dans SQL Editor
3. Tester avec le service_role_key (contourne RLS) pour débugger
4. Vérifier que l'user est authentifié si nécessaire

### Problème: "Google Calendar 403 Forbidden"

1. Vérifier que l'API est activée dans Google Cloud
2. Vérifier que le refresh token est valide
3. Vérifier les permissions du calendrier
4. Essayer de régénérer un nouveau refresh token

### Problème: "Resend email not sending"

1. Vérifier l'API key
2. Vérifier le format de l'email expéditeur
3. Regarder les logs dans le dashboard Resend
4. En dev, utiliser `onboarding@resend.dev`

### Problème: "Build fails"

```bash
# Vérifier les erreurs TypeScript
npm run type-check

# Vérifier ESLint
npm run lint

# Nettoyer le cache Next.js
rm -rf .next
npm run build
```

---

## 📦 Déploiement Vercel

### 1. Push sur GitHub

```bash
git init
git add .
git commit -m "Initial commit - Fresh Lab'O MVP"
git branch -M main
git remote add origin https://github.com/your-username/fresh-labo.git
git push -u origin main
```

### 2. Connecter à Vercel

1. Aller sur https://vercel.com
2. New Project
3. Import Git Repository
4. Sélectionner le repo fresh-labo
5. Configure Project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 3. Ajouter Variables d'Environnement

Dans Vercel Project Settings > Environment Variables, ajouter:

```
NEXT_PUBLIC_SUPABASE_URL=xxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_REDIRECT_URI=https://votre-domaine.vercel.app/api/auth/google/callback
GOOGLE_CALENDAR_ID=xxx@group.calendar.google.com
GOOGLE_REFRESH_TOKEN=xxx
RESEND_API_KEY=xxx
RESEND_FROM_EMAIL=noreply@freshlabo.com
NEXT_PUBLIC_APP_URL=https://votre-domaine.vercel.app
```

### 4. Déployer

```bash
# Via Git (automatique)
git push origin main

# Ou via CLI Vercel
npm i -g vercel
vercel --prod
```

### 5. Configurer le Domaine Custom (Optionnel)

1. Vercel Project Settings > Domains
2. Ajouter votre domaine
3. Configurer les DNS selon instructions
4. Attendre propagation (~24h max)

---

## 📊 Monitoring & Logs

### Vercel Analytics

Activé automatiquement, voir dashboard Vercel > Analytics

### Logs Vercel

```bash
# Voir les logs en temps réel
vercel logs --follow

# Logs d'une fonction spécifique
vercel logs --follow api/bookings/create
```

### Supabase Logs

Dashboard Supabase > Logs > Query Performance

### Resend Logs

Dashboard Resend > Logs (voir tous les emails envoyés)

---

## 🔧 Scripts Utiles

Ajouter dans `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,json,css,md}\"",
    "test:supabase": "node -r dotenv/config scripts/test-supabase.js",
    "test:calendar": "node -r dotenv/config scripts/test-calendar.js",
    "test:email": "node -r dotenv/config scripts/test-email.js",
    "clean": "rm -rf .next node_modules",
    "fresh-install": "npm run clean && npm install"
  }
}
```

---

## ✅ Checklist Avant Production

- [ ] Toutes les variables d'env configurées
- [ ] Supabase RLS activé et testé
- [ ] Google Calendar sync testé
- [ ] Emails testés (réception OK)
- [ ] Formulaires validés (Zod schemas)
- [ ] Responsive testé (mobile + desktop)
- [ ] Performance OK (Lighthouse > 90)
- [ ] Erreurs gérées gracefully
- [ ] Loading states partout
- [ ] SEO meta tags ajoutés
- [ ] Favicon et images optimisées
- [ ] Analytics configuré (GA4)
- [ ] Domaine custom configuré
- [ ] SSL activé (automatique Vercel)
- [ ] Tests utilisateurs réalisés

---

## 📞 Support

**Problème technique ?**
- Consulter la doc: README.md, MVP.md, CURSOR_INSTRUCTIONS.md
- Vérifier les logs (Vercel, Supabase, Resend)
- Tester les connexions avec les scripts

**Questions ?**
- Email: contact@freshlabo.com
- GitHub Issues: (lien à ajouter)

---

**Tout est prêt ! Let's build Fresh Lab'O ! 🚀🧼✨**
