# Portfolio Alex Spencer

Portfolio professionnel multi-pages pour développeur front-end junior, conçu avec HTML, CSS et JavaScript purs.

## 🎯 Objectifs du Projet

Créer un portfolio responsive et accessible qui permet aux visiteurs de :
- Découvrir le profil et les compétences d'Alex Spencer
- Explorer ses projets avec des détails complets
- Contacter Alex via un formulaire validé
- Naviguer facilement sur tous types d'appareils

## 🛠️ Technologies

- **HTML5** - Structure sémantique
- **CSS3** - Styling moderne (Grid, Flexbox, Custom Properties)
- **JavaScript Vanilla** - Interactivité (ES6+)
- **Mobile-First** - Approche responsive

## 📁 Structure du Projet

```
portfolio-alex-spencer/
├── index.html              # Page d'accueil
├── portfolio.html          # Index des projets
├── contact.html            # Page de contact
├── projects/
│   ├── bookmark.html       # Détail projet Bookmark
│   ├── manage.html         # Détail projet Manage
│   └── insure.html         # Détail projet Insure
├── css/
│   ├── main.css           # Variables, reset, styles de base
│   ├── components.css     # Composants réutilisables
│   └── responsive.css     # Media queries
├── js/
│   ├── main.js           # Logique principale
│   ├── navigation.js     # Gestion menu mobile
│   └── form-validation.js # Validation formulaire
├── images/
│   ├── logo.svg
│   ├── profile.jpg
│   ├── hero-mockup.png
│   └── projects/
└── README.md
```

## 🎨 Fonctionnalités

### Navigation
- Menu responsive avec hamburger sur mobile/tablette
- Menu horizontal sur desktop
- Indicateur de page active
- Smooth scroll vers les sections

### Page d'Accueil
- Hero section avec présentation
- Bouton "About Me" avec scroll fluide
- Section About avec photo et biographie
- Call-to-action pour collaboration

### Portfolio
- Grille de projets responsive
- Navigation entre projets (Previous/Next)
- Pages détaillées avec screenshots et descriptions
- Lien vers sites live (si disponibles)

### Contact
- Formulaire avec validation en temps réel
- Messages d'erreur contextuels :
  - "Ce champ est obligatoire" (champ vide)
  - "Veuillez utiliser une adresse e-mail valide" (email invalide)
- États de focus et hover pour accessibilité

### Responsive Design
- **Mobile** (< 768px) : Menu hamburger, layout vertical
- **Tablette** (768px - 1109px) : Layout adapté
- **Desktop** (≥ 1110px) : Layout horizontal, max-width 1110px

## 🚀 Installation et Utilisation

### Prérequis
- Un navigateur moderne (Chrome, Firefox, Safari, Edge)
- Un serveur local (Live Server, Python HTTP server, etc.)

### Installation

1. Cloner ou télécharger le projet
```bash
git clone [url-du-repo]
cd portfolio-alex-spencer
```

2. Lancer un serveur local
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server

