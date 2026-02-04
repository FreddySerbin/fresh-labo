import { NextResponse } from 'next/server'
import { createServerSupabaseClient, supabaseAdmin } from '@/lib/supabase/server'
import { emailService } from '@/lib/email/client'
import { googleCalendarService } from '@/lib/google-calendar/client'

// GET - Récupérer les détails d'une réservation spécifique
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
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

    const bookingId = params.id

    // Récupérer la réservation avec toutes les relations
    const { data: booking, error } = await supabaseAdmin
      .from('bookings')
      .select(`
        *,
        service:services(
          id,
          name,
          category,
          description,
          icon,
          base_price,
          estimated_duration
        ),
        booking_options(
          id,
          quantity,
          price_at_booking,
          option:service_options(
            id,
            name,
            description,
            option_type,
            price_modifier
          )
        )
      `)
      .eq('id', bookingId)
      .single()

    if (error) {
      console.error('Booking fetch error:', error)
      return NextResponse.json(
        { success: false, error: 'Réservation non trouvée' },
        { status: 404 }
      )
    }

    // Vérifier que l'utilisateur a le droit d'accéder à cette réservation
    if (booking.user_id !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Accès non autorisé' },
        { status: 403 }
      )
    }

    return NextResponse.json({ 
      success: true,
      booking
    })
  } catch (error: any) {
    console.error('API Booking GET error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Erreur lors de la récupération de la réservation'
      },
      { status: 500 }
    )
  }
}

