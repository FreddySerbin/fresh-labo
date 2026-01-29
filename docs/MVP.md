# Fresh Lab'O - MVP Specification

## 🎯 Vision du MVP

Créer une plateforme de réservation en ligne simple et efficace permettant aux clients de Fresh Lab'O de réserver facilement un service de nettoyage professionnel, obtenir une estimation de prix instantanée, et planifier leur intervention via Google Calendar.

## 📊 Objectifs Business

1. **Réduire le temps de réservation** de 15 minutes (téléphone) à 3 minutes (en ligne)
2. **Augmenter les conversions** avec estimation instantanée et transparente
3. **Optimiser la planification** via synchronisation Google Calendar
4. **Professionnaliser l'image** avec une présence digitale moderne
5. **Capturer les données clients** pour marketing futur

## 👥 Personas Utilisateurs

### Client Particulier (Priorité 1)
- **Marie, 35 ans**, mère de famille, appartement Paris
- Besoin: Nettoyer canapé après fête d'anniversaire enfant
- Pain points: Pas le temps d'appeler, veut prix avant engagement
- Motivation: Rapidité, transparence, booking flexible

### Client Professionnel (Priorité 2)
- **Thomas, 42 ans**, gérant hôtel boutique
- Besoin: Nettoyage matelas régulier (10 chambres)
- Pain points: Gestion planning complexe, devis multiples
- Motivation: Fiabilité, facturation claire, suivi interventions

## 🛣️ User Journey - MVP

### 1. Découverte (Landing Page)
```
Arrivée → Hero impactant → Services aperçu → CTA "Réserver maintenant"
```

**Éléments clés:**
- Hero avec slogan fort + visuel avant/après
- Section "Nos Services" (4 cartes interactives)
- Section "Pourquoi Fresh Lab'O" (3 USPs)
- Section "Comment ça marche" (3 étapes)
- Footer avec contact et réseaux sociaux

### 2. Sélection Service
```
Catégories → Choix service spécifique → Options/configurations
```

**Flow interactif:**
```
[Matelas] → Combien de faces? → Quelle taille?
[Véhicule] → Type véhicule? → Prestations?
[Tapis] → Quelle dimension? → Combien de tapis?
[Canapé] → Type? → Nombre de places?
```

### 3. Configuration & Estimation
```
Options sélectionnées → Calcul temps réel → Récapitulatif détaillé
```

**Affichage estimation:**
- Prix par ligne item
- Total TTC en grand
- Temps d'intervention estimé
- Badge "Prix Fresh" (garantie prix compétitif)

### 4. Informations Client
```
Formulaire coordonnées → Adresse intervention → Notes spéciales
```

**Champs requis:**
- Nom complet
- Email
- Téléphone
- Adresse complète
- Code accès / Étage (optionnel)
- Instructions spéciales (optionnel)

### 5. Choix Date & Heure
```
Calendar picker → Créneaux disponibles → Sélection
```

**Intégration Google Calendar:**
- Affichage disponibilités temps réel
- Créneaux par ½ journée (matin/après-midi)
- Blocage créneaux complets automatique
- Suggestion créneaux proches si indisponible

### 6. Confirmation
```
Récapitulatif complet → Validation → Confirmation visuelle + Email
```

**Page de confirmation:**
- Message succès avec animation
- Récapitulatif réservation
- Event ajouté à Google Calendar
- Email confirmation envoyé
- Prochaines étapes expliquées

### 7. Gestion Réservations (Basique)
```
"Mes réservations" → Liste bookings → Détails → Annuler (si > 48h)
```

## 🎨 Design System - MVP

### Composants UI Essentiels

#### 1. Buttons
```tsx
Primary: Cyan gradient, shadow, hover scale
Secondary: Orange outline, hover fill
Danger: Red, confirmation required
Ghost: Transparent, hover bg
```

#### 2. Cards
```tsx
Service Card: Image, titre, from price, hover effect
Summary Card: Border cyan, shadow, info structurée
```

#### 3. Forms
```tsx
Input: Border subtle, focus cyan glow, label floating
Select: Custom dropdown avec icons
DatePicker: Calendar visual avec disponibilités
```

