import { CalendarType } from '../infra/db/entitites/calendar.entity';

export class CalendarResponseDto {
  id: string;
  ownerId?: string;
  title: string;
  startDate: string;
  endDate: string;
  type: CalendarType;
}
