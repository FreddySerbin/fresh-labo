// Service Types
export interface Service {
  id: string;
  category: 'matelas' | 'vehicule' | 'tapis' | 'canape';
  name: string;
  description: string;
  base_price: number;
  estimated_duration: number;
  image_url?: string;
  icon?: string;
  active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceOption {
  id: string;
  service_id: string;
  name: string;
  description?: string;
  price_modifier: number;
  option_type: 'size' | 'sides' | 'vehicle_type' | 'treatment' | 'quantity';
  display_order: number;
  is_required: boolean;
  created_at: string;
  updated_at: string;
}

// Booking Types
export type BookingStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'in_progress' 
  | 'completed' 
  | 'cancelled';

export interface Booking {
  id: string;
  booking_number: string;
  user_id?: string;
  service_id: string;
  status: BookingStatus;
  scheduled_date: string;
  scheduled_time_slot?: 'morning' | 'afternoon';
  estimated_price: number;
  final_price?: number;
  address: string;
  postal_code: string;
  city: string;
  access_code?: string;
  floor?: string;
  special_notes?: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  google_calendar_event_id?: string;
  cancelled_at?: string;
  cancellation_reason?: string;
  cancelled_by?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export interface BookingOption {
  id: string;
  booking_id: string;
  option_id: string;
  quantity: number;
  price_at_booking: number;
  created_at: string;
}

// User Types
export interface User {
  id: string;
  full_name: string;
  phone: string;
  address?: string;
  postal_code?: string;
  city?: string;
  created_at: string;
  updated_at: string;
}

// Estimate Types
export interface Estimate {
  id: string;
  session_id?: string;
  user_id?: string;
  user_email?: string;
  service_category: string;
  service_id?: string;
  estimated_price: number;
  estimated_duration?: number;
  options?: any;
  converted_to_booking?: string;
  converted_at?: string;
  expires_at: string;
  created_at: string;
}