#### 4. Navigation
```tsx
Header: Logo left, nav center, CTA right, sticky
Mobile: Hamburger menu avec animation
```

#### 5. Feedback
```tsx
Toast: Success (green), Error (red), Info (blue)
Loading: Spinner cyan avec bulles animées
Modal: Overlay blur, card centrée, close ESC
```

### Pages Layouts

#### Landing Page
```
[Header sticky]
[Hero fullscreen - gradient + bubbles]
[Services Grid - 4 cards]
[How It Works - 3 steps]
[Why Us - 3 USPs]
[CTA Section - booking]
[Footer]
```

#### Booking Flow
```
[Header minimal]
[Progress Bar - 4 steps]
[Content Area - centré max 800px]
[Navigation - Previous/Next]
```

#### Dashboard
```
[Header]
[Sidebar - nav sections]
[Main - content dynamique]
```

## 🔧 Features Détaillées

### F1: Landing Page
**Description:** Page d'accueil attractive présentant Fresh Lab'O

**User Stories:**
- En tant que visiteur, je veux comprendre les services en < 5 secondes
- En tant que visiteur, je veux facilement naviguer vers la réservation
- En tant que visiteur, je veux voir des preuves sociales (testimonials futurs)

**Acceptance Criteria:**
- [ ] Hero visible above fold avec CTA clair
- [ ] 4 services visibles en grid responsive
- [ ] Section "Comment ça marche" avec 3 étapes illustrées
- [ ] Footer avec coordonnées et lien calendrier
- [ ] Temps chargement < 2s
- [ ] Mobile responsive parfait
- [ ] Animations subtiles (pas trop)

### F2: Système d'Estimation
**Description:** Calculateur de prix dynamique basé sur sélections

**User Stories:**
- En tant que client, je veux voir le prix se mettre à jour en temps réel
- En tant que client, je veux comprendre comment le prix est calculé
- En tant que client, je veux modifier mes sélections facilement

**Acceptance Criteria:**
- [ ] Prix s'actualise à chaque changement
- [ ] Détails prix affichés (base + options)
- [ ] Temps intervention estimé affiché
- [ ] Possibilité revenir en arrière sans perdre données
- [ ] Validation options (ex: min 1 article)
- [ ] Affichage "Prix Fresh" badge

**Logique Calcul:**
```typescript
Prix Final = Prix Base Service + Σ(Prix Options) + Frais Déplacement (si > 15km)

Exemples:
- Canapé 3 places: 80€ (base)
- Matelas 2 faces King: 80€ (base) + 25€ (2 faces) + 30€ (King) = 135€
- Véhicule Berline Intérieur complet: 55€
```

### F3: Intégration Google Calendar
**Description:** Synchronisation bidirectionnelle avec Google Calendar

**User Stories:**
- En tant que admin, je veux que mes disponibilités soient synchronisées automatiquement
- En tant que client, je veux voir uniquement les créneaux disponibles
- En tant que admin, je veux recevoir les réservations dans mon calendar
- En tant que client, je veux recevoir un event calendar dans mon email

**Acceptance Criteria:**
- [ ] Connexion OAuth2 Google Calendar (admin setup)
- [ ] Lecture disponibilités temps réel
- [ ] Création event lors confirmation booking
- [ ] Envoi invitation email client avec .ics
- [ ] Update event si modification booking
- [ ] Delete event si annulation booking
- [ ] Gestion timezone correcte (Paris)
- [ ] Retry logic si API Google down

**Configuration Requise:**
```env
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_CALENDAR_ID=xxx
GOOGLE_REDIRECT_URI=xxx
```

### F4: Formulaire Réservation
**Description:** Collecte informations client avec validation

**User Stories:**
- En tant que client, je veux remplir un formulaire simple et rapide
- En tant que client, je veux voir mes erreurs clairement
- En tant que client, je veux pouvoir sauvegarder et continuer plus tard

