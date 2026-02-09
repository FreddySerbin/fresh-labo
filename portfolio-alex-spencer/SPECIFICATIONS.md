# PORTFOLIO ALEX SPENCER - SPÉCIFICATIONS COMPLÈTES

## 📋 Vue d'Ensemble du Projet

### Objectif
Créer un portfolio professionnel multi-pages responsive et accessible pour Alex Spencer, développeur front-end junior.

### Technologies
- **HTML5** : Structure sémantique
- **CSS3** : Styling moderne (Grid, Flexbox, Custom Properties)
- **JavaScript Vanilla** : Interactivité (ES6+)
- **Approche** : Mobile-First, Progressive Enhancement

---

## 🎯 Exigences Fonctionnelles

### 1. Navigation
**Comportement Mobile/Tablette (< 1110px)**
- Menu hamburger en haut à droite
- Animation du hamburger (3 barres → X)
- Menu slide depuis la droite (223px de largeur)
- Overlay semi-transparent sur le contenu
- Fermeture au clic sur overlay ou lien
- Fermeture avec touche Escape
- Prévention du scroll body quand menu ouvert

**Comportement Desktop (≥ 1110px)**
- Menu horizontal à droite du logo
- 3 liens : HOME | PORTFOLIO | CONTACT ME
- Lien actif mis en évidence (couleur accent)
- States : hover, focus, active

### 2. Page d'Accueil (index.html)

**Hero Section**
- Image mockup à gauche (desktop) / en haut (mobile)
- Contenu à droite (desktop) / en bas (mobile)
- Titre : "Hey, I'm Alex Spencer and I love building beautiful websites"
- Bouton CTA "ABOUT ME" avec flèche
- Clic sur bouton → smooth scroll vers section About

**About Section**
- Photo de profil à gauche (desktop) / en haut (mobile)
- Titre "About Me" avec bordure supérieure (mobile uniquement)
- Texte biographique
- Bouton "GO TO PORTFOLIO" vers portfolio.html

**CTA Section**
- Titre : "Interested in doing a project together?"
- Bouton "CONTACT ME" vers contact.html

### 3. Page Portfolio (portfolio.html)

**Structure**
- Liste de projets en grille alternée
- Chaque projet contient :
  - Image du projet
  - Titre du projet
  - Description courte
  - Bouton "VIEW PROJECT" vers page détail

**Layout**
- Mobile : Stack vertical
- Tablette/Desktop : Grille 2 colonnes alternée
  - Projet 1 : Image gauche, contenu droite
  - Projet 2 : Image droite, contenu gauche
  - Etc.

### 4. Page Contact (contact.html)

**Sections**
1. **Intro** :
   - Titre "Get in Touch"
   - Texte d'introduction
   - Liens sociaux (GitHub, Twitter, LinkedIn)

2. **Formulaire** :
   - Champ Nom (required)
   - Champ Email (required, validation format)
   - Champ Message (required, textarea)
   - Bouton "SEND MESSAGE"

**Validation**
- Validation temps réel au blur
- Messages d'erreur :
  - Champ vide : "Ce champ est obligatoire"
  - Email invalide : "Veuillez utiliser une adresse e-mail valide"
  - Message trop court : "Le message doit contenir au moins 10 caractères"
- États visuels d'erreur (outline rouge)
- Message de succès après soumission
- Désactivation bouton pendant envoi

---

## 🎨 Design System

### Couleurs
```css
--color-primary: #33323D      /* Texte principal, fond sombre */
--color-secondary: #FAFAFA    /* Fond clair */
--color-accent: #5FB4A2       /* Accent vert/bleu */
--color-text: #33323D         /* Texte corps */
--color-text-light: #828282   /* Texte secondaire */
--color-error: #F43030        /* Messages d'erreur */
--color-white: #FFFFFF        /* Blanc pur */
--color-divider: #E0E0E0      /* Séparateurs */
```

### Typographie

**Familles**
- Headings : Ibarra Real Nova (serif)
- Body : Public Sans (sans-serif)

**Tailles**
```css
/* Mobile */
H1: 40px / 700
H2: 32px / 700
H3: 24px / 400
Body: 16px / 400

/* Desktop */
H1: 50px / 700
H2: 40px / 700
H3: 32px / 400
Body: 16px / 400
```

**Line Heights**
- Headings : 1.2
- Body : 1.7

### Espacements
```css
--spacing-xs: 8px
--spacing-sm: 16px
--spacing-md: 24px
--spacing-lg: 32px
--spacing-xl: 48px
--spacing-2xl: 64px
--spacing-3xl: 80px
--spacing-4xl: 112px
```

### Breakpoints
```css
Mobile: < 768px
Tablet: 768px - 1109px
Desktop: ≥ 1110px
```

### Composants

**Boutons**
- Hauteur : ~48px
- Padding : 16px 32px
- Min-width : 200px
- Text : 13px / UPPERCASE / LETTER-SPACING 2px
- Types :
  - Primary : Fond sombre, texte blanc
  - Secondary : Bordure, fond transparent

