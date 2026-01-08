import { Calendar } from './calendar.domain-entity';
import { randomUUID } from 'crypto';
import { UserId } from '../value-objects/user-id.vo';
import { Show } from './show.domain-entity';
import { Establishment } from './establishment.domain-entity';
import { DateTimeRange } from '../value-objects/date-time-range.vo';
import { DomainStateError } from '../interfaces/domain-checkable-state.interface';

export class ReservationForPresentation extends Calendar {
  private readonly idReservationForPresentation: string;

  constructor(
    private readonly userId: UserId,
    reservationRange: DateTimeRange,
    idReservationForPresentation?: string,
    idCalendar?: string,
    private readonly observations?: string,
    private readonly show?: Show,
    private readonly establishment?: Establishment,
    private readonly value?: number,
  ) {
    super(
      reservationRange.getStartDateTime(),
      reservationRange.getEndDateTime(),
      idCalendar,
    );

    this.idReservationForPresentation =
      idReservationForPresentation ?? randomUUID();

    this.validateState();
  }

  checkState(): DomainStateError[] {
    return [];
  }

  getUserId(): UserId {
    return this.userId;
  }

  getCalendarId(): string {
    return super.getId();
  }

  getIdReservationForPresentation(): string {
    return this.idReservationForPresentation;
  }

  getObservations(): string | undefined {
    return this.observations;
  }

  getShow(): Show | undefined {
    return this.show;
  }

  getEstablishment(): Establishment | undefined {
    return this.establishment;
  }

  getValue(): number | undefined {
    return this.value;
  }
}