**Acceptance Criteria:**
- [ ] Validation temps réel avec messages explicites
- [ ] Auto-completion adresse (Google Places API)
- [ ] Sauvegarde locale brouillon (localStorage)
- [ ] Protection spam (hCaptcha léger)
- [ ] Format téléphone français automatique
- [ ] Email validation avec regex
- [ ] Champs obligatoires marqués clairement

### F5: Système de Confirmation
**Description:** Confirmation visuelle et email après réservation

**User Stories:**
- En tant que client, je veux une confirmation immédiate et rassurante
- En tant que client, je veux recevoir un email avec tous les détails
- En tant que admin, je veux être notifié des nouvelles réservations

**Acceptance Criteria:**
- [ ] Page confirmation avec animation succès
- [ ] Numéro réservation unique généré
- [ ] Récapitulatif complet affiché
- [ ] Email confirmation client (transactionnel)
- [ ] Email notification admin
- [ ] Event Google Calendar créé
- [ ] Possibilité télécharger récapitulatif PDF
- [ ] Bouton "Ajouter une autre réservation"

**Template Email Client:**
```
Subject: ✅ Votre réservation Fresh Lab'O #FR-2024-001

Bonjour [Nom],

Votre réservation est confirmée !

📅 Date: [Date] à [Heure]
🧼 Service: [Service détaillé]
📍 Adresse: [Adresse]
💰 Total: [Prix]€ TTC

Un membre de notre équipe arrivera dans la créneau horaire indiqué.
Vous recevrez un rappel 24h avant l'intervention.

Des questions ? Répondez à cet email ou appelez le 06 95 05 77 96

À bientôt,
L'équipe Fresh Lab'O
```

### F6: Espace "Mes Réservations"
**Description:** Dashboard client basique pour voir et gérer réservations

**User Stories:**
- En tant que client, je veux voir l'historique de mes réservations
- En tant que client, je veux pouvoir annuler une réservation (conditions)
- En tant que client, je veux voir le statut de ma réservation

**Acceptance Criteria:**
- [ ] Login/Register simple (email + password)
- [ ] Liste réservations (futures + passées)
- [ ] Filtres: Toutes / À venir / Complétées / Annulées
- [ ] Card réservation avec infos clés
- [ ] Bouton "Annuler" si > 48h avant intervention
- [ ] Modal confirmation annulation
- [ ] Statut visuel (badge coloré)
- [ ] Possibilité télécharger facture (post-intervention)

**Statuts Réservation:**
- `pending`: En attente confirmation admin
- `confirmed`: Confirmée, dans calendar
- `in_progress`: Intervention en cours
- `completed`: Terminée
- `cancelled`: Annulée (par client ou admin)

## 🗄️ Schema Base de Données

```sql
-- USERS (Supabase Auth extended)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- SERVICES
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL CHECK (category IN ('matelas', 'vehicule', 'tapis', 'canape')),
  name TEXT NOT NULL,
  description TEXT,
  base_price DECIMAL(10,2) NOT NULL,
  estimated_duration INTEGER, -- minutes
  image_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- SERVICE OPTIONS
CREATE TABLE service_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price_modifier DECIMAL(10,2) NOT NULL, -- peut être négatif pour remise
  option_type TEXT NOT NULL, -- 'size', 'sides', 'vehicle_type', 'treatment'
  created_at TIMESTAMP DEFAULT NOW()
);

-- BOOKINGS
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_number TEXT UNIQUE NOT NULL, -- FR-2024-001
  user_id UUID REFERENCES users(id),
  service_id UUID REFERENCES services(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  scheduled_date TIMESTAMP NOT NULL,
  estimated_price DECIMAL(10,2) NOT NULL,
  final_price DECIMAL(10,2),
  address TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  city TEXT NOT NULL,
  access_code TEXT,
  special_notes TEXT,
  google_calendar_event_id TEXT,
  cancelled_at TIMESTAMP,
  cancellation_reason TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- BOOKING OPTIONS (many-to-many)
CREATE TABLE booking_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  option_id UUID REFERENCES service_options(id),
  quantity INTEGER DEFAULT 1,
  price_at_booking DECIMAL(10,2) NOT NULL -- snapshot prix au moment réservation
);

-- ESTIMATES (pour tracking conversions)
CREATE TABLE estimates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT, -- pour tracking anonymous
  user_email TEXT,
  service_category TEXT NOT NULL,
  estimated_price DECIMAL(10,2) NOT NULL,
  options JSONB, -- détails sélections
  converted_to_booking UUID REFERENCES bookings(id),
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- INDEXES
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_scheduled_date ON bookings(scheduled_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_estimates_session_id ON estimates(session_id);
CREATE INDEX idx_estimates_converted ON estimates(converted_to_booking);

-- RLS POLICIES
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Users can only see their own bookings
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own bookings
CREATE POLICY "Users can create own bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own pending bookings
CREATE POLICY "Users can update own pending bookings"
  ON bookings FOR UPDATE
  USING (auth.uid() = user_id AND status = 'pending');
```

