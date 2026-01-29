# 🏗️ Fresh Lab'O - Architecture V2 (Modulaire)

## 🎯 Vue d'Ensemble

Architecture améliorée avec une **page d'accueil centrale** qui redirige vers des pages dédiées pour chaque service et fonctionnalité.

---

## 📐 Structure Modulaire

```
fresh-labo/
├── src/
│   ├── app/
│   │   ├── page.tsx                          # 🏠 PAGE D'ACCUEIL PRINCIPALE
│   │   ├── layout.tsx                        # Layout global
│   │   │
│   │   ├── services/                         # 📦 PAGES SERVICES
│   │   │   ├── page.tsx                      # Liste tous les services
│   │   │   ├── matelas/
│   │   │   │   ├── page.tsx                  # Page dédiée Matelas
│   │   │   │   └── booking/page.tsx          # Réservation Matelas
│   │   │   ├── vehicules/
│   │   │   │   ├── page.tsx                  # Page dédiée Véhicules
│   │   │   │   └── booking/page.tsx          # Réservation Véhicules
│   │   │   ├── tapis/
│   │   │   │   ├── page.tsx                  # Page dédiée Tapis
│   │   │   │   └── booking/page.tsx          # Réservation Tapis
│   │   │   └── canapes/
│   │   │       ├── page.tsx                  # Page dédiée Canapés
│   │   │       └── booking/page.tsx          # Réservation Canapés
│   │   │
│   │   ├── booking/                          # 📅 PROCESSUS RÉSERVATION
│   │   │   ├── estimate/page.tsx             # Estimation rapide
│   │   │   ├── calendar/page.tsx             # Choix date/heure
│   │   │   ├── confirmation/page.tsx         # Confirmation détails
│   │   │   └── success/page.tsx              # Réservation validée
│   │   │
│   │   ├── about/                            # 💡 PAGES INFORMATIVES
│   │   │   ├── page.tsx                      # À propos
│   │   │   ├── how-it-works/page.tsx         # Comment ça marche
│   │   │   ├── pricing/page.tsx              # Grille tarifaire
│   │   │   └── faq/page.tsx                  # FAQ
│   │   │
│   │   ├── contact/                          # 📞 CONTACT
│   │   │   └── page.tsx                      # Formulaire contact
│   │   │
│   │   ├── dashboard/                        # 👤 ESPACE CLIENT
│   │   │   ├── page.tsx                      # Vue d'ensemble
│   │   │   ├── bookings/page.tsx             # Mes réservations
│   │   │   ├── profile/page.tsx              # Mon profil
│   │   │   └── history/page.tsx              # Historique
│   │   │
│   │   ├── (auth)/                           # 🔐 AUTHENTIFICATION
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── forgot-password/page.tsx
│   │   │
│   │   └── api/                              # 🔌 API ROUTES
│   │       ├── services/route.ts
│   │       ├── bookings/
│   │       │   ├── create/route.ts
│   │       │   ├── [id]/route.ts
│   │       │   └── cancel/route.ts
│   │       ├── calendar/
│   │       │   ├── availability/route.ts
│   │       │   └── create-event/route.ts
│   │       ├── estimates/route.ts
│   │       └── contact/route.ts
│   │
│   ├── components/
│   │   ├── home/                             # Composants page d'accueil
│   │   │   ├── Hero.tsx
│   │   │   ├── ServicesGrid.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── CTASection.tsx
│   │   │
│   │   ├── services/                         # Composants services
│   │   │   ├── ServiceHero.tsx
│   │   │   ├── ServiceDetails.tsx
│   │   │   ├── PricingTable.tsx
│   │   │   ├── BeforeAfter.tsx
│   │   │   └── ServiceCTA.tsx
│   │   │
│   │   ├── booking/                          # Composants réservation
│   │   │   ├── ServiceSelector.tsx
│   │   │   ├── OptionsConfigurator.tsx
│   │   │   ├── PriceEstimator.tsx
│   │   │   ├── ClientForm.tsx
│   │   │   ├── CalendarPicker.tsx
│   │   │   └── BookingSummary.tsx
│   │   │
│   │   ├── layout/                           # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileMenu.tsx
│   │   │
│   │   ├── ui/                               # Design system
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   │
│   │   └── common/                           # Composants communs
│   │       ├── Bubbles.tsx                   # Animation bulles
│   │       ├── SectionTitle.tsx
│   │       └── StatsCounter.tsx
│   │
│   └── lib/
│       ├── navigation.ts                     # Routes & navigation
│       └── ...
```

