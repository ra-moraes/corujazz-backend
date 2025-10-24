import { Calendar } from '../entitites/calendar.domain-entity';

export interface CalendarRepository {
  isDateAvailable(startDate: Date, endDate: Date): Promise<boolean>;
  delete(calendar: Calendar): Promise<void>;
}

export const CALENDAR_REPOSITORY = Symbol('CALENDAR_REPOSITORY');
