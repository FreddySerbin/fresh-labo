# Dépannage MCP Supabase - Fresh Lab'O

## ❌ Erreur : "OAuth authorization request does not exist"

### 🔍 Description de l'Erreur

```
Failed to fetch details for API authorization request
Please retry your authorization request from the requesting app
Error: OAuth authorization request does not exist
```

Cette erreur se produit lors de la première connexion au MCP Supabase.

### 🎯 Causes Possibles

1. **Requête OAuth expirée** - La demande d'autorisation a timeout
2. **Problème de timing** - Le flux OAuth a été interrompu
3. **Cache du navigateur** - Des données obsolètes interfèrent
4. **Session Cursor** - La session MCP n'est pas correctement initialisée

### ✅ Solutions (Dans l'Ordre)

#### Solution 1 : Réessayer l'Autorisation

**Étape par Étape :**

1. **Fermez complètement Cursor**
   - Fermez toutes les fenêtres
   - Vérifiez dans le gestionnaire des tâches qu'aucun processus Cursor ne tourne
   - Windows : Ctrl+Shift+Échap → Tuer tous les processus "Cursor"

2. **Relancez Cursor**
   - Ouvrez le projet Fresh Lab'O
   - Attendez que tout soit chargé

3. **Forcez une nouvelle connexion MCP**
   - Allez dans **Settings** (Ctrl+,)
   - Naviguez vers **Cursor Settings** → **Tools & MCP**
   - Trouvez "supabase" dans la liste
   - Cliquez sur le bouton **"Reconnect"** ou **"Authorize"**

4. **Suivez le flux OAuth**
   - Une nouvelle fenêtre de navigateur devrait s'ouvrir
   - Connectez-vous à Supabase
   - Autorisez l'accès à votre organisation
   - Sélectionnez le projet Fresh Lab'O

#### Solution 2 : Vider le Cache MCP

Si la solution 1 ne fonctionne pas :

1. **Fermez Cursor complètement**

2. **Supprimez le cache MCP** (Windows) :
   ```powershell
   Remove-Item -Recurse -Force "$env:USERPROFILE\.cursor\mcp-cache" -ErrorAction SilentlyContinue
   ```

3. **Supprimez les sessions OAuth** :
   ```powershell
   Remove-Item -Recurse -Force "$env:USERPROFILE\.cursor\mcp-sessions" -ErrorAction SilentlyContinue
   ```

4. **Relancez Cursor** et réessayez l'autorisation

#### Solution 3 : Vérifier la Configuration MCP

Assurez-vous que le fichier `mcp.json` est correct :

**Fichier : `C:\Users\serbi\.cursor\mcp.json`**

```json
{
  "mcpServers": {
    "supabase": {
      "url": "https://mcp.supabase.com/mcp"
    }
  }
}
```

