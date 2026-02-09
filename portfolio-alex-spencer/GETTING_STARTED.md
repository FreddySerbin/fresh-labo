# 🚀 Guide de Démarrage Rapide

## Bienvenue dans le Portfolio Alex Spencer !

Ce guide vous aidera à démarrer rapidement avec le projet.

---

## 📦 Installation

### Option 1 : Serveur Local avec Python

```bash
# Naviguez dans le dossier du projet
cd portfolio-alex-spencer

# Lancez un serveur HTTP avec Python 3
python -m http.server 8000

# Ouvrez votre navigateur
# http://localhost:8000
```

### Option 2 : Serveur Local avec Node.js

```bash
# Naviguez dans le dossier du projet
cd portfolio-alex-spencer

# Lancez http-server (installation si nécessaire)
npx http-server

# Le serveur démarre généralement sur le port 8080
# http://localhost:8080
```

### Option 3 : VS Code Live Server

1. Ouvrez le dossier du projet dans VS Code
2. Installez l'extension "Live Server" si ce n'est pas déjà fait
3. Clic droit sur `index.html` → "Open with Live Server"
4. Le site s'ouvre automatiquement dans votre navigateur

---

## 📂 Structure du Projet

```
portfolio-alex-spencer/
├── index.html              ✅ Page d'accueil
├── portfolio.html          ✅ Page portfolio
├── contact.html            ✅ Page contact
│
├── projects/
│   └── manage.html         ✅ Exemple de projet
│
├── css/
│   ├── main.css           ✅ Styles de base
│   ├── components.css     ✅ Composants
│   └── responsive.css     ✅ Responsive
│
├── js/
│   ├── main.js           ✅ Script principal
│   ├── navigation.js     ✅ Menu mobile
│   └── form-validation.js ✅ Validation formulaire
│
├── images/
│   └── README.md          📝 Guide des images
│
├── README.md              📖 Documentation complète
├── SPECIFICATIONS.md      📋 Spécifications détaillées
└── CURSOR-GUIDE.md        🚀 Guide Cursor
```

---

## ✅ Fichiers Créés

### Pages HTML
- ✅ `index.html` - Page d'accueil complète
- ✅ `portfolio.html` - Page portfolio avec 4 projets
- ✅ `contact.html` - Page contact avec formulaire
- ✅ `projects/manage.html` - Page détail d'un projet (exemple)

### Styles CSS
- ✅ `css/main.css` - Variables, reset, typographie, base styles
- ✅ `css/components.css` - Navigation, boutons, forms, cards, footer
- ✅ `css/responsive.css` - Media queries pour mobile/tablette/desktop

### Scripts JavaScript
- ✅ `js/main.js` - Smooth scroll, animations, interactions
- ✅ `js/navigation.js` - Menu hamburger mobile complet
- ✅ `js/form-validation.js` - Validation formulaire avec messages français

### Documentation
- ✅ `README.md` - Documentation complète du projet
- ✅ `SPECIFICATIONS.md` - Spécifications techniques détaillées
- ✅ `CURSOR-GUIDE.md` - Guide pour utiliser Cursor
- ✅ `.gitignore` - Fichier gitignore configuré

---

## 🎨 Fonctionnalités Implémentées

### ✅ Navigation
- Menu hamburger responsive (mobile/tablette)
- Menu horizontal (desktop)
- Animation smooth du hamburger
- Overlay avec fermeture au clic
- Smooth scroll vers sections
- Lien actif mis en évidence

### ✅ Page d'Accueil
- Hero section avec CTA
- Section About Me
- Dividers élégants
- Call-to-action de contact

### ✅ Page Portfolio
- Grille de projets responsive
- Layout alternant (image gauche/droite)
- Cards projets avec descriptions

### ✅ Page Contact
- Formulaire complet
- Validation en temps réel
- Messages d'erreur en français
- Icônes sociales

### ✅ Responsive Design
- Mobile-First approach
- 3 breakpoints : mobile, tablette, desktop
- Layout Grid/Flexbox adaptatifs
- Images responsive

### ✅ Accessibilité
- Navigation au clavier complète
- Focus visible sur tous éléments
- ARIA labels appropriés
- Skip to main content
- Sémantique HTML5

---

## 📋 Prochaines Étapes

### 1. Ajouter les Images 🖼️

Les images doivent être placées dans le dossier `images/`. Consultez `images/README.md` pour les spécifications.

**Images nécessaires :**
- `logo.svg` (61x32px)
- `favicon-32x32.png`
- `hero-mockup.jpg` (~540x600px)
- `profile.jpg` (~350x400px)
- `projects/manage-preview.jpg` et autres projets

### 2. Créer les Pages de Projets 📄

Dupliquer `projects/manage.html` pour créer :
- `projects/bookmark.html`
- `projects/insure.html`
- `projects/fylo.html`

### 3. Personnaliser le Contenu ✍️

- Remplacer les textes par votre contenu
- Ajouter vos propres projets
- Modifier les liens sociaux
- Adapter les descriptions

### 4. Tester 🧪

```bash
# Validation HTML
https://validator.w3.org/

# Validation CSS
https://jigsaw.w3.org/css-validator/

# Accessibilité
https://wave.webaim.org/

# Performance
Chrome DevTools > Lighthouse
```

---

## 🎯 Design System

### Couleurs Principales
- **Primary Dark**: `#33323D` - Texte, headers
- **Light Gray**: `#FAFAFA` - Backgrounds
- **Accent Teal**: `#5FB4A2` - CTAs, liens
- **Medium Gray**: `#828282` - Texte secondaire
- **Red Error**: `#F43030` - Messages d'erreur

### Typographie
- **Headings**: Ibarra Real Nova (serif)
- **Body**: Public Sans (sans-serif)

### Breakpoints
- **Mobile**: < 768px
- **Tablette**: 768px - 1109px
- **Desktop**: ≥ 1110px

---

## 🔧 Développement avec Cursor

Si vous utilisez Cursor IDE :

1. Ouvrez le projet :
   ```bash
   cursor .
   ```

2. Consultez `CURSOR-GUIDE.md` pour des prompts prêts à l'emploi

3. Utilisez les spécifications dans `SPECIFICATIONS.md` pour référence

---

## ❓ Besoin d'Aide ?

### Documentation
- **README.md** - Vue d'ensemble et installation
- **SPECIFICATIONS.md** - Détails techniques
- **CURSOR-GUIDE.md** - Prompts et workflows Cursor
- **images/README.md** - Guide des images

### Ressources
- [Google Fonts](https://fonts.google.com/)
- [W3C Validators](https://validator.w3.org/)
- [WAVE Accessibility](https://wave.webaim.org/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## ✨ Fonctionnalités Bonus

### À Ajouter (Optionnel)
- [ ] Dark mode toggle
- [ ] Animations au scroll avancées
- [ ] Blog section
- [ ] Backend pour le formulaire (EmailJS, Netlify Forms)
- [ ] Analytics (Google Analytics)
- [ ] PWA capabilities

---

## 🎉 C'est Parti !

Votre portfolio est prêt à être personnalisé et déployé !

**Prochaine étape :** Ouvrez `index.html` dans votre navigateur et explorez le site.

**Bon développement ! 🚀**

---

© 2024 Alex Spencer Portfolio - Tous droits réservés
