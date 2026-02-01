import { NextResponse } from 'next/server'
import { createServerSupabaseClient, supabaseAdmin } from '@/lib/supabase/server'

// GET - Récupérer toutes les réservations (admin)
export async function GET(request: Request) {
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

    // TODO: Vérifier que l'utilisateur est admin
    // Pour l'instant, on suppose que tous les utilisateurs authentifiés peuvent accéder
    // Dans une vraie app, il faudrait vérifier le rôle dans user_metadata ou une table roles

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const date = searchParams.get('date')

    let query = supabaseAdmin
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
      .order('scheduled_date', { ascending: true })

    // Filtres optionnels
    if (status) {
      query = query.eq('status', status)
    }

    if (date) {
      query = query.eq('scheduled_date', date)
    }

    const { data: bookings, error } = await query

    if (error) {
      console.error('Admin bookings fetch error:', error)
      throw error
    }

    return NextResponse.json({ 
      success: true,
      bookings: bookings || [],
      count: bookings?.length || 0
    })
  } catch (error: any) {
    console.error('API Admin Bookings GET error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Erreur lors de la récupération des réservations'
      },
      { status: 500 }
    )
  }
}
