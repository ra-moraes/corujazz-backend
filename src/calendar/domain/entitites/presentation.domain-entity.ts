import { randomUUID } from 'crypto';
import { UserId } from '../value-objects/user-id.vo';
import { Calendar } from './calendar.domain-entity';
import { Establishment } from './establishment.domain-entity';
import { Show } from './show.domain-entity';
import { DateTimeRange } from '../value-objects/date-time-range.vo';
import { DomainStateError } from '../interfaces/domain-checkable-state.interface';

export class Presentation extends Calendar {
  private readonly idPresentation: string;

  constructor(
    private readonly userId: UserId,
    private soundCheckDateRange: DateTimeRange,
    private presentationDateRange: DateTimeRange,
    private duration: number,
    private show: Show,
    private value: number,
    private establishment: Establishment,
    private observations?: string,
    idPresentation?: string,
    idCalendar?: string,
  ) {
    const startDate = soundCheckDateRange.getStartDateTime();
    const endDate = presentationDateRange.getEndDateTime();

    super(startDate, endDate, idCalendar);

    this.idPresentation = idPresentation ?? randomUUID();
    this.validateState();
  }

  checkState(): DomainStateError[] {
    const errors: DomainStateError[] = [];

    if (!this.soundCheckDateRange.endsBefore(this.presentationDateRange)) {
      errors.push({
        field: 'soundCheck',
        message: 'Soundcheck deve terminar antes da apresentação',
      });
    }

    if (this.duration <= 0) {
      errors.push({
        field: 'soundCheck',
        message: 'Soundcheck deve terminar antes da apresentação',
      });
    }

    return errors;
  }

  update(presentationUpdateData: {
    soundCheckDateRange?: DateTimeRange;
    presentationDateRange?: DateTimeRange;
    duration?: number;
    show?: Show;
    value?: number;
    establishment?: Establishment;
    observations?: string;
  }) {
    this.soundCheckDateRange =
      presentationUpdateData.soundCheckDateRange ?? this.soundCheckDateRange;
    this.presentationDateRange =
      presentationUpdateData.presentationDateRange ??
      this.presentationDateRange;
    this.duration = presentationUpdateData.duration ?? this.duration;
    this.show = presentationUpdateData.show ?? this.show;
    this.value = presentationUpdateData.value ?? this.value;
    this.establishment =
      presentationUpdateData.establishment ?? this.establishment;
    this.observations =
      presentationUpdateData.observations ?? this.observations;

    this.updateCalendarRange(
      this.soundCheckDateRange.getStartDateTime(),
      this.presentationDateRange.getEndDateTime(),
    );

    this.validateState();
  }

  getIdPresentation(): string | undefined {
    return this.idPresentation;
  }

  getCalendarId(): string {
    return super.getId();
  }

  getUserId(): UserId {
    return this.userId;
  }

  getSoundCheckDateRange(): DateTimeRange {
    return this.soundCheckDateRange;
  }

  getPresentationDateRange(): DateTimeRange {
    return this.presentationDateRange;
  }

  getDuration(): number {
    return this.duration;
  }

  getShow(): Show {
    return this.show;
  }

  getObservations(): string | undefined {
    return this.observations;
  }

  getEstablishment(): Establishment {
    return this.establishment;
  }

  getValue(): number {
    return this.value;
  }
}
