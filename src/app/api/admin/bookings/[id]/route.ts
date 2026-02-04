import { NextResponse } from 'next/server'
import { createServerSupabaseClient, supabaseAdmin } from '@/lib/supabase/server'

// PATCH - Mettre à jour le statut d'une réservation (admin)
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

    // TODO: Vérifier que l'utilisateur est admin

    const bookingId = params.id
    const body = await request.json()
    const { status, final_price } = body

    // Valider le statut
    const validStatuses = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled']
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Statut invalide' },
        { status: 400 }
      )
    }

    const updateData: any = {
      updated_at: new Date().toISOString()
    }

    if (status) {
      updateData.status = status
      
      // Si completed, enregistrer la date de complétion
      if (status === 'completed') {
        updateData.completed_at = new Date().toISOString()
      }
    }

    if (final_price !== undefined) {
      updateData.final_price = final_price
    }

    // Mettre à jour la réservation
    const { data: updatedBooking, error: updateError } = await supabaseAdmin
      .from('bookings')
      .update(updateData)
      .eq('id', bookingId)
      .select()
      .single()

    if (updateError) {
      console.error('Admin booking update error:', updateError)
      throw updateError
    }

    return NextResponse.json({ 
      success: true,
      message: 'Réservation mise à jour avec succès',
      booking: updatedBooking
    })
  } catch (error: any) {
    console.error('API Admin Booking PATCH error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Erreur lors de la mise à jour de la réservation'
      },
      { status: 500 }
    )
  }
}
