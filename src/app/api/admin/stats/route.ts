import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/stats
 * Get user booking statistics
 */
export async function GET(_request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();

    // Check authentication
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

    // Get all user bookings with aggregated data
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('id, status, estimated_price, final_price, scheduled_date, created_at')
      .eq('user_id', user.id);

    if (bookingsError) {
      console.error('Error fetching bookings for stats:', bookingsError);
      throw bookingsError;
    }

    const now = new Date();
    const totalBookings = bookings?.length || 0;

    // Calculate various statistics
    const upcomingBookings = bookings?.filter(
      (b) =>
        ['pending', 'confirmed'].includes(b.status) &&
        new Date(b.scheduled_date) >= now
    ).length || 0;

    const completedBookings = bookings?.filter((b) => b.status === 'completed').length || 0;

    const cancelledBookings = bookings?.filter((b) => b.status === 'cancelled').length || 0;

    const inProgressBookings = bookings?.filter((b) => b.status === 'in_progress').length || 0;

    const totalSpent = bookings
      ?.filter((b) => b.status === 'completed')
      .reduce((sum, b) => sum + (b.final_price || b.estimated_price || 0), 0) || 0;

    const averagePrice =
      completedBookings > 0
        ? Math.round(
            bookings
              ?.filter((b) => b.status === 'completed')
              .reduce((sum, b) => sum + (b.final_price || b.estimated_price || 0), 0) / completedBookings
          )
        : 0;

    // Calculate monthly stats (last 6 months)
    const monthlyStats = [];
    for (let i = 5; i >= 0; i--) {
      const month = new Date();
      month.setMonth(month.getMonth() - i);
      const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
      const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);

      const monthBookings = bookings?.filter((b) => {
        const bookingDate = new Date(b.created_at);
        return bookingDate >= monthStart && bookingDate <= monthEnd;
      });

      monthlyStats.push({
        month: monthStart.toLocaleString('fr-FR', { month: 'short', year: 'numeric' }),
        bookings: monthBookings?.length || 0,
        revenue:
          monthBookings
            ?.filter((b) => b.status === 'completed')
            .reduce((sum, b) => sum + (b.final_price || b.estimated_price || 0), 0) || 0,
      });
    }

    // Service distribution (would need a join query in production)
    const { data: servicesData, error: _servicesError } = await supabase
      .from('bookings')
      .select('service_id, services(name, category)')
      .eq('user_id', user.id);

    const serviceDistribution: Record<string, number> = {};
    servicesData?.forEach((booking: any) => {
      const serviceName = booking.services?.name || 'Unknown';
      serviceDistribution[serviceName] = (serviceDistribution[serviceName] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalBookings,
        upcomingBookings,
        completedBookings,
        cancelledBookings,
        inProgressBookings,
        totalSpent,
        averagePrice,
        completionRate:
          totalBookings > 0 ? Math.round((completedBookings / totalBookings) * 100) : 0,
        cancellationRate:
          totalBookings > 0 ? Math.round((cancelledBookings / totalBookings) * 100) : 0,
      },
      monthlyStats,
      serviceDistribution,
    });
  } catch (error: any) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
