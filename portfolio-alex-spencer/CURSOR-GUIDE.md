# 🚀 GUIDE DE DÉMARRAGE RAPIDE - CURSOR

## Configuration Initiale

### 1. Ouvrir le Projet dans Cursor
```bash
# Ouvrir Cursor dans le dossier du projet
cd portfolio-alex-spencer
cursor .
```

### 2. Vérifier les Fichiers de Base
Assurez-vous que ces fichiers sont présents :
- ✅ `index.html` - Page d'accueil
- ✅ `portfolio.html` - Page portfolio
- ✅ `contact.html` - Page contact
- ✅ `css/main.css` - Styles de base
- ✅ `css/components.css` - Composants
- ✅ `css/responsive.css` - Responsive
- ✅ `js/navigation.js` - Menu mobile
- ✅ `js/form-validation.js` - Validation
- ✅ `js/main.js` - Script principal

---

## 📋 Prompts Cursor pour Créer les Éléments Manquants

### Créer des Pages de Projets Détaillées

```
En te basant sur la structure existante, crée la page projects/manage.html avec :
- La navigation complète (même que index.html)
- Hero image du projet en haut
- Section info avec :
  * Sidebar gauche : titre, description, technologies, bouton "VISIT WEBSITE"
  * Main droite : "Project Background" avec texte détaillé
- Section "Static Previews" avec galerie d'images
- Navigation projet (Previous: Insure | Next: Bookmark)
- Footer complet
- Utilise les classes CSS déjà définies dans components.css et responsive.css
```

### Ajouter des Images Placeholder

```
Crée des images placeholder optimisées pour :
- Hero mockup (540x600px)
- Photo de profil (350x400px)
- Aperçus des projets (540x400px chacun)
Format : JPG optimisé, poids max 150KB
Utilise des couleurs du design system (#5FB4A2, #33323D)
```

---

## 🎨 Prompts pour Améliorer le Design

### Ajouter des Animations

```
Ajoute des animations subtiles :
1. Fade-in au scroll pour les sections
2. Hover effects sur les project cards
3. Transition smooth sur les boutons
4. Animation du hamburger menu
Utilise intersection observer et CSS transitions
Respecte prefers-reduced-motion
```

### Améliorer l'Accessibilité

```
Améliore l'accessibilité du site :
1. Vérifie que tous les formulaires ont des labels associés
2. Ajoute des attributs ARIA manquants
3. Teste le contraste des couleurs (WCAG AA)
4. Vérifie la navigation au clavier complète
5. Ajoute des alt text descriptifs à toutes les images
```

---

## 🧪 Prompts pour Tester et Debugger

### Tester la Navigation

```
Teste la navigation mobile et vérifie :
1. Le menu hamburger s'ouvre/ferme correctement
2. L'overlay apparaît et ferme le menu au clic
3. Le scroll est bloqué quand le menu est ouvert
4. La touche Escape ferme le menu
5. Le lien actif est mis en évidence
6. En desktop (≥1110px), le menu est horizontal
```

### Tester le Formulaire

```
Teste la validation du formulaire contact et vérifie :
1. Champ vide → "Ce champ est obligatoire"
2. Email invalide → "Veuillez utiliser une adresse e-mail valide"
3. Message trop court → "Le message doit contenir au moins 10 caractères"
4. Les erreurs s'affichent au blur
5. Les erreurs s'effacent à la saisie
6. La soumission est bloquée si erreurs
7. Message de succès après soumission valide
```

---

## 🔍 Prompts pour Optimisation

### Optimiser les Performances

```
Optimise les performances :
1. Minifie CSS et JS
2. Inline le CSS critique
3. Defer les scripts non-critiques
4. Précharge les fonts Google
5. Vérifie le score Lighthouse (cible >90)
```

### Améliorer le SEO

```
Améliore le SEO du site :
1. Ajoute des meta descriptions uniques pour chaque page
2. Optimise les titres de page
3. Ajoute un sitemap.xml
4. Crée un robots.txt
5. Ajoute des données structurées (JSON-LD)
```

---

## 📊 Checklist Avant Livraison

### Code Quality

```
Vérifie la qualité du code :
- [ ] Validation HTML (W3C) : 0 erreur
- [ ] Validation CSS (W3C) : 0 erreur  
- [ ] Pas d'erreurs console JavaScript
- [ ] Code commenté et bien indenté
- [ ] Convention BEM respectée
- [ ] Variables CSS utilisées partout
```

### Fonctionnalités

```
Vérifie toutes les fonctionnalités :
- [ ] Navigation fonctionne (mobile + desktop)
- [ ] Smooth scroll opérationnel
- [ ] Formulaire valide correctement
- [ ] Tous les liens fonctionnent
- [ ] Images chargent correctement
- [ ] Aucun contenu placeholder restant
```

### Responsive

```
Teste le responsive :
- [ ] iPhone SE (375px)
- [ ] iPad (768px)
- [ ] Desktop (1440px)
- [ ] Layout correct aux 3 breakpoints
- [ ] Images responsive (srcset)
- [ ] Texte lisible à toutes tailles
```

---

## 🎯 Commandes Cursor Utiles

### Génération de Code
- `Cmd/Ctrl + K` : Ouvrir Cursor Chat
- `Cmd/Ctrl + L` : Ajouter fichier au contexte
- `Cmd/Ctrl + I` : Inline edit

### Navigation
- `Cmd/Ctrl + P` : Quick Open fichier
- `Cmd/Ctrl + Shift + P` : Command Palette
- `Cmd/Ctrl + B` : Toggle Sidebar

---

## 📞 Support

Si vous rencontrez des problèmes :
1. Consultez `README.md` pour la documentation
2. Référez-vous à `SPECIFICATIONS.md` pour les détails
3. Inspectez les fichiers existants pour les patterns
4. Utilisez les outils de développement du navigateur

---

**Bon développement avec Cursor ! 🚀**
