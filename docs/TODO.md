# TODO - Fresh Lab'O Development

## 🚀 Sprint 1 : Authentification & Fondations (Semaine 1-2)

### Configuration Supabase
- [ ] Installer `@supabase/auth-helpers-nextjs` et `@supabase/supabase-js`
- [ ] Créer `src/lib/supabase/client.ts`
- [ ] Générer types TypeScript depuis Supabase
- [ ] Configurer variables d'environnement

### Auth Context
- [ ] Créer `src/contexts/AuthContext.tsx`
- [ ] Implémenter fonctions : signUp, signIn, signOut, resetPassword
- [ ] Gérer l'état de session
- [ ] Wrapper App dans AuthProvider

### Pages Authentification
- [ ] Créer `/auth/login` - Page de connexion
- [ ] Créer `/auth/register` - Page d'inscription  
- [ ] Créer `/auth/reset-password` - Réinitialisation
- [ ] Créer `/auth/callback` - Callback OAuth
- [ ] Ajouter validation Zod pour formulaires

### Middleware
- [ ] Créer `src/middleware.ts`
- [ ] Protéger les routes `/dashboard/*`
- [ ] Rediriger vers login si non authentifié

### API Routes - Profil
- [ ] Créer `src/app/api/profile/route.ts`
- [ ] GET - Récupérer profil utilisateur
- [ ] PUT - Mettre à jour profil
- [ ] Validation avec Zod

### Page Profil
- [ ] Créer `/dashboard/profile`
- [ ] Formulaire édition (nom, téléphone, adresse)
- [ ] Intégration React Hook Form
- [ ] Messages de succès/erreur

---

## 📅 Sprint 2 : Système de Réservation (Semaine 3-4)

### Zustand Store
- [ ] Créer `src/store/bookingStore.ts`
- [ ] Définir interface BookingState
- [ ] Implémenter actions (setService, addOption, etc.)
- [ ] Fonction calculateTotal()
- [ ] Persist middleware

### Validation Schemas
- [ ] Créer `src/lib/validations/booking.ts`
- [ ] Schema clientInfo (Zod)
- [ ] Schema booking complet
- [ ] Schema options

### Pages Flow Réservation

#### Page 1 - /booking/estimate
- [ ] Afficher service sélectionné
- [ ] Liste options disponibles avec prix
- [ ] Calcul temps réel du total
- [ ] Bouton "Continuer"

#### Page 2 - /booking/calendar
- [ ] Installer `react-calendar`
- [ ] Afficher calendrier interactif
- [ ] Désactiver dates passées
- [ ] Choix créneau (matin/après-midi)
- [ ] Vérifier disponibilité
- [ ] Bouton "Continuer"

#### Page 3 - /booking/info
- [ ] Formulaire informations client
- [ ] Pré-remplissage si connecté
- [ ] Champs adresse d'intervention
- [ ] Notes spéciales
- [ ] Validation formulaire

#### Page 4 - /booking/confirmation
- [ ] Récapitulatif complet
- [ ] Service + options
- [ ] Date + heure
- [ ] Adresse + prix total
- [ ] Checkbox CGV
- [ ] Bouton "Confirmer"

#### Page 5 - /booking/success
- [ ] Afficher numéro réservation
- [ ] Récapitulatif
- [ ] Liens vers dashboard
- [ ] Bouton "Ajouter au calendrier"

### API Routes - Réservations

#### POST /api/bookings
- [ ] Validation données entrée
- [ ] Vérifier authentification
- [ ] Créer booking dans Supabase
- [ ] Insérer booking_options
- [ ] Générer booking_number (trigger)
- [ ] Retourner booking créée

#### GET /api/bookings
- [ ] Vérifier authentification
- [ ] Récupérer bookings de l'utilisateur
- [ ] Inclure service et options
- [ ] Trier par date DESC

#### GET /api/bookings/[id]
- [ ] Vérifier authentification
- [ ] Vérifier ownership
- [ ] Récupérer détails complets
- [ ] Retourner 404 si non trouvé