---

## 🏠 PAGE D'ACCUEIL - Structure Détaillée

### Sections (dans l'ordre)

#### 1. **Hero Section** (Fullscreen)
- Fond dégradé bleu nuit avec bulles animées
- Logo Fresh Lab'O centré
- Titre accrocheur: "Rafraîchissez vos espaces avec notre service de lavage professionnel"
- Sous-titre: "Des prix Fresh pour un résultat impeccable"
- 2 CTA:
  - **Principal**: "Réserver maintenant" → `/booking/estimate`
  - **Secondaire**: "Découvrir nos services" → scroll vers section services

#### 2. **Services Grid** (4 cartes interactives)
Chaque carte redirige vers sa page dédiée:

```tsx
Matelas → /services/matelas
Véhicules → /services/vehicules
Tapis → /services/tapis
Canapés → /services/canapes
```

**Contenu de chaque carte:**
- Icon emoji (🛏️, 🚗, 🧵, 🛋️)
- Nom du service
- Description courte (1 ligne)
- Prix "À partir de X€"
- Hover: effet scale + shadow + preview image
- Click: redirect vers page service

#### 3. **How It Works** (3 étapes)
```
1. Choisissez → 2. Réservez → 3. Profitez
```
- Icons illustrés
- Texte explicatif court
- Design moderne avec timeline visuelle

#### 4. **Why Choose Us** (3 USPs)
- ✨ Experts du nettoyage professionnel
- 💰 Prix transparents et compétitifs
- ⚡ Intervention rapide et efficace

#### 5. **Stats Section** (Nombres clés)
```
500+ Clients satisfaits
1000+ Interventions
4,9/5 Note moyenne
```
Avec animations counter au scroll

#### 6. **Testimonials** (Avis clients)
Carousel avec 3 avis (design cards élégantes)

#### 7. **CTA Final Section**
- "Prêt à rafraîchir vos espaces ?"
- Grand bouton "Réserver maintenant"
- Infos contact: 📞 06 95 05 77 96

#### 8. **Footer** (Complet)
- Logo + slogan
- Liens navigation (Services, À propos, Contact)
- Liens services (Matelas, Véhicules, Tapis, Canapés)
- Informations légales
- Réseaux sociaux
- Copyright

---

## 📦 PAGES SERVICES - Template

Chaque service a sa propre page suivant ce template:

### `/services/matelas/page.tsx` (exemple)

#### Structure:
1. **Hero Service**
   - Image de fond (matelas propre)
   - Titre: "Nettoyage Professionnel de Matelas"
   - Breadcrumb: Accueil > Services > Matelas

2. **Présentation**
   - Texte descriptif du service
   - Pourquoi nettoyer son matelas
   - Bénéfices (hygiène, durée de vie, santé)

3. **Pricing Table**
   ```
   1 Face: 60€
   2 Faces: 80€ (+30€ si King Size)
   ```
   Tableau clair avec détails

4. **Process Explained** (Comment on procède)
   - Aspiration
   - Injection produit
   - Extraction salissures
   - Séchage
   Avec icons et timeline

5. **Before/After Gallery**
   Slider d'images avant/après impressionnantes

6. **FAQ Service**
   Questions spécifiques au service

7. **CTA Booking**
   Grand bouton orange: "Réserver ce service"
   → `/services/matelas/booking`

8. **Related Services**
   Suggestions: "Vous pourriez aussi aimer..."
   - Canapés
   - Tapis

---

## 📅 FLOW DE RÉSERVATION

### Parcours Utilisateur

#### Option A: Depuis la page d'accueil
```
Home → Click "Réserver maintenant"
↓
/booking/estimate (Sélection rapide service)
↓
/booking/calendar (Choix date)
↓
/booking/confirmation (Formulaire + récap)
↓
/booking/success (Confirmation)
```

