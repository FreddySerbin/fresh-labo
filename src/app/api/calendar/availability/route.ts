import { NextRequest, NextResponse } from 'next/server';
import { googleCalendarService } from '@/lib/google-calendar/client';

export const dynamic = 'force-dynamic';

/**
 * GET /api/calendar/availability
 * Get available time slots for a specific date
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get('date');

    if (!dateParam) {
      return NextResponse.json(
        { success: false, error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    const date = new Date(dateParam);

    if (isNaN(date.getTime())) {
      return NextResponse.json(
        { success: false, error: 'Invalid date format' },
        { status: 400 }
      );
    }

    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      return NextResponse.json(
        { success: false, error: 'Cannot check availability for past dates' },
        { status: 400 }
      );
    }

    // Get available slots from Google Calendar
    const slots = await googleCalendarService.getAvailableSlots(date);

    return NextResponse.json({
      success: true,
      date: dateParam,
      slots,
    });
  } catch (error: any) {
    console.error('Error checking availability:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to check availability' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/calendar/availability
 * Check if a specific time slot is available
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, timeSlot } = body;

    if (!date || !timeSlot) {
      return NextResponse.json(
        { success: false, error: 'Date and timeSlot are required' },
        { status: 400 }
      );
    }

    if (!['morning', 'afternoon'].includes(timeSlot)) {
      return NextResponse.json(
        { success: false, error: 'Invalid timeSlot. Must be "morning" or "afternoon"' },
        { status: 400 }
      );
    }

    const targetDate = new Date(date);
    const startHour = timeSlot === 'morning' ? 8 : 14;
    const endHour = timeSlot === 'morning' ? 12 : 18;

    const start = new Date(targetDate);
    start.setHours(startHour, 0, 0, 0);

    const end = new Date(targetDate);
    end.setHours(endHour, 0, 0, 0);

    const isAvailable = await googleCalendarService.isSlotAvailable(start, end);

    return NextResponse.json({
      success: true,
      date,
      timeSlot,
      available: isAvailable,
    });
  } catch (error: any) {
    console.error('Error checking slot availability:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to check slot availability' },
      { status: 500 }
    );
  }
}
