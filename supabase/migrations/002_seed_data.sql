-- Fresh Lab'O - Seed Data
-- Migration: 002_seed_data.sql

-- ============================================
-- SEED SERVICES
-- ============================================

-- Matelas Services
INSERT INTO public.services (category, name, description, base_price, estimated_duration, icon, display_order, active) VALUES
('matelas', 'Matelas 1 Face', 'Nettoyage professionnel d''une face de votre matelas', 60.00, 45, '🛏️', 1, true),
('matelas', 'Matelas 2 Faces', 'Nettoyage complet des deux faces de votre matelas', 80.00, 75, '🛏️', 2, true),
('matelas', 'Matelas King Size', 'Nettoyage de matelas grand format (King Size)', 105.00, 90, '🛏️', 3, true);

-- Véhicule Services  
INSERT INTO public.services (category, name, description, base_price, estimated_duration, icon, display_order, active) VALUES
('vehicule', 'Intérieur Véhicule - Petit', 'Nettoyage intérieur complet (citadine, petite berline)', 55.00, 60, '🚗', 1, true),
('vehicule', 'Intérieur Véhicule - Moyen', 'Nettoyage intérieur complet (berline, SUV compact)', 65.00, 75, '🚗', 2, true),
('vehicule', 'Intérieur Véhicule - Grand', 'Nettoyage intérieur complet (SUV, monospace, utilitaire)', 80.00, 90, '🚙', 3, true),
('vehicule', 'Sièges Auto (2)', 'Nettoyage de 2 sièges automobile', 60.00, 45, '💺', 4, true),
('vehicule', 'Sièges Auto (4+)', 'Nettoyage de 4 sièges automobile ou plus', 80.00, 75, '💺', 5, true);

-- Tapis Services
INSERT INTO public.services (category, name, description, base_price, estimated_duration, icon, display_order, active) VALUES
('tapis', 'Petit Tapis', 'Tapis jusqu''à 2m² (60x110cm ou 80x150cm)', 50.00, 30, '🧵', 1, true),
('tapis', 'Tapis Moyen', 'Tapis de 2 à 4m² (120x170cm ou 160x200cm)', 90.00, 45, '🧵', 2, true),
('tapis', 'Grand Tapis', 'Tapis de plus de 4m² (200x290cm ou plus)', 120.00, 60, '🧵', 3, true);

-- Canapé Services
INSERT INTO public.services (category, name, description, base_price, estimated_duration, icon, display_order, active) VALUES
('canape', 'Chaise', 'Nettoyage d''une chaise rembourrée', 15.00, 15, '🪑', 1, true),
('canape', 'Fauteuil', 'Nettoyage d''un fauteuil', 35.00, 30, '🛋️', 2, true),
('canape', 'Canapé 2 Places', 'Nettoyage d''un canapé 2 places', 70.00, 45, '🛋️', 3, true),
('canape', 'Canapé 3 Places', 'Nettoyage d''un canapé 3 places', 80.00, 60, '🛋️', 4, true),
('canape', 'Canapé 4 Places', 'Nettoyage d''un canapé 4 places', 90.00, 75, '🛋️', 5, true),
('canape', 'Canapé 5 Places', 'Nettoyage d''un canapé 5 places', 110.00, 90, '🛋️', 6, true),
('canape', 'Canapé 6+ Places', 'Nettoyage d''un canapé 6 places ou plus', 120.00, 105, '🛋️', 7, true);

-- ============================================
-- SEED SERVICE OPTIONS
-- ============================================

-- Matelas Options
DO $$
DECLARE
  matelas_1_face_id UUID;
  matelas_2_faces_id UUID;
BEGIN
  -- Get service IDs
  SELECT id INTO matelas_1_face_id FROM public.services WHERE name = 'Matelas 1 Face';
  
  -- Options for Matelas 1 Face
  INSERT INTO public.service_options (service_id, name, description, price_modifier, option_type, display_order) VALUES
  (matelas_1_face_id, '2 Faces', 'Nettoyage des deux faces (+20€)', 20.00, 'sides', 1),
  (matelas_1_face_id, 'King Size', 'Supplément pour matelas King Size (+30€)', 30.00, 'size', 2);
END $$;

-- Véhicule Options (Type de prestation)
DO $$
DECLARE
  vehicule_id UUID;