**Cards Projets**
- Border-radius : 0 (design carré)
- Shadow : Aucune
- Spacing : 32px (mobile), 48-80px (desktop)

**Formulaires**
- Background inputs : #FAFAFA
- Padding : 8px 16px
- Font-size : 13px
- Textarea min-height : 96px

---

## 📱 Responsive Design

### Mobile (< 768px)
- Menu hamburger
- Layout vertical (stack)
- Container padding : 24px
- Font-size réduite pour titres
- Images pleine largeur

### Tablet (768px - 1109px)
- Menu hamburger (encore)
- Layout grille 2 colonnes (About, Projects)
- Container padding : 32px
- Hero : image + contenu superposé

### Desktop (≥ 1110px)
- Menu horizontal
- Container max-width : 1110px
- Layout grille complexe
- Hero : side-by-side
- About : side-by-side (350px + 1fr)
- Projects : alternating 2 colonnes

---

## ♿ Accessibilité

### Navigation au Clavier
- Tous les éléments interactifs accessibles au Tab
- Focus visible (outline 2px accent)
- Skip to main content link
- Menu mobile : trap focus quand ouvert

### ARIA
```html
<nav aria-label="Navigation principale">
<button aria-label="Toggle menu" aria-expanded="false">
<a href="#" aria-current="page">
<span role="alert"> (messages d'erreur)
```

### Sémantique HTML
```html
<header>, <nav>, <main>, <section>, <article>, <footer>
<h1>, <h2>, <h3> (hiérarchie respectée)
<button> pour actions, <a> pour navigation
<label> associé à chaque <input>
```

### Images
- Alt text descriptif
- Images décoratives : alt=""
- Responsive images avec srcset

### Contraste
- Minimum WCAG AA (4.5:1)
- Texte principal : #33323D sur #FFFFFF = ✓
- Texte secondaire : #828282 sur #FFFFFF = ✓

---

## 🚀 Performance

### Optimisations
1. **Images**
   - Format moderne (WebP avec fallback)
   - Compression optimale
   - Lazy loading (intersection observer)
   - Responsive images (srcset, sizes)

2. **CSS**
   - Critical CSS inline (optionnel)
   - CSS minifié en production
   - Utilisation de CSS custom properties

3. **JavaScript**
   - Scripts en fin de body
   - Modules ES6 (optionnel)
   - Debounce pour resize/scroll events

4. **Fonts**
   - Preconnect vers Google Fonts
   - font-display: swap

### Métriques Cibles
- First Contentful Paint : < 1.8s
- Time to Interactive : < 3.5s
- Cumulative Layout Shift : < 0.1
- Lighthouse Score : > 90

---

## 📂 Structure de Fichiers

```
portfolio-alex-spencer/
│
├── index.html              # Page d'accueil
├── portfolio.html          # Index portfolio
├── contact.html            # Page contact
│
├── projects/
│   ├── bookmark.html       # Détail projet 1
│   ├── manage.html         # Détail projet 2
│   ├── insure.html         # Détail projet 3
│   └── fylo.html           # Détail projet 4
│
├── css/
│   ├── main.css           # Variables, reset, base
│   ├── components.css     # Composants
│   └── responsive.css     # Media queries
│
├── js/
│   ├── main.js           # Script principal
│   ├── navigation.js     # Menu mobile
│   └── form-validation.js # Validation formulaire
│
├── images/
│   ├── logo.svg
│   ├── favicon-32x32.png
│   ├── hero-mockup.jpg
│   ├── profile.jpg
│   └── projects/
│
└── README.md              # Documentation
```

---

## ✅ Checklist de Développement

### Phase 1 : Structure HTML
- [x] index.html (page d'accueil)
- [x] portfolio.html (index projets)
- [x] contact.html (formulaire)
- [ ] projects/manage.html
- [ ] projects/bookmark.html
- [ ] projects/insure.html
- [ ] projects/fylo.html

### Phase 2 : Styles CSS
- [x] main.css (variables, reset, base)
- [x] components.css (navigation, boutons, cards, formulaires)
- [x] responsive.css (media queries)
- [x] Tester sur 3 tailles d'écran

### Phase 3 : JavaScript
- [x] navigation.js (menu mobile)
- [x] form-validation.js (validation complète)
- [x] main.js (smooth scroll, animations)
- [x] Tester tous les comportements

### Phase 4 : Contenu
- [ ] Optimiser et placer les images
- [ ] Rédiger le contenu About Me
- [ ] Rédiger descriptions projets
- [ ] Vérifier tous les liens

### Phase 5 : Tests
- [ ] Validation HTML (W3C)
- [ ] Validation CSS (W3C)
- [ ] Accessibilité (WAVE, axe DevTools)
- [ ] Performance (Lighthouse)
- [ ] Cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] Cross-device (mobile, tablette, desktop)

### Phase 6 : Optimisation
- [ ] Compresser images
- [ ] Minifier CSS/JS
- [ ] Ajouter meta tags
- [ ] Configurer favicon
- [ ] Tester en conditions réelles

---

**Version :** 1.0.0  
**Dernière mise à jour :** 2024  
**Auteur :** Alex Spencer  
**License :** Tous droits réservés