// PATCH - Mettre à jour une réservation (annulation ou modification)
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const bookingId = params.id
    const body = await request.json()
    const { action, ...updateData } = body

    // Récupérer la réservation actuelle
    const { data: existingBooking, error: fetchError } = await supabaseAdmin
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single()

    if (fetchError || !existingBooking) {
      return NextResponse.json(
        { success: false, error: 'Réservation non trouvée' },
        { status: 404 }
      )
    }

    // Vérifier que l'utilisateur a le droit de modifier cette réservation
    if (existingBooking.user_id !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Accès non autorisé' },
        { status: 403 }
      )
    }

    // Traiter les différentes actions
    if (action === 'cancel') {
      // Vérifier que la réservation peut être annulée
      if (!['pending', 'confirmed'].includes(existingBooking.status)) {
        return NextResponse.json(
          { success: false, error: 'Cette réservation ne peut pas être annulée' },
          { status: 400 }
        )
      }

      // Vérifier le délai d'annulation (au moins 48h avant)
      const scheduledDate = new Date(existingBooking.scheduled_date)
      const now = new Date()
      const hoursDiff = (scheduledDate.getTime() - now.getTime()) / (1000 * 60 * 60)

      if (hoursDiff < 48) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Annulation impossible : l\'intervention est dans moins de 48h. Veuillez contacter le service client.' 
          },
          { status: 400 }
        )
      }

      // Annuler la réservation
      const { data: updatedBooking, error: updateError } = await supabaseAdmin
        .from('bookings')
        .update({
          status: 'cancelled',
          cancelled_at: new Date().toISOString(),
          cancellation_reason: updateData.cancellation_reason || 'Annulé par le client',
          cancelled_by: session.user.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId)
        .select()
        .single()

      if (updateError) {
        console.error('Booking cancel error:', updateError)
        throw updateError
      }

      // Supprimer l'événement Google Calendar (ne pas bloquer si échec)
      if (existingBooking.google_calendar_event_id) {
        try {
          await googleCalendarService.deleteEvent(existingBooking.google_calendar_event_id)
        } catch (calendarError) {
          console.error('Calendar deletion error (non-blocking):', calendarError)
        }
      }

      // Récupérer les détails du service pour l'email
      const { data: service } = await supabaseAdmin
        .from('services')
        .select('name, estimated_duration')
        .eq('id', existingBooking.service_id)
        .single()

      // Envoyer l'email d'annulation (ne pas bloquer si échec)
      try {
        await emailService.sendBookingCancellation({
          booking_number: existingBooking.booking_number,
          client_name: existingBooking.client_name,
          client_email: existingBooking.client_email,
          service_name: service?.name || 'Service',
          scheduled_date: existingBooking.scheduled_date,
          scheduled_time_slot: existingBooking.scheduled_time_slot || 'morning',
          address: existingBooking.address,
          city: existingBooking.city,
          postal_code: existingBooking.postal_code,
          estimated_price: existingBooking.estimated_price,
          estimated_duration: service?.estimated_duration || 60,
          cancellation_reason: updateData.cancellation_reason,
        })
      } catch (emailError) {
        console.error('Email sending error (non-blocking):', emailError)
      }

      return NextResponse.json({ 
        success: true,
        message: 'Réservation annulée avec succès',
        booking: updatedBooking
      })
    } else if (action === 'update') {
      // Vérifier que la réservation peut être modifiée
      if (existingBooking.status !== 'pending') {
        return NextResponse.json(
          { success: false, error: 'Seules les réservations en attente peuvent être modifiées' },
          { status: 400 }
        )
      }

      // Préparer les données de mise à jour
      const allowedFields = [
        'scheduled_date',
        'scheduled_time_slot',
        'address',
        'postal_code',
        'city',
        'access_code',
        'floor',
        'special_notes'
      ]

      const dataToUpdate: any = {
        updated_at: new Date().toISOString()
      }

      // Ne mettre à jour que les champs autorisés et fournis
      allowedFields.forEach(field => {
        if (updateData[field] !== undefined) {
          dataToUpdate[field] = updateData[field]
        }
      })

      // Mettre à jour la réservation
      const { data: updatedBooking, error: updateError } = await supabaseAdmin
        .from('bookings')
        .update(dataToUpdate)
        .eq('id', bookingId)
        .select()
        .single()

      if (updateError) {
        console.error('Booking update error:', updateError)
        throw updateError
      }

      // Mettre à jour l'événement Google Calendar si les dates ont changé (ne pas bloquer si échec)
      if (existingBooking.google_calendar_event_id && 
          (updateData.scheduled_date || updateData.scheduled_time_slot)) {
        try {
          const newDate = updateData.scheduled_date || existingBooking.scheduled_date
          const newTimeSlot = updateData.scheduled_time_slot || existingBooking.scheduled_time_slot
          const date = new Date(newDate)
          const startHour = newTimeSlot === 'morning' ? 8 : 14
          const endHour = startHour + 4

          const formatDateTime = (d: Date, hours: number) => {
            const newDate = new Date(d)
            newDate.setHours(hours, 0, 0, 0)
            return newDate.toISOString()
          }

          await googleCalendarService.updateEvent(existingBooking.google_calendar_event_id, {
            start: {
              dateTime: formatDateTime(date, startHour),
              timeZone: 'Europe/Paris',
            },
            end: {
              dateTime: formatDateTime(date, endHour),
              timeZone: 'Europe/Paris',
            },
            location: updateData.address 
              ? `${updateData.address}, ${updateData.city || existingBooking.city}`
              : undefined,
          })
        } catch (calendarError) {
          console.error('Calendar update error (non-blocking):', calendarError)
        }
      }

      // Récupérer les détails du service pour l'email
      const { data: service } = await supabaseAdmin
        .from('services')
        .select('name, estimated_duration')
        .eq('id', existingBooking.service_id)
        .single()

      // Envoyer l'email de mise à jour (ne pas bloquer si échec)
      try {
        await emailService.sendBookingUpdate({
          booking_number: existingBooking.booking_number,
          client_name: existingBooking.client_name,
          client_email: existingBooking.client_email,
          service_name: service?.name || 'Service',
          scheduled_date: updatedBooking.scheduled_date,
          scheduled_time_slot: updatedBooking.scheduled_time_slot || 'morning',
          address: updatedBooking.address,
          city: updatedBooking.city,
          postal_code: updatedBooking.postal_code,
          estimated_price: existingBooking.estimated_price,
          estimated_duration: service?.estimated_duration || 60,
        })
      } catch (emailError) {
        console.error('Email sending error (non-blocking):', emailError)
      }

      return NextResponse.json({ 
        success: true,
        message: 'Réservation mise à jour avec succès',
        booking: updatedBooking
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Action non reconnue' },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error('API Booking PATCH error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Erreur lors de la mise à jour de la réservation'
      },
      { status: 500 }
    )
  }
}
