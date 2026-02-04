# 🚀 Guide de Déploiement - Fresh Lab'O

## ✅ Option 1 : Vercel (Recommandé) - 5 minutes

### Pourquoi Vercel ?
- ✅ **Gratuit** et optimisé pour Next.js
- ✅ **HTTPS** automatique
- ✅ **URL temporaire** : `fresh-labo.vercel.app`
- ✅ **Déploiement instantané** depuis Git
- ✅ **Preview URLs** pour chaque commit

---

## 📦 Étape 1 : Préparer le Projet

### 1.1 Vérifier package.json

Assurez-vous que votre `package.json` contient :

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### 1.2 Créer .vercelignore (optionnel)

```
node_modules
.next
.env.local
```

---

## 🌐 Étape 2 : Déployer sur Vercel

### Option A : Via Interface Web (Plus Simple)

#### 1. Créer un compte Vercel
- Aller sur [vercel.com](https://vercel.com)
- Cliquer sur **"Sign Up"**
- Se connecter avec GitHub

#### 2. Importer le Projet
- Cliquer sur **"Add New Project"**
- Sélectionner **"Import Git Repository"**
- Choisir votre dépôt `Fresh-LabO`

#### 3. Configurer le Projet
```
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

#### 4. Variables d'Environnement
Ajouter vos variables d'environnement :
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
RESEND_API_KEY=your_resend_key
```

#### 5. Déployer
- Cliquer sur **"Deploy"**
- Attendre 2-3 minutes
- ✅ Votre URL : `https://fresh-labo.vercel.app`

---

### Option B : Via CLI (Plus Rapide)

#### 1. Installer Vercel CLI

```bash
npm install -g vercel
```

#### 2. Se Connecter

```bash
vercel login
```

#### 3. Déployer

```bash
cd "D:\Informatique\Fresh LabO"
vercel
```

Suivre les prompts :
- Set up and deploy? **Y**
- Which scope? **Votre compte**
- Link to existing project? **N**
- Project name? **fresh-labo**
- Directory? **./
- Want to override settings? **N**

#### 4. Déploiement en Production

```bash
vercel --prod
```

✅ **URL générée** : `https://fresh-labo.vercel.app`

---

## 🔒 Étape 3 : Variables d'Environnement

### Via Interface Web

1. Aller dans votre projet Vercel
2. **Settings** → **Environment Variables**
3. Ajouter chaque variable :

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GOOGLE_REFRESH_TOKEN
RESEND_API_KEY
CRON_SECRET
```

### Via CLI

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Entrer la valeur

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Entrer la valeur

# ... etc pour toutes les variables
```

---

## 🎯 Étape 4 : Personnaliser l'URL (Optionnel)

### Domaine Personnalisé Gratuit

Dans Vercel :
1. **Settings** → **Domains**
2. Ajouter un domaine :
   - `fresh-labo-preview.vercel.app`
   - Ou votre propre domaine

---

## 📊 URLs Générées

### Preview URL (temporaire)
```
https://fresh-labo-git-main-votre-username.vercel.app
```

### Production URL (permanente)
```
https://fresh-labo.vercel.app
```

### Domaine Personnalisé (optionnel)
```
https://www.freshlabo.com
```

---

## 🔄 Redéploiement Automatique

✅ **Chaque push sur GitHub** déclenche un nouveau déploiement automatique !

```bash
git add .
git commit -m "Update design"
git push origin main
```

→ Vercel redéploie automatiquement en ~2 minutes

---

## 🚀 Option 2 : Tunnel Local (Ngrok) - 2 minutes

### Pour un Partage Immédiat

#### 1. Installer Ngrok

- Télécharger : [ngrok.com/download](https://ngrok.com/download)
- Décompresser dans un dossier

#### 2. Lancer le Tunnel

```bash
# Terminal 1 : Lancer Next.js
cd "D:\Informatique\Fresh LabO"
npm run dev

# Terminal 2 : Lancer Ngrok
ngrok http 3000
```

#### 3. URL Générée

```
https://abc123.ngrok-free.app
```

⚠️ **Limitations** :
- URL change à chaque redémarrage
- Expire après 2h (version gratuite)
- Peut être lent

---

## 📱 Option 3 : GitHub Pages (Simple mais limité)

### ⚠️ Non Recommandé pour Next.js
- GitHub Pages ne supporte que les sites statiques
- Next.js nécessite un serveur Node.js
- Mieux vaut utiliser Vercel

---

## 🎯 Recommandation Finale

### Pour Votre Client

**Utiliser Vercel** :
- ✅ Professionnel et rapide
- ✅ URL stable : `fresh-labo.vercel.app`
- ✅ HTTPS automatique
- ✅ Gratuit à 100%
- ✅ Redéploiement automatique

### Pour un Test Rapide (5 min)

**Utiliser Ngrok** :
- ✅ Immédiat (2 minutes)
- ❌ URL temporaire
- ❌ Expire après 2h

---

## 📋 Checklist de Déploiement

### Avant de Déployer
- [ ] Vérifier que `npm run build` fonctionne localement
- [ ] Tester toutes les pages principales
- [ ] Vérifier les variables d'environnement
- [ ] Commit et push sur GitHub
- [ ] Créer un compte Vercel

### Déploiement Vercel
- [ ] Connecter le dépôt GitHub
- [ ] Configurer les variables d'environnement
- [ ] Lancer le déploiement
- [ ] Attendre la compilation (2-3 min)
- [ ] Tester l'URL générée

### Partager avec le Client
- [ ] Copier l'URL : `https://fresh-labo.vercel.app`
- [ ] Tester sur mobile
- [ ] Envoyer au client avec contexte

---

## 💬 Message Type pour le Client

```
Bonjour,

Voici le lien de preview du nouveau site Fresh Lab'O :
🔗 https://fresh-labo.vercel.app

Le site est entièrement fonctionnel et optimisé pour mobile.

Points clés à tester :
✅ Page d'accueil avec réservation
✅ Services et tarifs
✅ Formulaire de contact
✅ Responsive mobile

N'hésitez pas si vous avez des retours !

Cordialement
```

---

## 🛠️ Commandes Utiles

### Vercel CLI

```bash
# Déployer
vercel

# Déployer en production
vercel --prod

# Voir les logs
vercel logs

# Lister les déploiements
vercel list

# Supprimer un déploiement
vercel remove [deployment-url]
```

### Debug

```bash
# Tester le build localement
npm run build
npm run start

# Vérifier les erreurs
vercel logs --follow
```

---

## 📞 Support

### Problèmes Courants

**Build Error** :
- Vérifier `npm run build` en local
- Checker les variables d'environnement

**404 sur les routes** :
- Vérifier que Next.js est bien détecté
- Framework Preset = Next.js

**Slow Loading** :
- Vérifier les images (optimiser si >1MB)
- Activer la compression

---

## ✅ Résultat Final

Une fois déployé sur Vercel :

**URL Preview** : `https://fresh-labo.vercel.app`
**Dashboard** : `https://vercel.com/votre-username/fresh-labo`
**Analytics** : Inclus gratuitement
**SSL** : Automatique
**CDN** : Global

**Prêt à partager avec le client ! 🎉**

---

**Date** : 4 février 2026  
**Plateforme** : Vercel  
**Temps de déploiement** : ~5 minutes  
**Coût** : Gratuit