## 🚀 Plan de Développement

### Sprint 1: Foundation (5 jours)
**Objectif:** Setup projet + design system

- [ ] Initialiser Next.js + TypeScript + Tailwind
- [ ] Configurer Supabase project
- [ ] Créer design system (composants UI de base)
- [ ] Setup Google Calendar OAuth
- [ ] Créer schema DB + migrations
- [ ] Seed data services/options
- [ ] Configurer ESLint + Prettier
- [ ] Setup Git repository

**Livrables:**
- Projet initialisé
- Composants UI testables (Storybook recommandé)
- DB configurée avec données test

### Sprint 2: Landing Page (3 jours)
**Objectif:** Page d'accueil attractive

- [ ] Hero section avec animations bulles
- [ ] Services grid avec hover effects
- [ ] Section "Comment ça marche"
- [ ] Section "Pourquoi nous choisir"
- [ ] Footer complet
- [ ] Responsive mobile parfait
- [ ] Optimisation performance (Lighthouse > 90)

**Livrables:**
- Landing page déployée
- Assets optimisés
- Analytics setup (Google Analytics 4)

### Sprint 3: Booking Flow (7 jours)
**Objectif:** Parcours réservation complet

- [ ] Page sélection service avec catégories
- [ ] Configurateurs pour chaque service
- [ ] Système calcul estimation temps réel
- [ ] Formulaire informations client
- [ ] Intégration Google Places API (adresse)
- [ ] Validation formulaires (Zod)
- [ ] Navigation flow avec progress bar
- [ ] Sauvegarde brouillon localStorage

**Livrables:**
- Flow booking fonctionnel
- Tests unitaires calculs prix
- Validation complète

### Sprint 4: Calendar & Confirmation (5 jours)
**Objectif:** Finaliser réservation

- [ ] Date picker avec disponibilités
- [ ] Intégration Google Calendar API
- [ ] Page confirmation avec récap
- [ ] Email transactionnel (Resend ou SendGrid)
- [ ] Génération PDF récapitulatif
- [ ] Notification admin (email + Slack webhook)
- [ ] Tests E2E parcours complet

**Livrables:**
- Système réservation end-to-end
- Emails fonctionnels
- Calendar sync opérationnel

### Sprint 5: User Dashboard (4 jours)
**Objectif:** Gestion réservations client

- [ ] Système auth Supabase (login/register)
- [ ] Page "Mes réservations"
- [ ] Liste bookings avec filtres
- [ ] Détail réservation
- [ ] Fonctionnalité annulation
- [ ] Téléchargement factures
- [ ] Responsive mobile

**Livrables:**
- Dashboard client fonctionnel
- Auth sécurisée
- Tests d'intégration

### Sprint 6: Polish & Launch (5 jours)
**Objectif:** Préparation production

- [ ] Corrections bugs
- [ ] Optimisation performance
- [ ] Tests utilisateurs (5 personnes)
- [ ] Corrections feedback
- [ ] Documentation utilisateur
- [ ] Setup monitoring (Sentry)
- [ ] Configuration domaine + SSL
- [ ] Déploiement production (Vercel)
- [ ] Formation équipe Fresh Lab'O

