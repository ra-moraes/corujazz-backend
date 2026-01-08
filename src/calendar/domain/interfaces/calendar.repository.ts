import { CalendarType } from 'src/calendar/infra/db/entitites/calendar.entity';
import { Calendar } from '../entitites/calendar.domain-entity';
import { EntityManager } from 'typeorm';

export type CalendarDate = {
  id: string;
  ownerId?: string;
  title: string;
  startDate: string;
  endDate: string;
  type: CalendarType;
};
export interface CalendarRepository {
  isDateAvailable(
    startDate: Date,
    endDate: Date,
    notInCalendarIds?: string[],
  ): Promise<boolean>;
  delete(calendar: Calendar, manager?: EntityManager): Promise<void>;
  findByYearMonth(year: number, month: number): Promise<CalendarDate[]>;
  findByPeriod(start: Date, end: Date): Promise<CalendarDate[]>;
}

export const CALENDAR_REPOSITORY = Symbol('CALENDAR_REPOSITORY');