BEGIN
  -- Add options to all vehicle services
  FOR vehicule_id IN SELECT id FROM public.services WHERE category = 'vehicule' LOOP
    INSERT INTO public.service_options (service_id, name, description, price_modifier, option_type, display_order) VALUES
    (vehicule_id, 'Traitement Anti-Odeur', 'Traitement spécial anti-odeur (+15€)', 15.00, 'treatment', 1),
    (vehicule_id, 'Protection Textile', 'Application protection textile longue durée (+20€)', 20.00, 'treatment', 2);
  END LOOP;
END $$;

-- Tapis Options (Quantité)
DO $$
DECLARE
  tapis_id UUID;
BEGIN
  FOR tapis_id IN SELECT id FROM public.services WHERE category = 'tapis' LOOP
    INSERT INTO public.service_options (service_id, name, description, price_modifier, option_type, display_order) VALUES
    (tapis_id, 'Tapis Supplémentaire', 'Chaque tapis supplémentaire (même taille, -10€)', -10.00, 'quantity', 1);
  END LOOP;
END $$;

-- Canapé Options (Services additionnels)
DO $$
DECLARE
  canape_id UUID;
BEGIN
  FOR canape_id IN SELECT id FROM public.services WHERE category = 'canape' LOOP
    INSERT INTO public.service_options (service_id, name, description, price_modifier, option_type, display_order) VALUES
    (canape_id, 'Protection Anti-Taches', 'Application protection anti-taches (+15€)', 15.00, 'treatment', 1),
    (canape_id, 'Traitement Cuir', 'Nettoyage et nourrissage du cuir (+25€)', 25.00, 'treatment', 2);
  END LOOP;
END $$;

-- ============================================
-- EXAMPLE DATA (for development/testing)
-- ============================================

-- Note: These are example bookings for testing
-- Remove or comment out for production

-- Example User (requires manual setup in Supabase Auth first)
-- Then uncomment and adjust the UUID:
/*
INSERT INTO public.users (id, full_name, phone, address, postal_code, city) VALUES
('your-auth-user-uuid-here', 'Marie Dupont', '0612345678', '15 Rue de la Paix', '75002', 'Paris');

-- Example Booking
INSERT INTO public.bookings (
  user_id,
  service_id,
  status,
  scheduled_date,
  scheduled_time_slot,
  estimated_price,
  address,
  postal_code,
  city,
  client_name,
  client_email,
  client_phone,
  special_notes
) VALUES (
  'your-auth-user-uuid-here',
  (SELECT id FROM public.services WHERE name = 'Canapé 3 Places' LIMIT 1),
  'confirmed',
  NOW() + INTERVAL '3 days',
  'afternoon',
  80.00,
  '15 Rue de la Paix',
  '75002',
  'Paris',
  'Marie Dupont',
  'marie.dupont@example.com',
  '0612345678',
  'Code portail: 1234A, 3ème étage sans ascenseur'
);
*/

-- Example Estimate
INSERT INTO public.estimates (
  session_id,
  user_email,
  service_category,
  service_id,
  estimated_price,
  estimated_duration,
  options,
  expires_at
) VALUES (
  'sess_example_123',
  'prospect@example.com',
  'canape',
  (SELECT id FROM public.services WHERE name = 'Canapé 2 Places' LIMIT 1),
  85.00,
  45,
  '{"options": [{"name": "Protection Anti-Taches", "price": 15.00}]}'::jsonb,
  NOW() + INTERVAL '7 days'
);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Verify services inserted
-- SELECT category, COUNT(*) as count FROM public.services GROUP BY category;

-- Verify options inserted
-- SELECT s.category, COUNT(so.*) as options_count
-- FROM public.services s
-- LEFT JOIN public.service_options so ON s.id = so.service_id
-- GROUP BY s.category;

-- ============================================
-- PRICE LIST SUMMARY (for reference)
-- ============================================

/*
MATELAS:
- 1 Face: 60€
- 2 Faces: 80€ (ou 1 Face + option 2 Faces: 60€ + 20€)
- King Size: 105€

VÉHICULES:
- Petit (citadine): 55€
- Moyen (berline): 65€
- Grand (SUV): 80€
- 2 Sièges: 60€
- 4+ Sièges: 80€
Options: Anti-Odeur +15€, Protection Textile +20€

TAPIS:
- Petit (<2m²): 50€
- Moyen (2-4m²): 90€
- Grand (>4m²): 120€
Option: Tapis supplémentaire -10€

CANAPÉS:
- Chaise: 15€
- Fauteuil: 35€
- 2 Places: 70€
- 3 Places: 80€
- 4 Places: 90€
- 5 Places: 110€
- 6+ Places: 120€
Options: Protection Anti-Taches +15€, Traitement Cuir +25€
*/
