-- Fresh Lab'O - Initial Database Schema
-- Migration: 001_initial_schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE service_category AS ENUM ('matelas', 'vehicule', 'tapis', 'canape');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled');
CREATE TYPE option_type AS ENUM ('size', 'sides', 'vehicle_type', 'treatment', 'quantity');

-- ============================================
-- USERS TABLE (extends Supabase Auth)
-- ============================================

CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  postal_code TEXT,
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- SERVICES TABLE
-- ============================================

CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category service_category NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  base_price DECIMAL(10,2) NOT NULL CHECK (base_price >= 0),
  estimated_duration INTEGER NOT NULL DEFAULT 60, -- minutes
  image_url TEXT,
  icon TEXT, -- emoji or icon name
  active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- SERVICE OPTIONS TABLE
-- ============================================

CREATE TABLE public.service_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price_modifier DECIMAL(10,2) NOT NULL DEFAULT 0, -- can be negative for discounts
  option_type option_type NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_required BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- BOOKINGS TABLE
-- ============================================

CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_number TEXT UNIQUE NOT NULL, -- FR-2024-0001
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE RESTRICT,
  
  -- Status and scheduling
  status booking_status NOT NULL DEFAULT 'pending',
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  scheduled_time_slot TEXT, -- 'morning' or 'afternoon'
  
  -- Pricing
  estimated_price DECIMAL(10,2) NOT NULL CHECK (estimated_price >= 0),
  final_price DECIMAL(10,2) CHECK (final_price >= 0),
  
  -- Location
  address TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  city TEXT NOT NULL,
  access_code TEXT,
  floor TEXT,
  
  -- Additional info
  special_notes TEXT,
  client_name TEXT NOT NULL, -- For non-registered users
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  
  -- Calendar integration
  google_calendar_event_id TEXT,
  
  -- Cancellation
  cancelled_at TIMESTAMP WITH TIME ZONE,
  cancellation_reason TEXT,
  cancelled_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Constraints
  CONSTRAINT valid_final_price CHECK (final_price IS NULL OR status IN ('completed', 'cancelled')),
  CONSTRAINT valid_cancellation CHECK (
    (cancelled_at IS NULL AND cancellation_reason IS NULL) OR
    (cancelled_at IS NOT NULL AND cancellation_reason IS NOT NULL)
  )
);

-- ============================================
-- BOOKING OPTIONS TABLE (Many-to-Many)
-- ============================================

CREATE TABLE public.booking_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  option_id UUID NOT NULL REFERENCES public.service_options(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  price_at_booking DECIMAL(10,2) NOT NULL, -- snapshot price at booking time
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(booking_id, option_id)
);

-- ============================================
-- ESTIMATES TABLE (for conversion tracking)
-- ============================================

CREATE TABLE public.estimates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT, -- for anonymous tracking
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  user_email TEXT,
  
  -- Service selection
  service_category service_category NOT NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  estimated_price DECIMAL(10,2) NOT NULL CHECK (estimated_price >= 0),
  estimated_duration INTEGER, -- minutes
  
  -- Details
  options JSONB, -- selected options details
  
  -- Conversion tracking
  converted_to_booking UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  converted_at TIMESTAMP WITH TIME ZONE,
  
  -- Expiration
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

-- Users
CREATE INDEX idx_users_email ON public.users((auth.email()));
CREATE INDEX idx_users_phone ON public.users(phone);

-- Services
CREATE INDEX idx_services_category ON public.services(category);
CREATE INDEX idx_services_active ON public.services(active) WHERE active = true;

-- Service Options
CREATE INDEX idx_service_options_service_id ON public.service_options(service_id);
CREATE INDEX idx_service_options_type ON public.service_options(option_type);

-- Bookings
CREATE INDEX idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_scheduled_date ON public.bookings(scheduled_date);
CREATE INDEX idx_bookings_booking_number ON public.bookings(booking_number);
CREATE INDEX idx_bookings_created_at ON public.bookings(created_at DESC);
CREATE INDEX idx_bookings_client_email ON public.bookings(client_email);

-- Booking Options
CREATE INDEX idx_booking_options_booking_id ON public.booking_options(booking_id);
CREATE INDEX idx_booking_options_option_id ON public.booking_options(option_id);

-- Estimates
CREATE INDEX idx_estimates_session_id ON public.estimates(session_id);
CREATE INDEX idx_estimates_user_id ON public.estimates(user_id);
CREATE INDEX idx_estimates_converted ON public.estimates(converted_to_booking);
CREATE INDEX idx_estimates_created_at ON public.estimates(created_at DESC);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_options_updated_at
  BEFORE UPDATE ON public.service_options
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to generate booking number
CREATE OR REPLACE FUNCTION generate_booking_number()
RETURNS TRIGGER AS $$
DECLARE
  year_part TEXT;
  sequence_part TEXT;
  next_number INTEGER;
BEGIN
  -- Get current year
  year_part := TO_CHAR(NOW(), 'YYYY');
  
  -- Get next sequence number for this year
  SELECT COALESCE(MAX(CAST(SUBSTRING(booking_number FROM 9) AS INTEGER)), 0) + 1
  INTO next_number
  FROM public.bookings
  WHERE booking_number LIKE 'FR-' || year_part || '-%';
  
  -- Format with leading zeros (4 digits)
  sequence_part := LPAD(next_number::TEXT, 4, '0');
  
  -- Construct booking number: FR-YYYY-XXXX
  NEW.booking_number := 'FR-' || year_part || '-' || sequence_part;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate booking number
