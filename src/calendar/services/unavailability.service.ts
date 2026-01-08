import { ConflictException, Inject, NotFoundException } from '@nestjs/common';
import { Unavailability } from '../domain/entitites/unavailability.domain-entity';
import {
  UNAVAILABILITY_REPOSITORY,
  type UnavailabilityRepository,
} from '../domain/interfaces/unavailability.repository';
import { UserId } from '../domain/value-objects/user-id.vo';
import {
  USER_REPOSITORY,
  type UserRepository,
} from 'src/user/domain/interfaces/user.repository';
import {
  CALENDAR_REPOSITORY,
  type CalendarRepository,
} from '../domain/interfaces/calendar.repository';
import { type Calendar, CALENDAR } from 'src/infra/calendar/calendar.interface';
import { UnavailabilityWithUserName } from '../dto/unavailability-with-user,dto';

export class UnavailabilityService {
  constructor(
    @Inject(UNAVAILABILITY_REPOSITORY)
    private readonly unavailabilityRepo: UnavailabilityRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
    @Inject(CALENDAR_REPOSITORY)
    private readonly calendarRepo: CalendarRepository,
    @Inject(CALENDAR)
    private readonly externalCalendarService: Calendar,
  ) {}

  async create(
    reason: string,
    startDate: Date,
    endDate: Date,
    userId: string,
  ): Promise<Unavailability> {
    const unavailability = new Unavailability(
      reason,
      UserId.create(userId),
      startDate,
      endDate,
    );

    const user = await this.userRepo.find(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const isAvailable = await this.calendarRepo.isDateAvailable(
      startDate,
      endDate,
    );
    if (!isAvailable) {
      throw new ConflictException('O período selecionado não está disponível');
    }

    const externalCalendarEvent =
      await this.externalCalendarService.createEvent(
        `Indisponibilidade: ${user.getName()}`,
        `<b>Motivo:<b/> ${unavailability.getReason()}`,
        unavailability.getStartDate().toISOString(),
        unavailability.getEndDate().toISOString(),
      );
    unavailability.setExternalCalendarId(externalCalendarEvent.id);

    await this.unavailabilityRepo.save(unavailability);

    return unavailability;
  }

  async delete(unavailabilityId: string, userId: string): Promise<void> {
    const unavailability = await this.unavailabilityRepo.find(unavailabilityId);

    if (!unavailability) {
      throw new NotFoundException('Indisponibilidade não encontrada');
    }

    if (unavailability.getUserId().getId() !== userId) {
      throw new ConflictException(
        'Não é possível excluir esta indisponibilidade.',
      );
    }

    const externalCalendarId = unavailability.getExternalCalendarId();
    if (externalCalendarId) {
      await this.externalCalendarService.removeEvent(externalCalendarId);
    }

    await this.calendarRepo.delete(unavailability);
    await this.unavailabilityRepo.delete(unavailability);
  }

  async getUnavailability(
    unavailabilityId: string,
    userId: string,
  ): Promise<UnavailabilityWithUserName> {
    const unavailability = await this.unavailabilityRepo.find(unavailabilityId);

    if (!unavailability) {
      throw new NotFoundException('Indisponibilidade não encontrada');
    }

    const user = await this.userRepo.find(unavailability.getUserId().getId());

    if (!user) {
      throw new NotFoundException('Indisponibilidade não encontrada (usuário)');
    }

    return Object.assign(unavailability, {
      userName: user.getName(),
      canDelete: unavailability.getUserId().getId() === userId,
    });
  }
}