#### Option B: Depuis une page service
```
/services/matelas → Click "Réserver ce service"
↓
/services/matelas/booking (Options spécifiques)
↓
/booking/calendar (Choix date)
↓
/booking/confirmation (Formulaire + récap)
↓
/booking/success (Confirmation)
```

### Pages de Réservation

#### `/booking/estimate`
- Sélecteur de service (4 grandes cartes)
- Configurateur simple pour obtenir estimation
- Affichage prix en temps réel
- Bouton "Continuer" → calendar

#### `/services/[service]/booking`
- Hérite de la page service
- Configurateur détaillé avec toutes les options
- Calcul prix dynamique
- Visualisation choix
- Bouton "Choisir une date"

#### `/booking/calendar`
- Intégration Google Calendar
- Vue calendrier avec disponibilités
- Sélection date + créneau (matin/après-midi)
- Bouton "Confirmer"

#### `/booking/confirmation`
- Récapitulatif complet
- Formulaire informations client
- Adresse (avec Google Places autocomplete)
- Notes spéciales
- Prix final affiché
- Bouton "Valider la réservation"

#### `/booking/success`
- Animation de succès ✅
- Numéro de réservation
- Récapitulatif détaillé
- "Ajouté à votre calendrier Google"
- Email confirmation envoyé
- Boutons:
  - "Voir ma réservation" → dashboard
  - "Retour à l'accueil" → home
  - "Réserver un autre service"

---

## 🧭 NAVIGATION

### Header (Desktop)
```
[Logo Fresh Lab'O]  Services  À propos  Tarifs  Contact  |  Mon Compte  Réserver
```

**Dropdown "Services":**
- Matelas
- Véhicules
- Tapis
- Canapés
- → Voir tous les services

### Header (Mobile)
```
[☰ Menu]  [Logo]  [🔍 Réserver]
```

**Menu mobile:**
- Accueil
- Services
  - Matelas
  - Véhicules
  - Tapis
  - Canapés
- À propos
- Tarifs
- Contact
- Mon Compte
- **RÉSERVER** (CTA gros bouton)

### Footer Navigation
```
SERVICES        À PROPOS         CONTACT
- Matelas       - Qui sommes-nous - 06 95 05 77 96
- Véhicules     - Comment ça marche - contact@freshlabo.com
- Tapis         - FAQ              - Paris & Île-de-France
- Canapés       - CGV
                - Mentions légales
```

---

## 🎨 DESIGN SYSTEM - Pages

### Cohérence Visuelle

**Chaque page suit:**
1. Hero section avec image/gradient de fond
2. Breadcrumb navigation
3. Contenu principal (max-width: 1200px, centered)
4. Sections alternées (blanc/gris léger)
5. CTA section avant footer
6. Footer identique partout

### Couleurs par Type de Page

**Pages Services:**
- Hero: Gradient bleu nuit → bleu marine
- Accents: Orange pour CTA
- Cards: Blanc avec ombre cyan

**Pages Booking:**
- Background: Gris très léger
- Cards: Blanc avec border cyan
- Progress bar: Gradient cyan
- Prix: Orange bold

**Pages Info:**
- Background: Blanc
- Sections alternées: Gris 50
- Accents: Cyan pour liens

---

## 📱 RESPONSIVE

### Breakpoints

- **Mobile**: < 768px
  - Stack vertical
  - Menu hamburger
  - 1 colonne
  - Touch-friendly buttons (min 44px)

- **Tablet**: 768px - 1024px
  - 2 colonnes pour services grid
  - Navigation adaptée

- **Desktop**: > 1024px
  - Mise en page complète
  - Hover effects
  - 4 colonnes pour services

---

## 🔗 ROUTES COMPLÈTES

### Pages Publiques
```
/                           → Page d'accueil
/services                   → Liste tous les services
/services/matelas           → Page Matelas
/services/vehicules         → Page Véhicules
/services/tapis             → Page Tapis
/services/canapes           → Page Canapés
/about                      → À propos
/about/how-it-works         → Comment ça marche
/about/pricing              → Grille tarifaire
/about/faq                  → FAQ
/contact                    → Contact
```

