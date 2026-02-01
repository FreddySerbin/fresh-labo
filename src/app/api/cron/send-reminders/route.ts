import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { emailService } from '@/lib/email/client';

export const dynamic = 'force-dynamic';

/**
 * POST /api/cron/send-reminders
 * Send reminder emails for bookings scheduled tomorrow
 * This should be called daily by a cron job (e.g., Vercel Cron or external service)
 */
export async function POST(request: NextRequest) {
  try {
    // Verify cron secret (for security)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Calculate tomorrow's date range
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

    // Fetch bookings scheduled for tomorrow
    const { data: bookings, error } = await supabaseAdmin
      .from('bookings')
      .select(
        `
        *,
        service:services (
          name,
          estimated_duration
        )
      `
      )
      .in('status', ['pending', 'confirmed'])
      .gte('scheduled_date', tomorrow.toISOString())
      .lt('scheduled_date', dayAfterTomorrow.toISOString());

    if (error) {
      console.error('Error fetching bookings:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    if (!bookings || bookings.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No bookings to remind',
        count: 0,
      });
    }

    // Send reminder emails
    const results = await Promise.allSettled(
      bookings.map(async (booking) => {
        try {
          await emailService.sendBookingReminder({
            booking_number: booking.booking_number,
            client_name: booking.client_name,
            client_email: booking.client_email,
            service_name: booking.service.name,
            scheduled_date: booking.scheduled_date,
            scheduled_time_slot: booking.scheduled_time_slot || 'morning',
            address: booking.address,
            city: booking.city,
            postal_code: booking.postal_code,
            estimated_price: booking.estimated_price,
            estimated_duration: booking.service.estimated_duration || 60,
          });

          return { booking_number: booking.booking_number, success: true };
        } catch (error: any) {
          console.error(`Failed to send reminder for ${booking.booking_number}:`, error);
          return { booking_number: booking.booking_number, success: false, error: error.message };
        }
      })
    );

    const successful = results.filter((r) => r.status === 'fulfilled' && r.value.success).length;
    const failed = results.length - successful;

    return NextResponse.json({
      success: true,
      message: `Reminders processed`,
      total: results.length,
      successful,
      failed,
      results: results.map((r) => (r.status === 'fulfilled' ? r.value : { error: 'Promise rejected' })),
    });
  } catch (error: any) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process reminders' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/cron/send-reminders (for testing)
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'This endpoint should be called with POST method by a cron job',
    info: 'Set up a daily cron job to call this endpoint',
  });
}
