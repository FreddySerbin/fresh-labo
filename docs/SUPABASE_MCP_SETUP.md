# Configuration MCP Supabase pour Fresh Lab'O

## 📋 Vue d'ensemble

Le MCP (Model Context Protocol) Supabase permet à Cursor AI d'interagir directement avec votre base de données Supabase en utilisant des commandes en langage naturel.

## ✅ Configuration Effectuée

Deux fichiers de configuration MCP ont été créés :

### 1. Configuration Globale
**Fichier :** `C:\Users\serbi\.cursor\mcp.json`

Cette configuration s'applique à tous vos projets Cursor.

### 2. Configuration Locale (Projet)
**Fichier :** `d:\Informatique\Fresh LabO\.cursor\mcp.json`

Cette configuration est spécifique au projet Fresh Lab'O.

### Configuration
```json
{
  "mcpServers": {
    "supabase": {
      "url": "https://mcp.supabase.com/mcp"
    }
  }
}
```

## 🔐 Authentification

Le MCP Supabase moderne utilise l'**enregistrement dynamique du client**, ce qui signifie :

- ✅ Pas besoin de token d'accès personnel (PAT)
- ✅ Connexion automatique via votre compte Supabase
- ✅ Gestion sécurisée des permissions

### Première connexion

1. **Redémarrez Cursor** pour charger la configuration MCP
2. Lors de la première utilisation, vous serez invité à :
   - Vous connecter à votre compte Supabase
   - Autoriser l'accès à votre organisation
3. Une fois autorisé, le MCP pourra accéder à vos bases de données

## 🧪 Vérification de l'Installation

### Via les Paramètres Cursor

1. Ouvrir **Settings** → **Cursor Settings** → **Tools & MCP**
2. Vérifier que "supabase" apparaît dans la liste des serveurs MCP
3. Le statut devrait être "Connected" ou "Ready"

### Via l'Assistant AI

Testez la connexion en posant une question à Cursor AI :

```
Quelles tables sont présentes dans la base de données Fresh Lab'O ? Utilise les outils MCP.
```

ou

```
Affiche-moi le schéma de la table 'bookings' via MCP
```

## 🛠️ Commandes MCP Supabase Disponibles

Une fois configuré, vous pouvez demander à Cursor AI de :

### Exploration de la Base de Données
```
- Lister toutes les tables
- Afficher le schéma d'une table
- Voir les relations entre tables
- Lister les fonctions PostgreSQL
- Afficher les politiques RLS
```

### Requêtes de Données
```
- Exécuter des requêtes SELECT
- Insérer des données de test
- Mettre à jour des enregistrements
- Supprimer des données
```

### Gestion du Schéma
```
- Créer de nouvelles tables
- Modifier des colonnes
- Ajouter des index
- Créer des migrations
```

## 📝 Exemples d'Utilisation

### Exemple 1 : Explorer la Base de Données

**Question à l'AI :**
```
Via MCP Supabase, affiche-moi toutes les tables de la base de données Fresh Lab'O
```

### Exemple 2 : Vérifier les Données

**Question à l'AI :**
```
Utilise MCP pour me montrer les 5 dernières réservations dans la table bookings
```

### Exemple 3 : Créer une Migration

**Question à l'AI :**
```
Crée une migration SQL pour ajouter une colonne 'notes' de type text à la table bookings
```

### Exemple 4 : Tester les Données Seed

**Question à l'AI :**
```
Via MCP, vérifie que les services et options sont bien présents dans la base de données
```

## ⚙️ Configuration Avancée

### Variables d'Environnement Requises

Pour que le MCP fonctionne correctement, assurez-vous que votre fichier `.env.local` contient :

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key
```

### Permissions

Le MCP Supabase aura accès à :
- ✅ Schéma de la base de données
- ✅ Données des tables (selon RLS)
- ✅ Fonctions et triggers
- ✅ Politiques de sécurité

## 🔄 Mise à Jour de la Configuration

Si vous devez modifier la configuration MCP :

1. Éditez le fichier `.cursor/mcp.json`
2. Sauvegardez les modifications
3. **Redémarrez Cursor** pour appliquer les changements

## 🐛 Dépannage

### Le MCP ne se connecte pas

1. **Vérifiez la configuration** :
   - Le fichier `mcp.json` est bien formaté (JSON valide)
   - L'URL est correcte : `https://mcp.supabase.com/mcp`

2. **Redémarrez Cursor complètement** :
   - Fermez toutes les fenêtres Cursor
   - Relancez l'application

3. **Vérifiez les logs Cursor** :
   - Ouvrir : **Help** → **Toggle Developer Tools** → **Console**
   - Chercher les erreurs liées à MCP

### Le MCP ne détecte pas ma base de données

1. **Vérifiez l'authentification** :
   - Déconnectez et reconnectez-vous à Supabase
   - Vérifiez les permissions de votre organisation

2. **Variables d'environnement** :
   - Assurez-vous que `.env.local` est correctement configuré
   - Les clés Supabase sont valides

### Configuration locale non détectée

Si Cursor utilise uniquement la configuration globale :
- C'est un comportement normal dans certaines versions
- La configuration globale suffit pour le développement
- Pas d'impact sur les fonctionnalités

## 📚 Ressources

- [Documentation officielle MCP Supabase](https://supabase.com/docs/guides/getting-started/mcp)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Supabase MCP GitHub](https://github.com/supabase/mcp)

## 🎯 Prochaines Étapes

Maintenant que le MCP est configuré, vous pouvez :

1. ✅ **Tester la connexion** avec une requête simple
2. ✅ **Explorer votre schéma** de base de données via l'AI
3. ✅ **Générer des requêtes SQL** automatiquement
4. ✅ **Créer des migrations** avec l'aide de l'AI
5. ✅ **Déboguer les politiques RLS** en demandant à l'AI

---

**Note :** Le fichier `.cursor/mcp.json` est ajouté au `.gitignore` pour éviter de commiter des configurations potentiellement sensibles.