#### PUT /api/bookings/[id]
- [ ] Vérifier authentification
- [ ] Vérifier status = 'pending'
- [ ] Valider modifications
- [ ] Mettre à jour booking

#### DELETE /api/bookings/[id]/cancel
- [ ] Vérifier authentification
- [ ] Vérifier délai annulation (>48h)
- [ ] Mettre à jour status = 'cancelled'
- [ ] Enregistrer raison

### API Routes - Services

#### GET /api/services
- [ ] Récupérer tous services actifs
- [ ] Inclure options
- [ ] Grouper par catégorie
- [ ] Trier par display_order

#### GET /api/services/[category]
- [ ] Filtrer par catégorie
- [ ] Inclure options
- [ ] Retourner 404 si catégorie invalide

#### POST /api/estimates
- [ ] Créer estimation
- [ ] Calculer expires_at (+7 jours)
- [ ] Retourner estimate créée

---

## 📆 Sprint 3 : Google Calendar (Semaine 5-6)

### Configuration Google Cloud
- [ ] Créer projet "Fresh Labo"
- [ ] Activer Google Calendar API
- [ ] Créer credentials OAuth 2.0
- [ ] Ajouter redirect URIs
- [ ] Obtenir refresh token

### Client Google Calendar
- [ ] Installer `googleapis`
- [ ] Créer `src/lib/google-calendar/client.ts`
- [ ] Configurer OAuth2 client
- [ ] Fonction createCalendarEvent()
- [ ] Fonction checkAvailability()
- [ ] Fonction updateCalendarEvent()
- [ ] Fonction deleteCalendarEvent()

### API Routes - Calendar

#### GET /api/calendar/availability
- [ ] Récupérer date et slot depuis query params
- [ ] Vérifier disponibilité via Google Calendar
- [ ] Retourner { available: boolean }

#### GET /api/calendar/busy-dates
- [ ] Récupérer événements 3 mois à venir
- [ ] Transformer en liste dates occupées
- [ ] Retourner busyDates array

### Intégration Booking
- [ ] Appeler createCalendarEvent() après booking
- [ ] Sauvegarder google_calendar_event_id
- [ ] Mettre à jour événement si modification
- [ ] Supprimer événement si annulation

---

## 📧 Sprint 4 : Emails (Semaine 7-8)

### Configuration Resend
- [ ] Créer compte Resend
- [ ] Vérifier domaine
- [ ] Générer API Key
- [ ] Configurer variables d'env

### Templates React Email
- [ ] Installer `react-email` et `@react-email/components`
- [ ] Créer `src/emails/BookingConfirmation.tsx`
- [ ] Créer `src/emails/BookingReminder.tsx`
- [ ] Créer `src/emails/BookingCancelled.tsx`
- [ ] Créer `src/emails/ReviewRequest.tsx`
- [ ] Styles CSS inline

### Client & Fonctions
- [ ] Créer `src/lib/emails/client.ts`
- [ ] Créer `src/lib/emails/send.ts`
- [ ] Fonction sendBookingConfirmationEmail()
- [ ] Fonction sendReminderEmail()
- [ ] Fonction sendCancellationEmail()
- [ ] Fonction sendReviewRequestEmail()

### Intégration Booking
- [ ] Appeler sendConfirmationEmail() après booking
- [ ] Appeler sendCancellationEmail() après annulation

### Cron Job - Rappels
- [ ] Créer `src/app/api/cron/send-reminders/route.ts`
- [ ] Vérifier authorization header
- [ ] Trouver bookings dans 24h
- [ ] Envoyer emails de rappel
- [ ] Logger résultats

### Configuration Vercel
- [ ] Créer `vercel.json`
- [ ] Configurer cron pour rappels (9h quotidien)
- [ ] Générer CRON_SECRET
- [ ] Ajouter à variables d'env Vercel

---

## 🏠 Sprint 5 : Dashboard Client (Semaine 9-10)

### Layout Dashboard
- [ ] Créer `src/app/dashboard/layout.tsx`
- [ ] Composant DashboardNav (sidebar/header)
- [ ] Navigation entre pages
- [ ] Responsive mobile

