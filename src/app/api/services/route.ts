import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    const { data: services, error } = await supabase
      .from('services')
      .select(`
        *,
        service_options (*)
      `)
      .eq('active', true)
      .order('category')
      .order('display_order')

    if (error) {
      console.error('Services fetch error:', error)
      throw error
    }

    return NextResponse.json({ 
      success: true,
      services,
      count: services?.length || 0
    })
  } catch (error: any) {
    console.error('API Services error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Erreur lors de la récupération des services'
      },
      { status: 500 }
    )
  }
}