**Livrables:**
- Application production-ready
- Documentation complète
- Formation équipe

## 📊 KPIs à Tracker (MVP)

### Acquisition
- Visiteurs uniques landing page
- Taux rebond landing page
- Source trafic (direct, Google, social)

### Conversion
- Taux démarrage booking (clics "Réserver")
- Taux complétion booking (confirmations / démarrages)
- Taux abandon par étape du flow
- Temps moyen complétion booking

### Engagement
- Nombre réservations / jour
- Panier moyen (prix moyen réservation)
- Services les plus populaires
- Créneaux horaires préférés

### Rétention
- Utilisateurs créant compte
- Clients récurrents (> 1 réservation)
- Taux annulation réservations

### Technique
- Temps chargement pages
- Taux erreurs API
- Disponibilité service (uptime)

**Outils:**
- Google Analytics 4 (gratuit)
- Vercel Analytics (inclus)
- Supabase Dashboard (métriques DB)
- Sentry (monitoring erreurs)

## 🎯 Critères de Succès MVP

Le MVP est considéré réussi si:

1. ✅ **Fonctionnel:** 95% parcours réservation sans erreurs
2. ✅ **Performance:** Lighthouse score > 90 toutes pages
3. ✅ **Conversion:** Minimum 20% des visiteurs démarrent réservation
4. ✅ **Completion:** Minimum 60% des réservations démarrées sont complétées
5. ✅ **Satisfaction:** Feedback positif de 5 utilisateurs test
6. ✅ **Technique:** 0 bugs critiques, < 5 bugs mineurs
7. ✅ **Mobile:** Expérience fluide sur iOS et Android

## 🚫 Out of Scope (Post-MVP)

### Phase 2
- Paiement en ligne (Stripe)
- Dashboard admin avancé
- Gestion équipe/techniciens
- Planning optimisé IA
- Système de reviews

### Phase 3
- Programme fidélité
- Codes promo
- Abonnements mensuels
- App mobile native
- Chat support temps réel

### Phase 4
- Multi-langues
- Multi-devises
- Franchise/multi-villes
- API publique
- Marketplace services additionnels

## 📞 Support & Maintenance

### Après lancement MVP
- **Hot fixes:** Réaction < 4h pour bugs critiques
- **Updates:** Déploiements hebdomadaires si nécessaire
- **Monitoring:** Alertes Sentry pour erreurs
- **Backup:** Snapshot Supabase quotidien
- **Support:** Email support@freshlabo.com (réponse < 24h)

### Documentation à maintenir
- README technique (setup développement)
- Guide utilisateur admin (gestion calendar)
- Guide utilisateur client (FAQ)
- API documentation (si ouverture future)

## 💰 Estimation Budget Technique (MVP)

### Services Cloud (mensuel)
- **Vercel Pro:** 20€/mois (recommandé vs Hobby gratuit)
- **Supabase Pro:** 25€/mois (2GB DB, Auth, Storage)
- **Resend Email:** 0€/mois (3000 emails/mois gratuits)
- **Google Calendar API:** Gratuit (quotas largement suffisants)
- **Domaine:** 15€/an
- **Total:** ~50€/mois

### Outils Développement
- Cursor IDE: Gratuit (version Pro optionnelle)
- Figma: Gratuit (version Starter)
- GitHub: Gratuit (repos publics/privés)
- Postman: Gratuit

### Coût Total MVP: ~150€ les 3 premiers mois
(Après: ~50€/mois récurrent)

---

## 🎉 Next Steps Immédiat

1. ✅ **Valider ce document** avec équipe Fresh Lab'O
2. 🔨 **Initialiser projet** technique (Sprint 1)
3. 🎨 **Designer maquettes** Figma (parallèle Sprint 1)
4. 🧑‍💻 **Développer** selon planning sprints
5. 🧪 **Tester** avec vrais utilisateurs
6. 🚀 **Lancer** MVP en production
7. 📊 **Analyser** données + itérer

**Timeline estimée:** 6 semaines développement + 1 semaine tests = 7 semaines total

Prêt à coder ? Let's build something fresh! 🧼✨