### Page Vue d'Ensemble
- [ ] Créer `/dashboard/page.tsx`
- [ ] Card prochaine réservation
- [ ] Statistiques (total, dépenses)
- [ ] Liens rapides

### Page Liste Réservations
- [ ] Créer `/dashboard/bookings/page.tsx`
- [ ] Tabs (À venir, Passées, Annulées)
- [ ] Composant BookingCard
- [ ] Filtres et recherche
- [ ] Pagination

### Page Détails Réservation
- [ ] Créer `/dashboard/bookings/[id]/page.tsx`
- [ ] Afficher toutes les infos
- [ ] Composant BookingTimeline
- [ ] Boutons actions (Modifier, Annuler)
- [ ] Modal confirmation annulation
- [ ] Télécharger PDF (optionnel)

### Composants Réutilisables
- [ ] `<BookingCard>` - Card de réservation
- [ ] `<BookingStatus>` - Badge statut
- [ ] `<BookingTimeline>` - Timeline événements
- [ ] `<CancelBookingDialog>` - Modal annulation
- [ ] `<EmptyState>` - État vide

---

## 🎨 Sprint 6 : Polish & Production (Semaine 11-12)

### UX/UI Polish
- [ ] Installer `sonner` pour toasts
- [ ] Ajouter notifications partout
- [ ] Loading states (skeletons)
- [ ] Animations page transitions
- [ ] Micro-interactions
- [ ] Scroll animations

### Responsive
- [ ] Tester toutes pages mobile
- [ ] Tester toutes pages tablette
- [ ] Menu hamburger fonctionnel
- [ ] Images responsive

### Accessibilité
- [ ] Ajouter ARIA labels
- [ ] Keyboard navigation
- [ ] Focus states visibles
- [ ] Screen reader test
- [ ] Contrast checker

### Analytics
- [ ] Installer `@vercel/analytics`
- [ ] Installer `@sentry/nextjs`
- [ ] Configurer error tracking
- [ ] Dashboard métriques

### Tests
- [ ] Installer Jest + Testing Library
- [ ] Tests unitaires composants clés
- [ ] Installer Playwright
- [ ] Tests E2E flow réservation
- [ ] Tests E2E authentification
- [ ] CI/CD GitHub Actions

### Optimisations
- [ ] Optimiser images (next/image)
- [ ] Code splitting
- [ ] Lazy loading composants
- [ ] Caching strategy
- [ ] Lighthouse audit >90

### Déploiement
- [ ] Configurer variables d'env Vercel
- [ ] Déployer sur Vercel
- [ ] Configurer domaine personnalisé
- [ ] Certificat SSL
- [ ] Test production

### Documentation
- [ ] Mettre à jour README.md
- [ ] Créer API_DOCUMENTATION.md
- [ ] Créer DEPLOYMENT.md
- [ ] Créer USER_GUIDE.md

### Legal
- [ ] Page CGV
- [ ] Page Mentions légales
- [ ] Page Politique de confidentialité
- [ ] RGPD compliance
- [ ] Cookie banner (si nécessaire)

---

## 📊 Métriques & Monitoring

### KPIs à Suivre
- [ ] Lighthouse Score
- [ ] Page Load Time
- [ ] API Response Time
- [ ] Error Rate
- [ ] Taux de conversion
- [ ] Satisfaction client

### Rapports
- [ ] Rapport hebdomadaire analytics
- [ ] Rapport mensuel business
- [ ] Dashboard Supabase
- [ ] Dashboard Vercel

---

## 🔄 Maintenance Continue

### Hebdomadaire
- [ ] Vérifier logs erreurs
- [ ] Monitorer performances
- [ ] Répondre aux feedbacks
- [ ] Tester nouvelles fonctionnalités

### Mensuel
- [ ] Mettre à jour dépendances
- [ ] Backup base de données
- [ ] Audit sécurité
- [ ] Optimisations performances
- [ ] Analyser métriques business

---

**Dernière mise à jour : 29/01/2026**
