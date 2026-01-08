import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CalendarResponseDto } from '../dto/calendar-response.dto';
import { CalendarService } from '../services/calendar.service';

@Controller('calendar')
@UseGuards(JwtAuthGuard)
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get('month/:year/:month')
  async getByMonth(
    @Param('year') year: number,
    @Param('month') month: number,
  ): Promise<CalendarResponseDto[]> {
    return this.calendarService.getCalendarsByYearMonth(year, month);
  }

  @Get('period/:start/:end')
  async getByPeriod(
    @Param('start') start: string,
    @Param('end') end: string,
  ): Promise<CalendarResponseDto[]> {
    const startDate = new Date(start);
    const endDate = new Date(end);

    return this.calendarService.getCalendarsByPeriod(startDate, endDate);
  }
}