# Avec VS Code Live Server
# Clic droit sur index.html > Open with Live Server
```

3. Ouvrir dans le navigateur
```
http://localhost:8000
```

## 📝 Variables CSS Principales

```css
:root {
  /* Couleurs */
  --color-primary: #33323D;      /* Texte principal */
  --color-secondary: #FAFAFA;    /* Fond clair */
  --color-accent: #5FB4A2;       /* Accent vert/bleu */
  --color-error: #F43030;        /* Messages d'erreur */
  
  /* Typographie */
  --font-primary: 'Ibarra Real Nova', serif;
  --font-secondary: 'Public Sans', sans-serif;
  
  /* Espacements */
  --spacing-xs: 0.5rem;   /* 8px */
  --spacing-sm: 1rem;     /* 16px */
  --spacing-md: 2rem;     /* 32px */
  --spacing-lg: 3rem;     /* 48px */
  --spacing-xl: 5rem;     /* 80px */
}
```

## ✅ Checklist de Développement

### HTML
- [x] Structure sémantique (header, nav, main, section, footer)
- [x] Attributs ARIA pour accessibilité
- [x] Meta tags appropriés

### CSS
- [x] Mobile-first responsive design
- [x] Variables CSS pour cohérence
- [x] Convention BEM respectée
- [x] Tous les états interactifs (hover, focus, active)

### JavaScript
- [x] Validation du formulaire complète
- [x] Menu mobile fonctionnel
- [x] Smooth scroll implémenté
- [x] Aucune erreur console

### Accessibilité
- [x] Navigation au clavier fonctionnelle
- [x] Contraste WCAG AA respecté
- [x] Focus visible sur tous les éléments interactifs
- [x] Alt text sur toutes les images

### Responsive
- [x] Testé sur mobile (< 768px)
- [x] Testé sur tablette (768px - 1109px)
- [x] Testé sur desktop (≥ 1110px)

## 🎨 Design Tokens

### Palette de Couleurs
- **Primary Dark**: `#33323D` - Texte, headers
- **Light Gray**: `#FAFAFA` - Backgrounds
- **Accent Teal**: `#5FB4A2` - CTAs, liens
- **Medium Gray**: `#828282` - Texte secondaire
- **Red Error**: `#F43030` - Messages d'erreur
- **White**: `#FFFFFF` - Fond principal

### Typographie
- **Headings**: Ibarra Real Nova (Serif)
  - H1: 50px / 700
  - H2: 40px / 700
  - H3: 32px / 400
- **Body**: Public Sans (Sans-serif)
  - Regular: 16px / 400
  - Small: 13px / 400

### Breakpoints
```css
/* Mobile */
@media (max-width: 767px) { }

/* Tablette */
@media (min-width: 768px) and (max-width: 1109px) { }

/* Desktop */
@media (min-width: 1110px) { }
```

## 📧 Formulaire de Contact

### Validations
1. **Nom** : Obligatoire, minimum 2 caractères
2. **Email** : Obligatoire, format valide (regex)
3. **Message** : Obligatoire, minimum 10 caractères

### Messages d'Erreur
- Champ vide : "Ce champ est obligatoire"
- Email invalide : "Veuillez utiliser une adresse e-mail valide"
- Message trop court : "Le message doit contenir au moins 10 caractères"

### Comportement
- Validation en temps réel au blur
- Effacement des erreurs à la correction
- Soumission bloquée si erreurs présentes
- Message de succès après soumission valide

## 🔍 Tests

### Navigateurs à Tester
- Chrome (dernière version)
- Firefox (dernière version)
- Safari (dernière version)
- Edge (dernière version)

### Devices à Tester
- iPhone (375px)
- iPad (768px)
- Desktop (1440px)

### Checklist de Tests
- [x] Navigation fonctionnelle sur tous devices
- [x] Formulaire validation opérationnelle
- [x] Images chargées correctement
- [x] Smooth scroll fonctionnel
- [x] Menu hamburger opérationnel
- [x] Tous les liens fonctionnent
- [x] Aucune erreur console

## 📚 Ressources

### Fonts
- [Ibarra Real Nova](https://fonts.google.com/specimen/Ibarra+Real+Nova) (Google Fonts)
- [Public Sans](https://fonts.google.com/specimen/Public+Sans) (Google Fonts)

### Icônes
- Logo : SVG custom
- Social icons : GitHub, Twitter, LinkedIn (SVG)
- Hamburger menu : CSS pur

### Validation
- [W3C HTML Validator](https://validator.w3.org/)
- [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)
- [WAVE Accessibility Tool](https://wave.webaim.org/)

## 🤝 Contribution

Ce projet est un portfolio personnel. Pour toute suggestion d'amélioration :
1. Ouvrir une issue
2. Décrire la suggestion
3. Proposer une solution

## 📄 License

© 2024 Alex Spencer. Tous droits réservés.

## 📞 Contact

**Alex Spencer**
- Email: alex@example.com
- GitHub: [@alexspencer](https://github.com/alexspencer)
- LinkedIn: [Alex Spencer](https://linkedin.com/in/alexspencer)

---

**Note :** Ce README sera mis à jour au fur et à mesure du développement du projet.
