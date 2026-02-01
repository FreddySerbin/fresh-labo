import { google } from 'googleapis';

export interface CalendarEvent {
  summary: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  location?: string;
  attendees?: Array<{ email: string }>;
  reminders?: {
    useDefault: boolean;
    overrides?: Array<{
      method: 'email' | 'popup';
      minutes: number;
    }>;
  };
}

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

class GoogleCalendarService {
  private calendar;
  private calendarId: string;

  constructor() {
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    // Set refresh token if available
    if (process.env.GOOGLE_REFRESH_TOKEN) {
      auth.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      });
    }

    this.calendar = google.calendar({ version: 'v3', auth });
    this.calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
  }

  /**
   * Create a new calendar event
   */
  async createEvent(event: CalendarEvent): Promise<string> {
    try {
      const response = await this.calendar.events.insert({
        calendarId: this.calendarId,
        requestBody: event,
        sendUpdates: 'all',
      });

      return response.data.id || '';
    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw new Error('Failed to create calendar event');
    }
  }

  /**
   * Update an existing calendar event
   */
  async updateEvent(eventId: string, event: Partial<CalendarEvent>): Promise<void> {
    try {
      await this.calendar.events.patch({
        calendarId: this.calendarId,
        eventId,
        requestBody: event,
        sendUpdates: 'all',
      });
    } catch (error) {
      console.error('Error updating calendar event:', error);
      throw new Error('Failed to update calendar event');
    }
  }

  /**
   * Delete a calendar event
   */
  async deleteEvent(eventId: string): Promise<void> {
    try {
      await this.calendar.events.delete({
        calendarId: this.calendarId,
        eventId,
        sendUpdates: 'all',
      });
    } catch (error) {
      console.error('Error deleting calendar event:', error);
      throw new Error('Failed to delete calendar event');
    }
  }

  /**
   * Get available time slots for a specific date
   */
  async getAvailableSlots(date: Date): Promise<TimeSlot[]> {
    try {
      // Define business hours (8h-12h morning, 14h-18h afternoon)
      const slots: TimeSlot[] = [
        {
          start: this.formatDateTime(date, 8, 0),
          end: this.formatDateTime(date, 12, 0),
          available: true,
        },
        {
          start: this.formatDateTime(date, 14, 0),
          end: this.formatDateTime(date, 18, 0),
          available: true,
        },
      ];

      // Get existing events for the day
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const response = await this.calendar.events.list({
        calendarId: this.calendarId,
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      });

      const events = response.data.items || [];

      // Mark slots as unavailable if there are conflicting events
      events.forEach((event) => {
        if (!event.start?.dateTime || !event.end?.dateTime) return;

        const eventStart = new Date(event.start.dateTime);
        const eventEnd = new Date(event.end.dateTime);

        slots.forEach((slot) => {
          const slotStart = new Date(slot.start);
          const slotEnd = new Date(slot.end);

          // Check if event overlaps with slot
          if (
            (eventStart >= slotStart && eventStart < slotEnd) ||
            (eventEnd > slotStart && eventEnd <= slotEnd) ||
            (eventStart <= slotStart && eventEnd >= slotEnd)
          ) {
            slot.available = false;
          }
        });
      });

      return slots;
    } catch (error) {
      console.error('Error getting available slots:', error);
      throw new Error('Failed to get available slots');
    }
  }

  /**
   * Check if a specific time slot is available
   */
  async isSlotAvailable(start: Date, end: Date): Promise<boolean> {
    try {
      const response = await this.calendar.events.list({
        calendarId: this.calendarId,
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
        singleEvents: true,
      });

      const events = response.data.items || [];
      return events.length === 0;
    } catch (error) {
      console.error('Error checking slot availability:', error);
      return false;
    }
  }

  /**
   * Get events for a date range
   */
  async getEvents(startDate: Date, endDate: Date): Promise<any[]> {
    try {
      const response = await this.calendar.events.list({
        calendarId: this.calendarId,
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      });

      return response.data.items || [];
    } catch (error) {
      console.error('Error getting events:', error);
      return [];
    }
  }

  /**
   * Helper to format date and time
   */
  private formatDateTime(date: Date, hours: number, minutes: number): string {
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);
    return newDate.toISOString();
  }

  /**
   * Create event for a booking
   */
  async createBookingEvent(booking: {
    booking_number: string;
    service_name: string;
    client_name: string;
    client_email: string;
    client_phone: string;
    address: string;
    city: string;
    scheduled_date: string;
    scheduled_time_slot: 'morning' | 'afternoon';
    estimated_duration: number;
  }): Promise<string> {
    const date = new Date(booking.scheduled_date);
    const startHour = booking.scheduled_time_slot === 'morning' ? 8 : 14;
    const endHour = startHour + Math.ceil(booking.estimated_duration / 60);

    const event: CalendarEvent = {
      summary: `${booking.service_name} - ${booking.client_name}`,
      description: `
🧼 Fresh Lab'O - Intervention

📋 Réservation N° ${booking.booking_number}

👤 Client: ${booking.client_name}
📧 Email: ${booking.client_email}
📞 Téléphone: ${booking.client_phone}

📍 Adresse:
${booking.address}
${booking.city}

⏱️ Durée estimée: ${booking.estimated_duration} minutes

---
Fresh Lab'O - Service de nettoyage professionnel
06 95 05 77 96 | contact@freshlabo.com
      `.trim(),
      start: {
        dateTime: this.formatDateTime(date, startHour, 0),
        timeZone: 'Europe/Paris',
      },
      end: {
        dateTime: this.formatDateTime(date, endHour, 0),
        timeZone: 'Europe/Paris',
      },
      location: `${booking.address}, ${booking.city}`,
      attendees: [{ email: booking.client_email }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'email', minutes: 2 * 60 }, // 2 hours before
          { method: 'popup', minutes: 30 }, // 30 minutes before
        ],
      },
    };

    return this.createEvent(event);
  }
}

// Export singleton instance
export const googleCalendarService = new GoogleCalendarService();
