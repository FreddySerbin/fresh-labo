# 🌐 Création d'une URL Temporaire pour Preview Client

## ✅ Étape 1 : Serveur lancé

Votre serveur Next.js est déjà en cours d'exécution sur : **http://localhost:3001**

## 🚀 Étape 2 : Installer et utiliser Ngrok

### Installation rapide de Ngrok

1. **Téléchargez ngrok** :
   - Allez sur https://ngrok.com/download
   - Téléchargez la version Windows (ZIP)
   - Extrayez le fichier `ngrok.exe` dans un dossier facile d'accès (ex: `C:\ngrok\`)

2. **Créer un compte gratuit (optionnel mais recommandé)** :
   - Allez sur https://dashboard.ngrok.com/signup
   - Créez un compte gratuit
   - Récupérez votre "Authtoken" sur https://dashboard.ngrok.com/get-started/your-authtoken

### Utilisation de Ngrok

#### Méthode 1 : Sans authentification (URL valable 2 heures)

Ouvrez un **nouveau PowerShell** et exécutez :

```powershell
# Si vous avez extrait ngrok dans C:\ngrok\
C:\ngrok\ngrok.exe http 3001

# OU si vous l'avez ajouté au PATH
ngrok http 3001
```

#### Méthode 2 : Avec authentification (URL valable 8 heures, recommandé)

Si vous avez créé un compte ngrok :

```powershell
# Configuration unique (remplacez YOUR_AUTH_TOKEN par votre token)
C:\ngrok\ngrok.exe config add-authtoken YOUR_AUTH_TOKEN

# Puis lancez ngrok
C:\ngrok\ngrok.exe http 3001
```

### 📋 Récupérer l'URL publique

Une fois ngrok lancé, vous verrez quelque chose comme :

```
ngrok                                                               

Session Status                online
Account                       votre-email@example.com
Version                       3.x.x
Region                        Europe (eu)
Latency                       -
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123.ngrok-free.app -> http://localhost:3001

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

**L'URL à partager avec votre client est celle qui commence par `https://`** (ex: `https://abc123.ngrok-free.app`)

### 🎯 Partager avec le client

Envoyez simplement l'URL `https://xxx.ngrok-free.app` à votre client.

**Important** :
- ⏱️ Sans compte : L'URL expire après 2 heures
- ✅ Avec compte gratuit : L'URL expire après 8 heures
- 🔄 Chaque fois que vous relancez ngrok, l'URL change (sauf avec un compte payant)
- 🌐 Le client verra une page d'avertissement ngrok la première fois (cliquer sur "Visit Site")

## 🔄 Option alternative : Vercel (URL permanente)

Si vous voulez une URL plus permanente, vous pouvez déployer sur Vercel gratuitement :

```powershell
cd "d:\Informatique\Fresh LabO"
npm install -g vercel
vercel login
vercel --prod
```

Avantages Vercel :
- ✅ URL permanente (ex: `fresh-labo.vercel.app`)
- ✅ Gratuit pour les projets personnels
- ✅ Mises à jour automatiques depuis GitHub
- ✅ SSL/HTTPS automatique

## 📊 Statut actuel

- ✅ Build réussi
- ✅ Serveur de dev lancé sur http://localhost:3001
- ⏳ En attente : Installation de ngrok ou déploiement Vercel

## 🛑 Arrêter le serveur

Quand vous avez terminé, arrêtez le serveur Next.js en fermant le terminal ou en appuyant sur `Ctrl+C`.
