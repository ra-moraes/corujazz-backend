import { InjectRepository } from '@nestjs/typeorm';
import { Calendar as CalendarOrmEntity } from '../entitites/calendar.entity';
import { Repository } from 'typeorm';
import { Calendar } from 'src/calendar/domain/entitites/calendar.domain-entity';
import { NotFoundException } from '@nestjs/common';

export class CalendarRepositoryImpl implements CalendarRepositoryImpl {
  constructor(
    @InjectRepository(CalendarOrmEntity)
    private readonly repo: Repository<CalendarOrmEntity>,
  ) {}

  async isDateAvailable(startDate: Date, endDate: Date): Promise<boolean> {
    const conflictingEntries = await this.repo
      .createQueryBuilder('calendar')
      .where(
        '(calendar.dateStart < :endDate AND calendar.dateEnd > :startDate)',
        { startDate, endDate },
      )
      .getCount();

    return conflictingEntries === 0;
  }

  async delete(calendar: Calendar): Promise<void> {
    if (!calendar.getId()) {
      throw new NotFoundException('Calendário não existe (id inválido)');
    }

    await this.repo.delete({
      id: calendar.getId(),
    });
  }
}
