import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  CALENDAR_REPOSITORY,
  CalendarDate,
  type CalendarRepository,
} from '../domain/interfaces/calendar.repository';

@Injectable()
export class CalendarService {
  constructor(
    @Inject(CALENDAR_REPOSITORY)
    private readonly calendarRepo: CalendarRepository,
  ) {}

  async getCalendarsByYearMonth(
    year: number,
    month: number,
  ): Promise<CalendarDate[]> {
    if (month > 12 || month < 0) {
      throw new BadRequestException(
        `O mês ${month} informado é inválido (1-12)`,
      );
    }

    return this.calendarRepo.findByYearMonth(year, month);
  }

  async getCalendarsByPeriod(start: Date, end: Date): Promise<CalendarDate[]> {
    if (start > end) {
      throw new BadRequestException(`Período inválido`);
    }

    return this.calendarRepo.findByPeriod(start, end);
  }
}
