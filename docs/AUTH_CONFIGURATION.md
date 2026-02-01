# 🔐 Configuration de l'Authentification

## Problème : Emails de Confirmation Non Reçus

### Cause
Par défaut, Supabase requiert une **confirmation par email** pour chaque nouvel utilisateur, mais aucun service d'email n'est configuré en développement local.

---

## ✅ Solutions

### Option 1 : Désactiver la Confirmation Email (Recommandé pour Dev)

**Pour le développement local uniquement :**

1. Allez sur : https://supabase.com/dashboard/project/oqpzjyceerdmdxrszjib/auth/providers

2. Cliquez sur **"Email"** dans le menu de gauche

3. Descendez jusqu'à **"Email Settings"**

4. **Désactivez** :
   - ❌ `Enable email confirmations`

5. Cliquez sur **"Save"**

**Résultat :**
- ✅ Les utilisateurs peuvent se connecter immédiatement après inscription
- ✅ Pas besoin de configuration email
- ⚠️ À réactiver en production !

---

### Option 2 : Configurer un Service d'Email (Production)

Pour la production, vous devrez configurer un service d'email :

#### A. Utiliser le Service Email Supabase (Limité)

**Limites :**
- 3 emails/heure en développement
- Pas recommandé pour la production

#### B. Configurer un Service Externe (Recommandé)

**Services compatibles :**
- **Resend** (recommandé) - 100 emails/jour gratuits
- **SendGrid** - 100 emails/jour gratuits
- **Mailgun**
- **AWS SES**
- **SMTP personnalisé**

**Configuration avec Resend (exemple) :**

1. Créez un compte sur [resend.com](https://resend.com)

2. Obtenez votre clé API

3. Ajoutez dans `.env.local` :
   ```bash
   RESEND_API_KEY=re_votre_cle_api_ici
   ```

4. Dans Supabase Dashboard → Authentication → Email Templates :
   - Configurez les templates d'email
   - Personnalisez le design et le contenu

5. Dans Supabase Dashboard → Project Settings → API :
   - Configurez le service SMTP custom si nécessaire

---

## 🔄 Flux d'Authentification

### Avec Confirmation Désactivée

```
Inscription → Profil créé → ✅ Connexion immédiate → Dashboard
```

### Avec Confirmation Activée

```
Inscription → Email envoyé → 📧 Utilisateur clique sur le lien → ✅ Email confirmé → Connexion → Dashboard
```

---

## 📁 Fichiers Modifiés

### 1. `src/contexts/AuthContext.tsx`
- Détection automatique si confirmation requise
- Redirection intelligente selon la configuration
- Messages toast adaptés

### 2. `src/app/auth/verify-email/page.tsx`
- Page d'attente de confirmation
- Option de renvoi d'email
- Instructions claires pour l'utilisateur

### 3. `src/app/auth/callback/route.ts`
- Gestion du callback après confirmation email
- Échange du code contre une session
- Redirection vers le dashboard

### 4. `src/app/auth/auth-code-error/page.tsx`
- Page d'erreur si le lien a expiré
- Options de récupération
- UX claire et rassurante

---

## 🧪 Tester l'Authentification

### Test avec Confirmation Désactivée

1. Allez sur http://localhost:3004/auth/register
2. Créez un compte
3. ✅ Vous devriez être redirigé vers `/dashboard` immédiatement

### Test avec Confirmation Activée

1. Activez la confirmation email dans Supabase
2. Configurez un service d'email
3. Créez un compte
4. ✅ Vous devriez être redirigé vers `/auth/verify-email`
5. Vérifiez votre email
6. Cliquez sur le lien
7. ✅ Vous devriez être redirigé vers `/dashboard`

---

## 🔒 Sécurité en Production

### Checklist Avant Mise en Production

- [ ] Réactiver la confirmation email
- [ ] Configurer un service d'email fiable (Resend, SendGrid, etc.)
- [ ] Personnaliser les templates d'email
- [ ] Configurer le domaine d'envoi
- [ ] Tester le flux complet
- [ ] Configurer les Rate Limits
- [ ] Activer reCAPTCHA si nécessaire
- [ ] Configurer la politique de mots de passe forts

---

## 📊 Configuration Supabase Actuelle

```typescript
// .env.local
NEXT_PUBLIC_SUPABASE_URL=https://oqpzjyceerdmdxrszjib.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

**État actuel :**
- Email confirmation : ⚠️ À configurer dans le dashboard
- Service email : ❌ Non configuré (dev local)
- OAuth providers : ❌ Non configurés

---

## 🎯 Prochaines Étapes

### Court Terme (Dev)
1. Désactiver la confirmation email
2. Tester l'inscription/connexion
3. Développer les autres fonctionnalités

### Long Terme (Production)
1. Créer un compte Resend
2. Configurer le service d'email
3. Personnaliser les templates
4. Réactiver la confirmation
5. Tester en conditions réelles

---

## 🆘 Dépannage

### L'utilisateur ne reçoit pas l'email

**Vérifications :**
1. La confirmation email est-elle activée ?
2. Le service d'email est-il configuré ?
3. L'email est-il dans les spams ?
4. Les logs Supabase montrent-ils des erreurs ?

**Solutions :**
- Désactiver temporairement la confirmation (dev)
- Vérifier la configuration SMTP
- Consulter les logs dans Supabase Dashboard → Logs

### Le lien de confirmation expire

**Par défaut :**
- Les liens expirent après **24 heures**

**Configuration :**
- Supabase Dashboard → Authentication → Settings
- Modifier `Email Link Expiry Time`

---

## 📞 Support

Pour toute question sur l'authentification :
- 📧 Documentation Supabase : https://supabase.com/docs/guides/auth
- 💬 Discord Supabase : https://discord.supabase.com
- 🐛 GitHub Issues : https://github.com/supabase/supabase/issues
