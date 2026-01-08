import { DomainStateError } from '../interfaces/domain-checkable-state.interface';
import { UserId } from '../value-objects/user-id.vo';
import { Calendar } from './calendar.domain-entity';
import { randomUUID } from 'crypto';

export class Unavailability extends Calendar {
  private readonly idUnavailability: string;

  constructor(
    private readonly reason: string,
    private readonly userId: UserId,
    startDate: Date,
    endDate: Date,
    idUnavailability?: string,
    idCalendar?: string,
  ) {
    super(startDate, endDate, idCalendar);

    this.idUnavailability = idUnavailability ?? randomUUID();

    this.validateState();
  }

  checkState(): DomainStateError[] {
    return [];
  }

  getReason(): string {
    return this.reason;
  }

  getUserId(): UserId {
    return this.userId;
  }

  getCalendarId(): string {
    return super.getId();
  }

  getIdUnavailability(): string {
    return this.idUnavailability;
  }
}
