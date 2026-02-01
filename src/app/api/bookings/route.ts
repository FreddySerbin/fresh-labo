import { NextResponse } from 'next/server'
import { createServerSupabaseClient, supabaseAdmin } from '@/lib/supabase/server'
import { emailService } from '@/lib/email/client'
import { googleCalendarService } from '@/lib/google-calendar/client'

// GET - Récupérer les réservations de l'utilisateur connecté
export async function GET() {
  try {
    const supabase = createServerSupabaseClient()
    
    // Vérifier l'authentification
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Non authentifié' },
        { status: 401 }
      )
    }

    // Utiliser le client admin pour contourner les RLS
    // (car les jointures complexes peuvent causer des problèmes de permissions)
    const { data: bookings, error } = await supabaseAdmin
      .from('bookings')
      .select(`
        *,
        service:services(id, name, category, icon),
        booking_options(
          id,
          quantity,
          price_at_booking,
          option:service_options(id, name, option_type)
        )
      `)
      .eq('user_id', session.user.id)
      .order('scheduled_date', { ascending: false })

    if (error) {
      console.error('Bookings fetch error:', error)
      throw error
    }

    return NextResponse.json({ 
      success: true,
      bookings: bookings || [],
      count: bookings?.length || 0
    })
  } catch (error: any) {
    console.error('API Bookings GET error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Erreur lors de la récupération des réservations'
      },
      { status: 500 }
    )
  }
}

// POST - Créer une nouvelle réservation
export async function POST(request: Request) {
  try {
    const supabase = createServerSupabaseClient()
    
    // Vérifier l'authentification
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Non authentifié' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      service_id,
      scheduled_date,
      scheduled_time_slot,
      address,
      postal_code,
      city,
      access_code,
      floor,
      special_notes,
      selected_options = [],
      estimated_price
    } = body

    // Validation
    if (!service_id || !scheduled_date || !address || !postal_code || !city) {
      return NextResponse.json(
        { success: false, error: 'Champs obligatoires manquants' },
        { status: 400 }
      )
    }

    // Utiliser les données de la session (user_metadata)
    // Ces données sont définies lors de l'inscription
    const fullName = session.user.user_metadata?.full_name || 'Utilisateur'
    const phone = session.user.user_metadata?.phone || ''

    // Générer un numéro de réservation unique
    const year = new Date().getFullYear()
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    const booking_number = `FL-${year}-${random}`

    // Utiliser supabaseAdmin pour contourner les RLS qui font des sous-requêtes sur auth.users
    // Sécurité : on vérifie quand même l'authentification via session avant
    const { data: booking, error: bookingError } = await supabaseAdmin
      .from('bookings')
      .insert({
        booking_number,
        user_id: session.user.id,
        service_id,
        scheduled_date,
        scheduled_time_slot,
        estimated_price,
        address,
        postal_code,
        city,
        access_code,
        floor,
        special_notes,
        client_name: fullName,
        client_email: session.user.email!,
        client_phone: phone,
        status: 'pending'
      })
      .select()
      .single()

    if (bookingError) {
      console.error('Booking creation error:', bookingError)
      throw bookingError
    }

    // Ajouter les options sélectionnées
    if (selected_options.length > 0) {
      const optionsToInsert = selected_options.map((opt: any) => ({
        booking_id: booking.id,
        option_id: opt.id,
        quantity: opt.quantity || 1,
        price_at_booking: opt.price_modifier
      }))

      const { error: optionsError } = await supabaseAdmin
        .from('booking_options')
        .insert(optionsToInsert)

      if (optionsError) {
        console.error('Booking options error:', optionsError)
        // Ne pas bloquer si les options échouent, continuer
      }
    }

    // Récupérer les détails du service pour les emails/calendar
    const { data: service } = await supabaseAdmin
      .from('services')
      .select('name, estimated_duration')
      .eq('id', service_id)
      .single()

    const serviceName = service?.name || 'Service'
    const estimatedDuration = service?.estimated_duration || 60

    // Créer l'événement Google Calendar (ne pas bloquer si échec)
    try {
      const calendarEventId = await googleCalendarService.createBookingEvent({
        booking_number,
        service_name: serviceName,
        client_name: fullName,
        client_email: session.user.email!,
        client_phone: phone,
        address,
        city,
        scheduled_date,
        scheduled_time_slot: scheduled_time_slot || 'morning',
        estimated_duration: estimatedDuration,
      })

      // Mettre à jour la réservation avec l'ID de l'événement
      if (calendarEventId) {
        await supabaseAdmin
          .from('bookings')
          .update({ google_calendar_event_id: calendarEventId })
          .eq('id', booking.id)
      }
    } catch (calendarError) {
      console.error('Calendar creation error (non-blocking):', calendarError)
    }

    // Envoyer l'email de confirmation (ne pas bloquer si échec)
    try {
      await emailService.sendBookingConfirmation({
        booking_number,
        client_name: fullName,
        client_email: session.user.email!,
        service_name: serviceName,
        scheduled_date,
        scheduled_time_slot: scheduled_time_slot || 'morning',
        address,
        city,
        postal_code,
        estimated_price,
        estimated_duration: estimatedDuration,
      })
    } catch (emailError) {
      console.error('Email sending error (non-blocking):', emailError)
    }

    return NextResponse.json({ 
      success: true,
      booking: {
        ...booking,
        message: 'Réservation créée avec succès'
      }
    })
  } catch (error: any) {
    console.error('API Bookings POST error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Erreur lors de la création de la réservation'
      },
      { status: 500 }
    )
  }
}