### Pages Réservation
```
/booking/estimate           → Estimation rapide
/services/[service]/booking → Réservation service spécifique
/booking/calendar           → Choix date
/booking/confirmation       → Confirmation
/booking/success            → Succès
```

### Pages Authentifiées
```
/login                      → Connexion
/register                   → Inscription
/dashboard                  → Dashboard client
/dashboard/bookings         → Mes réservations
/dashboard/profile          → Mon profil
/dashboard/history          → Historique
```

### API Routes
```
GET    /api/services                → Liste services
GET    /api/services/[id]           → Détail service
POST   /api/bookings/create         → Créer réservation
GET    /api/bookings/[id]           → Détail réservation
PUT    /api/bookings/[id]/cancel    → Annuler réservation
GET    /api/calendar/availability   → Disponibilités
POST   /api/calendar/create-event   → Créer event
POST   /api/estimates               → Sauvegarder estimation
POST   /api/contact                 → Envoyer message contact
```

---

## 🚀 PRIORITÉS DÉVELOPPEMENT V2

### Sprint 1: Foundation + Navigation (5 jours)
1. Setup projet
2. Design system (composants UI)
3. Header + Footer + Navigation
4. Layout de base
5. Système de routing

### Sprint 2: Page d'Accueil (4 jours)
1. Hero section avec animations
2. Services Grid interactive
3. How It Works section
4. Why Choose Us section
5. Stats + Testimonials
6. CTA sections
7. Responsive complet

### Sprint 3: Pages Services (5 jours)
1. Template page service
2. Page Matelas complète
3. Page Véhicules complète
4. Page Tapis complète
5. Page Canapés complète
6. Pricing tables
7. Before/After galleries

### Sprint 4: Flow Réservation (7 jours)
1. Page estimate
2. Pages booking par service
3. Calendar integration
4. Confirmation page
5. Success page
6. Calcul prix dynamique
7. Form validation

### Sprint 5: Backend + Integration (6 jours)
1. API routes
2. Supabase integration
3. Google Calendar sync
4. Email notifications
5. Error handling
6. Loading states

### Sprint 6: Dashboard + Auth (4 jours)
1. Login/Register
2. Dashboard overview
3. Bookings list
4. Profile page
5. Cancel booking

### Sprint 7: Pages Info + Polish (4 jours)
1. About pages
2. FAQ
3. Contact form
4. SEO optimization
5. Performance optimization
6. Bug fixes
7. Final testing

**Total: 35 jours (~7 semaines)**

---

## ✨ AMÉLIORATIONS V2

### Vs Version Précédente:

✅ **Navigation claire**: Menu structuré avec dropdown
✅ **Pages dédiées**: Chaque service a sa landing page
✅ **Multiple entry points**: Home OU page service → booking
✅ **SEO optimisé**: Pages séparées indexables
✅ **Expérience utilisateur**: Parcours logiques et intuitifs
✅ **Scalabilité**: Facile d'ajouter de nouveaux services
✅ **Content marketing**: Pages informatives pour attirer trafic
✅ **Conversion optimisée**: CTA à chaque étape clé

---

## 📊 ANALYTICS & TRACKING

### Events à Tracker

**Page d'accueil:**
- `hero_cta_click`: Click CTA principal
- `service_card_click`: Click carte service
- `scroll_to_services`: Scroll vers services

**Pages services:**
- `service_page_view`: Vue page service
- `pricing_table_view`: Vue grille tarifaire
- `booking_cta_click`: Click "Réserver ce service"

**Flow réservation:**
- `booking_started`: Début réservation
- `service_selected`: Service choisi
- `date_selected`: Date sélectionnée
- `booking_confirmed`: Réservation confirmée
- `booking_cancelled`: Réservation annulée

**Navigation:**
- `menu_opened`: Menu mobile ouvert
- `footer_link_click`: Click lien footer
- `contact_click`: Click contact

---

Cette architecture V2 est **beaucoup plus professionnelle** et **scalable**. Elle offre une meilleure expérience utilisateur avec des pages dédiées pour chaque service, tout en gardant le flow de réservation fluide et intuitif ! 🚀✨
