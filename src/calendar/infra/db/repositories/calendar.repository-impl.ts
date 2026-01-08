import { InjectRepository } from '@nestjs/typeorm';
import {
  Calendar as CalendarOrmEntity,
  CalendarType,
} from '../entitites/calendar.entity';
import { EntityManager, Repository } from 'typeorm';
import { Calendar } from 'src/calendar/domain/entitites/calendar.domain-entity';
import { NotFoundException } from '@nestjs/common';
import {
  CalendarDate,
  CalendarRepository,
} from 'src/calendar/domain/interfaces/calendar.repository';

export class CalendarRepositoryImpl implements CalendarRepository {
  constructor(
    @InjectRepository(CalendarOrmEntity)
    private readonly repo: Repository<CalendarOrmEntity>,
  ) {}

  async isDateAvailable(
    startDate: Date,
    endDate: Date,
    notInCalendarIds?: string[],
  ): Promise<boolean> {
    const qb = this.repo
      .createQueryBuilder('calendar')
      .where(
        '(calendar.dateStart < :endDate AND calendar.dateEnd > :startDate)',
        { startDate, endDate },
      );

    if (notInCalendarIds && notInCalendarIds.length > 0) {
      qb.andWhere('calendar.id NOT IN (:...notInCalendarIds)', {
        notInCalendarIds,
      });
    }

    const conflictingEntries = await qb.getCount();

    return conflictingEntries === 0;
  }

  async delete(calendar: Calendar, manager?: EntityManager): Promise<void> {
    const repository = manager
      ? manager.getRepository(CalendarOrmEntity)
      : this.repo;

    if (!calendar.getId()) {
      throw new NotFoundException('Calendário não existe (id inválido)');
    }

    await repository.delete({
      id: calendar.getId(),
    });
  }

  async findByYearMonth(year: number, month: number): Promise<CalendarDate[]> {
    const startOfMonth = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
    const endOfMonth = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

    return this.findByPeriod(startOfMonth, endOfMonth);
  }

  async findByPeriod(start: Date, end: Date): Promise<CalendarDate[]> {
    start.setUTCHours(0);
    start.setUTCMinutes(0);
    start.setUTCSeconds(0);

    end.setUTCHours(23);
    end.setUTCMinutes(59);
    end.setUTCSeconds(59);

    const calendars = await this.repo
      .createQueryBuilder('calendar')
      .leftJoinAndSelect('calendar.presentations', 'presentation')
      .leftJoinAndSelect('calendar.reservationsForPresentation', 'reservation')
      .leftJoinAndSelect('calendar.unavailabilities', 'unavailability')
      .leftJoinAndSelect('presentation.establishment', 'establishment')
      .leftJoinAndSelect('unavailability.user', 'user')
      .where(
        `
          calendar.dateStart < :end
          AND calendar.dateEnd > :start
        `,
        {
          start,
          end,
        },
      )
      .getMany();

    return calendars.map((calendar) => {
      const { ownerId, title } = this.resolveOwner(calendar);

      return {
        id: calendar.id,
        ownerId,
        title,
        startDate: calendar.dateStart.toISOString(),
        endDate: calendar.dateEnd.toISOString(),
        type: calendar.type,
      };
    });
  }

  private resolveOwner(calendar: CalendarOrmEntity): {
    ownerId?: string;
    title: string;
  } {
    switch (calendar.type) {
      case CalendarType.PRESENTATION: {
        const presentation = calendar.presentations?.[0];
        return {
          ownerId: presentation?.id,
          title: `Show: ${presentation.establishment.name}`,
        };
      }

      case CalendarType.PRESENTATION_DATE_RESERVATION: {
        const reservation = calendar.reservationsForPresentation?.[0];
        return {
          ownerId: reservation?.id,
          title: 'Reserva',
        };
      }

      case CalendarType.UNAVAILABILITY: {
        const unavailability = calendar.unavailabilities?.[0];
        return {
          ownerId: unavailability?.id,
          title: unavailability?.user
            ? `Indisponível: ${unavailability.user.name}`
            : 'Indisponível',
        };
      }

      default:
        return {
          title: 'Evento',
        };
    }
  }
}
