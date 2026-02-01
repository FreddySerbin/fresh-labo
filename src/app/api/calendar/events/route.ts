import { NextRequest, NextResponse } from 'next/server';
import { googleCalendarService } from '@/lib/google-calendar/client';

export const dynamic = 'force-dynamic';

/**
 * GET /api/calendar/events
 * Get calendar events for a date range
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    if (!startDateParam || !endDateParam) {
      return NextResponse.json(
        { success: false, error: 'startDate and endDate parameters are required' },
        { status: 400 }
      );
    }

    const startDate = new Date(startDateParam);
    const endDate = new Date(endDateParam);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json(
        { success: false, error: 'Invalid date format' },
        { status: 400 }
      );
    }

    if (startDate >= endDate) {
      return NextResponse.json(
        { success: false, error: 'startDate must be before endDate' },
        { status: 400 }
      );
    }

    const events = await googleCalendarService.getEvents(startDate, endDate);

    return NextResponse.json({
      success: true,
      events,
      count: events.length,
    });
  } catch (error: any) {
    console.error('Error getting calendar events:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to get calendar events' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/calendar/events
 * Create a new calendar event
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { booking } = body;

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking data is required' },
        { status: 400 }
      );
    }

    // Validate required fields
    const requiredFields = [
      'booking_number',
      'service_name',
      'client_name',
      'client_email',
      'client_phone',
      'address',
      'city',
      'scheduled_date',
      'scheduled_time_slot',
      'estimated_duration',
    ];

    for (const field of requiredFields) {
      if (!booking[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create calendar event
    const eventId = await googleCalendarService.createBookingEvent(booking);

    return NextResponse.json({
      success: true,
      eventId,
      message: 'Calendar event created successfully',
    });
  } catch (error: any) {
    console.error('Error creating calendar event:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create calendar event' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/calendar/events/[eventId]
 * Update an existing calendar event
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventId, updates } = body;

    if (!eventId) {
      return NextResponse.json(
        { success: false, error: 'Event ID is required' },
        { status: 400 }
      );
    }

    if (!updates || Object.keys(updates).length === 0) {
      return NextResponse.json(
        { success: false, error: 'Updates are required' },
        { status: 400 }
      );
    }

    await googleCalendarService.updateEvent(eventId, updates);

    return NextResponse.json({
      success: true,
      message: 'Calendar event updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating calendar event:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update calendar event' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/calendar/events
 * Delete a calendar event
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const eventId = searchParams.get('eventId');

    if (!eventId) {
      return NextResponse.json(
        { success: false, error: 'Event ID is required' },
        { status: 400 }
      );
    }

    await googleCalendarService.deleteEvent(eventId);

    return NextResponse.json({
      success: true,
      message: 'Calendar event deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting calendar event:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete calendar event' },
      { status: 500 }
    );
  }
}