**Vérifications :**
- ✅ JSON valide (pas d'erreur de syntaxe)
- ✅ URL correcte : `https://mcp.supabase.com/mcp`
- ✅ Pas de virgule en trop
- ✅ Guillemets corrects

#### Solution 4 : Utiliser l'Installation One-Click

Au lieu de la configuration manuelle, utilisez le lien d'installation direct :

1. **Dans Cursor**, allez dans **Settings**
2. **Cursor Settings** → **Tools & MCP**
3. Cherchez **"Install new MCP server"** ou un bouton similaire
4. Cherchez **"Supabase"** dans la liste
5. Cliquez sur **"Install"** ou **"One-click install"**

#### Solution 5 : Vérifier les Permissions du Navigateur

Le flux OAuth utilise votre navigateur par défaut :

1. **Vérifiez que votre navigateur autorise les popups** pour :
   - `supabase.com`
   - `mcp.supabase.com`

2. **Videz le cache du navigateur** :
   - Chrome/Edge : Ctrl+Shift+Suppr
   - Cochez "Cookies et données de site"
   - Effacez pour les dernières 24 heures

3. **Déconnectez-vous de Supabase** dans le navigateur :
   - Allez sur https://supabase.com
   - Déconnectez-vous complètement
   - Fermez le navigateur

4. **Réessayez l'autorisation depuis Cursor**

#### Solution 6 : Mode Debug

Pour voir plus de détails sur l'erreur :

1. **Ouvrez les Developer Tools dans Cursor** :
   - Menu : **Help** → **Toggle Developer Tools**
   - Ou : Ctrl+Shift+I (Windows)

2. **Allez dans l'onglet Console**

3. **Essayez à nouveau de vous connecter au MCP**

4. **Copiez les logs d'erreur** pour analyse

### 🔄 Procédure Complète Recommandée

Suivez ces étapes dans l'ordre pour résoudre le problème :

```powershell
# 1. Arrêter tous les processus Cursor
Get-Process -Name "Cursor" -ErrorAction SilentlyContinue | Stop-Process -Force

# 2. Nettoyer le cache MCP (si nécessaire)
Remove-Item -Recurse -Force "$env:USERPROFILE\.cursor\mcp-cache" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "$env:USERPROFILE\.cursor\mcp-sessions" -ErrorAction SilentlyContinue

# 3. Vérifier que le fichier mcp.json existe et est valide
Get-Content "$env:USERPROFILE\.cursor\mcp.json"

# 4. Relancer Cursor manuellement
```

### 🌐 Méthode Alternative : Configuration avec Token

Si l'OAuth continue de poser problème, utilisez la configuration avec token :

1. **Créez un Personal Access Token sur Supabase** :
   - Allez sur https://supabase.com/dashboard
   - **Settings** → **Access Tokens**
   - Cliquez sur **"Generate new token"**
   - Nommez-le "Cursor MCP"
   - Copiez le token

2. **Modifiez `mcp.json`** :

```json
{
  "mcpServers": {
    "supabase": {
      "url": "https://mcp.supabase.com/mcp",
      "token": "VOTRE_TOKEN_ICI"
    }
  }
}
```

3. **Redémarrez Cursor**

**⚠️ Attention :** Ne commitez JAMAIS ce fichier avec un token !

### 📱 Vérifier que Supabase est Accessible

Testez la connectivité :

```powershell
# Test de connexion à Supabase MCP
curl https://mcp.supabase.com/mcp
```

Si la commande échoue, vérifiez :
- Votre connexion Internet
- Pare-feu Windows
- Proxy d'entreprise éventuel

### 🆘 Si Rien ne Fonctionne

Options de dernier recours :

#### Option A : Réinstaller le MCP

1. Supprimez complètement la configuration :
   ```powershell
   Remove-Item "$env:USERPROFILE\.cursor\mcp.json"
   Remove-Item "d:\Informatique\Fresh LabO\.cursor\mcp.json"
   ```

2. Redémarrez Cursor

3. Utilisez l'installation One-Click depuis les settings

#### Option B : Utiliser Supabase CLI + API directe

Au lieu du MCP, utilisez l'API Supabase directement dans le code :

```typescript
// src/lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

Cette méthode fonctionne sans MCP mais nécessite du code.

#### Option C : Contacter le Support

Si le problème persiste :

1. **Forums Cursor** : https://forum.cursor.sh
2. **Discord Cursor** : https://discord.gg/cursor
3. **GitHub Supabase MCP** : https://github.com/supabase/mcp/issues

### ✅ Vérification Post-Résolution

Une fois le problème résolu, testez avec :

```
Via MCP Supabase, affiche-moi toutes les tables de la base de données
```

Vous devriez voir la liste des tables du projet Fresh Lab'O.

### 📊 Checklist de Diagnostic

Avant de demander de l'aide, vérifiez :

- [ ] Cursor est complètement redémarré
- [ ] Le fichier `mcp.json` existe et est valide
- [ ] Je suis connecté à Supabase dans mon navigateur
- [ ] Mon projet Supabase existe et est accessible
- [ ] Aucun pare-feu ne bloque `mcp.supabase.com`
- [ ] J'ai les permissions sur l'organisation Supabase
- [ ] Le navigateur autorise les popups
- [ ] Le cache du navigateur est vidé

---

**💡 Astuce :** La plupart du temps, un simple redémarrage complet de Cursor résout l'erreur OAuth.
