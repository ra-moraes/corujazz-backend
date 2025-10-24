import { Calendar } from './calendar.domain-entity';
import { randomUUID } from 'crypto';
import { UserId } from '../value-objects/user-id.vo';
import { Show } from './show.domain-entity';
import { Establishment } from './establishment.domain-entity';

export class ReservationForPresentation extends Calendar {
  private readonly idReservationForPresentation: string;

  constructor(
    private readonly userId: UserId,
    startDate: Date,
    endDate: Date,
    idReservationForPresentation?: string,
    idCalendar?: string,
    private readonly observations?: string,
    private readonly show?: Show,
    private readonly establishment?: Establishment,
    private readonly value?: number,
  ) {
    super(startDate, endDate, idCalendar);

    this.idReservationForPresentation =
      idReservationForPresentation ?? randomUUID();
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
