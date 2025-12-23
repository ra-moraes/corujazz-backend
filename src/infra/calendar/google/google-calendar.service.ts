import { Injectable } from '@nestjs/common';
import { Calendar, CreatedEvent } from '../calendar.interface';
import { calendar_v3, google } from 'googleapis';

@Injectable()
export class GoogleCalendarService implements Calendar {
  private calendarApi: calendar_v3.Calendar;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    this.calendarApi = google.calendar({
      version: 'v3',
      auth,
    });
  }

  async createEvent(
    summary: string,
    startDateTime: string,
    endDateTime: string,
  ): Promise<CreatedEvent> {
    const event = await this.calendarApi.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_CALENDAR_ID || '',
      requestBody: {
        summary,
        start: { dateTime: startDateTime },
        end: { dateTime: endDateTime },
      },
    });

    return { id: event.data.id! };
  }
}
