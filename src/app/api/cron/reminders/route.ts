import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { emailService } from '@/lib/email/client';

export const dynamic = 'force-dynamic';

/**
 * POST /api/cron/reminders
 * Send reminder emails for bookings scheduled for tomorrow
 * 
 * This endpoint should be called daily (e.g., via a cron job)
 * to send reminder emails 24 hours before the scheduled intervention
 */
export async function POST(request: NextRequest) {
  try {
    // Verify cron secret (security measure)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || 'your-secret-key';

    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Calculate date range for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

    // Get all confirmed bookings scheduled for tomorrow
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
      .gte('scheduled_date', tomorrow.toISOString().split('T')[0])
      .lt('scheduled_date', dayAfterTomorrow.toISOString().split('T')[0]);

    if (error) {
      console.error('Error fetching bookings for reminders:', error);
      throw error;
    }

    if (!bookings || bookings.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No bookings found for tomorrow',
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
            service_name: booking.service?.name || 'Service',
            scheduled_date: booking.scheduled_date,
            scheduled_time_slot: booking.scheduled_time_slot || 'morning',
            address: booking.address,
            city: booking.city,
            postal_code: booking.postal_code,
            estimated_price: booking.estimated_price,
            estimated_duration: booking.service?.estimated_duration || 60,
          });

          // Mark reminder as sent (optional: add a reminder_sent_at column to bookings table)
          return { booking_id: booking.id, status: 'sent' };
        } catch (error: any) {
          console.error(`Failed to send reminder for booking ${booking.id}:`, error);
          return { booking_id: booking.id, status: 'failed', error: error.message };
        }
      })
    );

    const successCount = results.filter((r) => r.status === 'fulfilled').length;
    const failureCount = results.filter((r) => r.status === 'rejected').length;

    console.log(
      `Reminder emails sent: ${successCount} successful, ${failureCount} failed out of ${bookings.length} total`
    );

    return NextResponse.json({
      success: true,
      message: 'Reminder emails processed',
      total: bookings.length,
      successful: successCount,
      failed: failureCount,
      results: results.map((r) =>
        r.status === 'fulfilled' ? r.value : { status: 'failed', reason: r.reason }
      ),
    });
  } catch (error: any) {
    console.error('Error in reminder cron job:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process reminders' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/cron/reminders
 * Test endpoint to check which bookings would receive reminders
 */
export async function GET(request: NextRequest) {
  try {
    // Verify authorization
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || 'your-secret-key';

    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Calculate date range for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

    // Get all confirmed bookings scheduled for tomorrow
    const { data: bookings, error } = await supabaseAdmin
      .from('bookings')
      .select(
        `
        id,
        booking_number,
        client_name,
        client_email,
        scheduled_date,
        scheduled_time_slot,
        status,
        service:services (
          name
        )
      `
      )
      .in('status', ['pending', 'confirmed'])
      .gte('scheduled_date', tomorrow.toISOString().split('T')[0])
      .lt('scheduled_date', dayAfterTomorrow.toISOString().split('T')[0]);

    if (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      date: tomorrow.toISOString().split('T')[0],
      count: bookings?.length || 0,
      bookings: bookings || [],
    });
  } catch (error: any) {
    console.error('Error fetching reminder preview:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch reminders' },
      { status: 500 }
    );
  }
}