CREATE TRIGGER generate_booking_number_trigger
  BEFORE INSERT ON public.bookings
  FOR EACH ROW
  WHEN (NEW.booking_number IS NULL OR NEW.booking_number = '')
  EXECUTE FUNCTION generate_booking_number();

-- Function to mark estimate as converted
CREATE OR REPLACE FUNCTION mark_estimate_converted()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.id IS NOT NULL THEN
    UPDATE public.estimates
    SET 
      converted_to_booking = NEW.id,
      converted_at = NOW()
    WHERE session_id = NEW.booking_number -- assuming session_id might match
    AND converted_to_booking IS NULL;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estimates ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES - USERS
-- ============================================

-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Users can insert their own profile (on signup)
CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================
-- RLS POLICIES - SERVICES (Public Read)
-- ============================================

-- Anyone can view active services
CREATE POLICY "Anyone can view active services"
  ON public.services FOR SELECT
  USING (active = true);

-- ============================================
-- RLS POLICIES - SERVICE OPTIONS (Public Read)
-- ============================================

-- Anyone can view service options for active services
CREATE POLICY "Anyone can view service options"
  ON public.service_options FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.services
      WHERE services.id = service_options.service_id
      AND services.active = true
    )
  );

-- ============================================
-- RLS POLICIES - BOOKINGS
-- ============================================

-- Users can view their own bookings
CREATE POLICY "Users can view own bookings"
  ON public.bookings FOR SELECT
  USING (
    auth.uid() = user_id 
    OR client_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Authenticated users can create bookings
CREATE POLICY "Authenticated users can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Users can update their own pending bookings
CREATE POLICY "Users can update own pending bookings"
  ON public.bookings FOR UPDATE
  USING (
    (auth.uid() = user_id OR client_email = (SELECT email FROM auth.users WHERE id = auth.uid()))
    AND status = 'pending'
  );

-- Users can cancel their own confirmed bookings (within limits - enforced at app level)
CREATE POLICY "Users can cancel own bookings"
  ON public.bookings FOR UPDATE
  USING (
    (auth.uid() = user_id OR client_email = (SELECT email FROM auth.users WHERE id = auth.uid()))
    AND status IN ('pending', 'confirmed')
  )
  WITH CHECK (
    status IN ('pending', 'confirmed', 'cancelled')
  );

-- ============================================
-- RLS POLICIES - BOOKING OPTIONS
-- ============================================

-- Users can view options for their bookings
CREATE POLICY "Users can view own booking options"
  ON public.booking_options FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.bookings
      WHERE bookings.id = booking_options.booking_id
      AND (bookings.user_id = auth.uid() 
           OR bookings.client_email = (SELECT email FROM auth.users WHERE id = auth.uid()))
    )
  );

-- Users can insert options for their bookings
CREATE POLICY "Users can insert booking options"
  ON public.booking_options FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.bookings
      WHERE bookings.id = booking_options.booking_id
      AND bookings.user_id = auth.uid()
      AND bookings.status = 'pending'
    )
  );

-- ============================================
-- RLS POLICIES - ESTIMATES
-- ============================================

-- Users can view their own estimates
CREATE POLICY "Users can view own estimates"
  ON public.estimates FOR SELECT
  USING (
    auth.uid() = user_id 
    OR user_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Anyone can create estimates (for quote generation)
CREATE POLICY "Anyone can create estimates"
  ON public.estimates FOR INSERT
  WITH CHECK (true);

-- ============================================
-- GRANT PERMISSIONS
-- ============================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant permissions on tables
GRANT SELECT ON public.services TO anon, authenticated;
GRANT SELECT ON public.service_options TO anon, authenticated;

GRANT ALL ON public.users TO authenticated;
GRANT ALL ON public.bookings TO authenticated;
GRANT ALL ON public.booking_options TO authenticated;
GRANT ALL ON public.estimates TO anon, authenticated;

-- Grant sequence permissions (for auto-increment if needed)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE public.users IS 'Extended user profiles linked to Supabase Auth';
COMMENT ON TABLE public.services IS 'Available cleaning services (matelas, vehicule, tapis, canape)';
COMMENT ON TABLE public.service_options IS 'Configurable options for each service (sizes, treatments, etc.)';
COMMENT ON TABLE public.bookings IS 'Customer bookings/reservations';
COMMENT ON TABLE public.booking_options IS 'Selected options for each booking';
COMMENT ON TABLE public.estimates IS 'Price estimates for conversion tracking';

COMMENT ON COLUMN public.bookings.booking_number IS 'Unique booking reference (FR-YYYY-XXXX)';
COMMENT ON COLUMN public.bookings.scheduled_time_slot IS 'morning or afternoon';
COMMENT ON COLUMN public.service_options.price_modifier IS 'Amount to add/subtract from base price';
COMMENT ON COLUMN public.estimates.session_id IS 'Anonymous session tracking for non-registered users';
