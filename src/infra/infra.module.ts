import { Module } from '@nestjs/common';
import { CALENDAR } from './calendar/calendar.interface';
import { GoogleCalendarService } from './calendar/google/google-calendar.service';

@Module({
  providers: [
    {
      provide: CALENDAR,
      useClass: GoogleCalendarService,
    },
  ],
  exports: [CALENDAR],
})
export class InfraModule {}
