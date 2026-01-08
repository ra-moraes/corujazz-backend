import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Unavailability } from './unavailability.entity';
import { ReservationForPresentation } from './reservation-for-presentation.entity';
import { Presentation } from './presentation.entity';

export enum CalendarType {
  UNAVAILABILITY = 'unavailability',
  PRESENTATION_DATE_RESERVATION = 'presentation-date-reservation',
  PRESENTATION = 'presentation',
}

@Entity('calendars')
export class Calendar {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  dateStart: Date;

  @Column({ type: 'timestamp' })
  dateEnd: Date;

  @Column({
    type: 'enum',
    enum: CalendarType,
  })
  type: CalendarType;

  @Column({ nullable: true })
  externalCalendarId?: string;

  @OneToMany(() => Unavailability, (unavailability) => unavailability.calendar)
  unavailabilities!: Unavailability[];

  @OneToMany(
    () => ReservationForPresentation,
    (reservationsForPresentation) => reservationsForPresentation.calendar,
  )
  reservationsForPresentation!: ReservationForPresentation[];

  @OneToMany(() => Presentation, (presentation) => presentation.calendar)
  presentations!: Presentation[];
}
