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

export class UnavailabilityService {
  constructor(
    @Inject(UNAVAILABILITY_REPOSITORY)
    private readonly unavailabilityRepo: UnavailabilityRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
    @Inject(CALENDAR_REPOSITORY)
    private readonly calendarRepo: CalendarRepository,
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

    await this.unavailabilityRepo.save(unavailability);

    return unavailability;
  }

  async delete(unavailabilityId: string): Promise<void> {
    const unavailability = await this.unavailabilityRepo.find(unavailabilityId);

    if (!unavailability) {
      throw new NotFoundException('Indisponibilidade não encontrada');
    }

    await this.calendarRepo.delete(unavailability);
    await this.unavailabilityRepo.delete(unavailability);
  }
}
