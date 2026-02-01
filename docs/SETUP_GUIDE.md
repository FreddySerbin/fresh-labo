# 🚀 Guide de Configuration - Fresh Lab'O

Ce guide vous accompagne dans la configuration complète de Fresh Lab'O avec toutes les fonctionnalités avancées.

## 📋 Prérequis

- Node.js 18+ et npm
- Compte Supabase (gratuit)
- Compte Google Cloud (gratuit)
- Compte Resend (gratuit jusqu'à 3000 emails/mois)
- Git

## 🔧 Installation de Base

### 1. Cloner le Projet

```bash
git clone <url-du-repo>
cd fresh-labo
npm install
```

### 2. Configuration Supabase

#### Créer un Projet Supabase

1. Aller sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet
3. Noter l'URL et les clés API

#### Exécuter les Migrations

1. Dans Supabase Dashboard → SQL Editor
2. Copier le contenu de `supabase/migrations/001_initial_schema.sql`
3. Exécuter le script
4. Copier le contenu de `supabase/migrations/002_seed_data.sql`
5. Exécuter le script

### 3. Fichier .env.local

Créer un fichier `.env.local` à la racine :

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxx

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Fresh Lab'O"
```

### 4. Tester l'Installation de Base

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## 📧 Configuration Resend (Emails)

### Étape 1 : Créer un Compte Resend

1. Aller sur [resend.com](https://resend.com)
2. S'inscrire gratuitement (3000 emails/mois)
3. Vérifier votre email

### Étape 2 : Configurer le Domaine

#### Option A : Domaine Personnel (Recommandé pour Production)

1. Dans Resend → Domains → Add Domain
2. Entrer votre domaine (ex: `freshlabo.com`)
3. Ajouter les DNS records à votre hébergeur :
   ```
   Type: TXT
   Name: @
   Value: [fourni par Resend]
   
   Type: CNAME
   Name: resend._domainkey
   Value: [fourni par Resend]
   ```
4. Attendre la vérification (quelques minutes à 24h)

#### Option B : Domaine de Test (Pour Développement)

1. Utiliser `onboarding@resend.dev`
2. Emails envoyés uniquement à votre adresse email de compte

### Étape 3 : Générer une API Key

1. Resend → API Keys → Create API Key
2. Nom : "Fresh Lab'O Production" (ou "Development")
3. Permission : "Full Access" ou "Sending Access"
4. Copier la clé (elle ne sera affichée qu'une fois !)

### Étape 4 : Ajouter à .env.local

```bash
# Resend (Email Service)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@freshlabo.com  # ou onboarding@resend.dev pour test
```

### Étape 5 : Tester l'Envoi

```bash
# Créer une réservation de test depuis l'interface
# Vérifier dans Resend → Logs que l'email est envoyé
```

**Astuce** : En développement, consultez les logs Resend pour voir tous les emails envoyés.

---

## 📅 Configuration Google Calendar

### Étape 1 : Créer un Projet Google Cloud

1. Aller sur [console.cloud.google.com](https://console.cloud.google.com)
2. Créer un nouveau projet : "Fresh Lab'O"
3. Attendre la création (quelques secondes)

### Étape 2 : Activer Google Calendar API

1. Dans le projet → APIs & Services → Library
2. Rechercher "Google Calendar API"
3. Cliquer sur "Enable"

### Étape 3 : Configurer l'Écran de Consentement OAuth

1. APIs & Services → OAuth consent screen
2. Type : **External** (sauf si G Suite)
3. Remplir les informations :
   - App name : "Fresh Lab'O"
   - User support email : votre email
   - Developer contact : votre email
4. Scopes → Add or Remove Scopes :
   - Ajouter `https://www.googleapis.com/auth/calendar`
   - Ajouter `https://www.googleapis.com/auth/calendar.events`
5. Test users → Ajouter votre email
6. Save and Continue

### Étape 4 : Créer les Identifiants OAuth 2.0

1. APIs & Services → Credentials
2. Create Credentials → OAuth 2.0 Client ID
3. Application type : **Web application**
4. Name : "Fresh Lab'O Web Client"
5. Authorized redirect URIs :
   ```
   http://localhost:3000/api/auth/google/callback
   https://votre-domaine.com/api/auth/google/callback
   ```
6. Create
7. **Noter Client ID et Client Secret**

### Étape 5 : Obtenir le Refresh Token

#### Méthode 1 : OAuth 2.0 Playground (Recommandée)

1. Aller sur [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. En haut à droite, cliquer sur ⚙️ Settings
3. Cocher "Use your own OAuth credentials"
4. Entrer votre Client ID et Client Secret
5. Fermer les Settings
6. Dans "Step 1", sélectionner :
   - `https://www.googleapis.com/auth/calendar`
7. Authorize APIs → Se connecter avec votre compte Google
8. Autoriser l'application
9. Dans "Step 2", cliquer "Exchange authorization code for tokens"
10. **Copier le Refresh Token**

#### Méthode 2 : Script Node.js

Créer `scripts/get-google-token.js` :

```javascript
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

console.log('Ouvrir cette URL dans votre navigateur:', authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Entrer le code de l\'URL de redirection : ', async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  console.log('Refresh Token:', tokens.refresh_token);
  rl.close();
});
```

Exécuter :
```bash
node scripts/get-google-token.js
```

### Étape 6 : Créer un Calendrier Dédié

1. Aller sur [calendar.google.com](https://calendar.google.com)
2. Créer un nouveau calendrier :
   - Nom : "Fresh Lab'O - Interventions"
   - Description : "Calendrier des réservations clients"
3. Settings → Paramètres du calendrier
4. Copier l'**ID du calendrier** (format: `xxxxx@group.calendar.google.com`)

### Étape 7 : Ajouter à .env.local

```bash
# Google Calendar API
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
GOOGLE_CALENDAR_ID=xxxxx@group.calendar.google.com
GOOGLE_REFRESH_TOKEN=1//xxxxx
```

### Étape 8 : Tester l'Intégration

```bash
# Tester la disponibilité
curl http://localhost:3000/api/calendar/availability?date=2024-12-25

# Créer une réservation et vérifier dans Google Calendar
```

---

## ⏰ Configuration Cron Job (Rappels Automatiques)

Les rappels automatiques nécessitent un cron job qui s'exécute quotidiennement.

### Option 1 : Vercel Cron (Recommandé si hébergé sur Vercel)

#### Prérequis
- Plan Vercel Pro ou supérieur (20$/mois)
- Le fichier `vercel.json` est déjà configuré

#### Configuration

1. Générer un secret pour sécuriser le cron :
   ```bash
   openssl rand -base64 32
   ```

2. Ajouter à `.env.local` et Vercel Environment Variables :
   ```bash
   CRON_SECRET=votre_secret_genere
   ```

3. Déployer sur Vercel :
   ```bash
   vercel --prod
   ```

4. Le cron s'exécutera automatiquement tous les jours à 10h UTC

5. Vérifier les logs : Vercel Dashboard → Projet → Cron Jobs

### Option 2 : Service Externe (Gratuit)

#### A. Cron-Job.org

1. Créer un compte sur [cron-job.org](https://cron-job.org)
2. Create Cronjob :
   - Title : "Fresh Lab'O Reminders"
   - Address : `https://votre-domaine.com/api/cron/send-reminders`
   - Schedule : "Every day at 10:00"
3. Advanced :
   - Method : POST
   - Custom Headers :
     ```
     Authorization: Bearer votre_secret_genere
     ```
4. Save

#### B. EasyCron

1. S'inscrire sur [easycron.com](https://easycron.com)
2. Add New Cron Job :
   - URL : `https://votre-domaine.com/api/cron/send-reminders`
   - Cron Expression : `0 10 * * *`
   - HTTP Method : POST
   - HTTP Headers :
     ```
     Authorization: Bearer votre_secret_genere
     ```

#### C. GitHub Actions (Pour développeurs)

Créer `.github/workflows/daily-reminders.yml` :

```yaml
name: Daily Reminders

on:
  schedule:
    - cron: '0 10 * * *'  # 10h UTC tous les jours
  workflow_dispatch:  # Permet exécution manuelle

jobs:
  send-reminders:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger reminder API
        run: |
          curl -X POST https://votre-domaine.com/api/cron/send-reminders \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}"
```

Ajouter `CRON_SECRET` dans GitHub → Settings → Secrets and variables → Actions

### Tester Manuellement

```bash
curl -X POST http://localhost:3000/api/cron/send-reminders \
  -H "Authorization: Bearer votre_secret"
```

---

## 🔒 Variables d'Environnement Complètes

Fichier `.env.local` complet :

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxx

# Google Calendar API
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
GOOGLE_CALENDAR_ID=xxxxx@group.calendar.google.com
GOOGLE_REFRESH_TOKEN=1//xxxxx

# Resend (Email Service)
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=noreply@freshlabo.com

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Fresh Lab'O"

# Cron Job Security
CRON_SECRET=xxxxx

# Optional: Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional: Error Monitoring
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

---

## 🧪 Tests

### Test Complet du Flow

1. **Inscription** : Créer un compte
2. **Réservation** : Créer une nouvelle réservation
3. **Email reçu** : Vérifier l'email de confirmation
4. **Calendar** : Vérifier l'événement dans Google Calendar
5. **Dashboard** : Consulter la réservation dans le dashboard
6. **PDF** : Télécharger le devis PDF
7. **Modification** : Modifier la réservation
8. **Email reçu** : Vérifier l'email de modification
9. **Calendar mis à jour** : Vérifier la mise à jour dans Calendar
10. **Annulation** : Annuler la réservation
11. **Email reçu** : Vérifier l'email d'annulation
12. **Calendar supprimé** : Vérifier la suppression dans Calendar

### Tests Unitaires API

```bash
# Test disponibilité calendrier
curl "http://localhost:3000/api/calendar/availability?date=2024-12-25"

# Test création événement
curl -X POST http://localhost:3000/api/calendar/events \
  -H "Content-Type: application/json" \
  -d '{"booking": {...}}'

# Test rappels
curl -X POST http://localhost:3000/api/cron/send-reminders \
  -H "Authorization: Bearer votre_secret"
```

---

## 🚀 Déploiement en Production

### 1. Préparer l'Environnement

- Mettre à jour toutes les URLs en production
- Utiliser le domaine vérifié Resend
- Configurer GOOGLE_REDIRECT_URI avec l'URL de production
- Générer un nouveau CRON_SECRET

### 2. Déploiement Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel --prod

# Ajouter les variables d'environnement dans Vercel Dashboard
# Settings → Environment Variables
```

### 3. Configuration DNS

Si domaine personnalisé :
- Ajouter les DNS Vercel
- Configurer SSL/HTTPS automatique

### 4. Post-Déploiement

- Tester tous les flows en production
- Vérifier les emails arrivent
- Vérifier Google Calendar se synchronise
- Tester le cron job
- Configurer les alertes monitoring

---

## 🐛 Dépannage Courant

### Emails ne partent pas

**Problème** : Les emails ne sont pas envoyés

**Solutions** :
1. Vérifier `RESEND_API_KEY` est correcte
2. Vérifier le domaine est vérifié dans Resend
3. Consulter Resend Dashboard → Logs
4. Vérifier les quotas (3000/mois gratuit)

### Google Calendar ne se synchronise pas

**Problème** : Les événements ne sont pas créés

**Solutions** :
1. Vérifier le `GOOGLE_REFRESH_TOKEN` est valide
2. Tester le token avec OAuth Playground
3. Vérifier les scopes (calendar + calendar.events)
4. Vérifier le calendrier existe et l'ID est correct
5. Consulter les logs API : `console.log()` dans `/api/calendar/`

### PDF ne se génère pas

**Problème** : Erreur lors du téléchargement PDF

**Solutions** :
1. Vérifier `jspdf` est installé : `npm list jspdf`
2. Vérifier les données booking sont complètes
3. Tester en local avec des données mockées
4. Consulter les logs navigateur (F12)

### Cron job ne s'exécute pas

**Problème** : Aucun rappel envoyé

**Solutions** :
1. Vérifier le plan Vercel (Pro requis)
2. Tester l'endpoint manuellement avec curl
3. Vérifier le `CRON_SECRET` est correct
4. Consulter Vercel Logs → Cron Jobs
5. Si service externe, vérifier le service est actif

---

## 📚 Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Resend](https://resend.com/docs)
- [Google Calendar API](https://developers.google.com/calendar/api/guides/overview)
- [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs)
- [Next.js Documentation](https://nextjs.org/docs)

---

## 💡 Conseils de Production

### Sécurité

- ✅ Utiliser HTTPS en production
- ✅ Sécuriser les API routes avec authentification
- ✅ Rate limiting sur les endpoints publics
- ✅ Validation côté serveur (Zod)
- ✅ Sanitize user inputs
- ✅ Supabase RLS activé

### Performance

- ✅ Caching avec Next.js
- ✅ Images optimisées (next/image)
- ✅ Code splitting automatique
- ✅ CDN Vercel Edge Network
- ✅ Lazy loading composants

### Monitoring

- ✅ Sentry pour error tracking
- ✅ Vercel Analytics
- ✅ Logs structurés
- ✅ Alerts email/Slack

### Backup

- ✅ Backup quotidien Supabase
- ✅ Versionning code (Git)
- ✅ Export régulier des données

---

## ✅ Checklist de Configuration

Avant de passer en production, vérifier :

- [ ] Supabase configuré et migrations exécutées
- [ ] Google Calendar API activée et credentials configurés
- [ ] Refresh token obtenu et fonctionnel
- [ ] Calendrier dédié créé
- [ ] Resend configuré et domaine vérifié
- [ ] Email de test envoyé et reçu
- [ ] Toutes les variables d'environnement définies
- [ ] Cron job configuré (Vercel ou externe)
- [ ] Test complet du flow effectué
- [ ] Logs et monitoring configurés
- [ ] Backup configuré
- [ ] Documentation d'équipe mise à jour

---

**Besoin d'aide ?** Consultez la [Documentation Technique](./FEATURES_IMPLEMENTED.md) ou ouvrez une issue sur GitHub.

**Bonne configuration ! 🚀**
