import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { generateBookingPDF } from '@/lib/pdf/generateBookingPDF';

export const dynamic = 'force-dynamic';

/**
 * GET /api/bookings/[id]/pdf
 * Generate and download PDF for a booking
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient();
    const bookingId = params.id;

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch booking with all details
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select(
        `
        *,
        service:services (
          id,
          name,
          description,
          icon,
          base_price,
          estimated_duration
        ),
        booking_options (
          id,
          quantity,
          price_at_booking,
          option:service_options (
            id,
            name,
            description
          )
        )
      `
      )
      .eq('id', bookingId)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Check if user owns this booking
    if (booking.user_id !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Generate PDF
    const pdf = generateBookingPDF(booking);
    const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));

    // Return PDF as download
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Devis_FreshLabO_${booking.booking_number}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error: any) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
