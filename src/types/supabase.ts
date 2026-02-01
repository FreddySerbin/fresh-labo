export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          full_name: string
          phone: string
          address: string | null
          postal_code: string | null
          city: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          phone: string
          address?: string | null
          postal_code?: string | null
          city?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          phone?: string
          address?: string | null
          postal_code?: string | null
          city?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          category: 'matelas' | 'vehicule' | 'tapis' | 'canape'
          name: string
          description: string | null
          base_price: number
          estimated_duration: number
          image_url: string | null
          icon: string | null
          active: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category: 'matelas' | 'vehicule' | 'tapis' | 'canape'
          name: string
          description?: string | null
          base_price: number
          estimated_duration?: number
          image_url?: string | null
          icon?: string | null
          active?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category?: 'matelas' | 'vehicule' | 'tapis' | 'canape'
          name?: string
          description?: string | null
          base_price?: number
          estimated_duration?: number
          image_url?: string | null
          icon?: string | null
          active?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      service_options: {
        Row: {
          id: string
          service_id: string
          name: string
          description: string | null
          price_modifier: number
          option_type: 'size' | 'sides' | 'vehicle_type' | 'treatment' | 'quantity'
          display_order: number
          is_required: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          service_id: string
          name: string
          description?: string | null
          price_modifier?: number
          option_type: 'size' | 'sides' | 'vehicle_type' | 'treatment' | 'quantity'
          display_order?: number
          is_required?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          service_id?: string
          name?: string
          description?: string | null
          price_modifier?: number
          option_type?: 'size' | 'sides' | 'vehicle_type' | 'treatment' | 'quantity'
          display_order?: number
          is_required?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          booking_number: string
          user_id: string | null
          service_id: string
          status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
          scheduled_date: string
          scheduled_time_slot: string | null
          estimated_price: number
          final_price: number | null
          address: string
          postal_code: string
          city: string
          access_code: string | null
          floor: string | null
          special_notes: string | null
          client_name: string
          client_email: string
          client_phone: string
          google_calendar_event_id: string | null
          cancelled_at: string | null
          cancellation_reason: string | null
          cancelled_by: string | null
          created_at: string
          updated_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          booking_number?: string
          user_id?: string | null
          service_id: string
          status?: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
          scheduled_date: string
          scheduled_time_slot?: string | null
          estimated_price: number
          final_price?: number | null
          address: string
          postal_code: string
          city: string
          access_code?: string | null
          floor?: string | null
          special_notes?: string | null
          client_name: string
          client_email: string
          client_phone: string
          google_calendar_event_id?: string | null
          cancelled_at?: string | null
          cancellation_reason?: string | null
          cancelled_by?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          booking_number?: string
          user_id?: string | null
          service_id?: string
          status?: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
          scheduled_date?: string
          scheduled_time_slot?: string | null
          estimated_price?: number
          final_price?: number | null
          address?: string
          postal_code?: string
          city?: string
          access_code?: string | null
          floor?: string | null
          special_notes?: string | null
          client_name?: string
          client_email?: string
          client_phone?: string
          google_calendar_event_id?: string | null
          cancelled_at?: string | null
          cancellation_reason?: string | null
          cancelled_by?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
      }
      booking_options: {
        Row: {
          id: string
          booking_id: string
          option_id: string
          quantity: number
          price_at_booking: number
          created_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          option_id: string
          quantity?: number
          price_at_booking: number
          created_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          option_id?: string
          quantity?: number
          price_at_booking?: number
          created_at?: string
        }
      }
      estimates: {
        Row: {
          id: string
          session_id: string | null
          user_id: string | null
          user_email: string | null
          service_category: 'matelas' | 'vehicule' | 'tapis' | 'canape'
          service_id: string | null
          estimated_price: number
          estimated_duration: number | null
          options: Json | null
          converted_to_booking: string | null
          converted_at: string | null
          expires_at: string
          created_at: string
        }
        Insert: {
          id?: string
          session_id?: string | null
          user_id?: string | null
          user_email?: string | null
          service_category: 'matelas' | 'vehicule' | 'tapis' | 'canape'
          service_id?: string | null
          estimated_price: number
          estimated_duration?: number | null
          options?: Json | null
          converted_to_booking?: string | null
          converted_at?: string | null
          expires_at: string
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string | null
          user_id?: string | null
          user_email?: string | null
          service_category?: 'matelas' | 'vehicule' | 'tapis' | 'canape'
          service_id?: string | null
          estimated_price?: number
          estimated_duration?: number | null
          options?: Json | null
          converted_to_booking?: string | null
          converted_at?: string | null
          expires_at?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      service_category: 'matelas' | 'vehicule' | 'tapis' | 'canape'
      booking_status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
      option_type: 'size' | 'sides' | 'vehicle_type' | 'treatment' | 'quantity'
    }
  }
}
