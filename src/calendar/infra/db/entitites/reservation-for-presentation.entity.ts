import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Calendar } from './calendar.entity';
import { Show } from './show.entity';
import { Establishment } from './establishment.entity';

@Entity('reservation_for_presentation_calendars')
export class ReservationForPresentation {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  userId!: string;

  @ManyToOne(() => Calendar, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'calendarId' })
  calendar!: Calendar;

  @Column({ type: 'uuid' })
  calendarId!: string;

  @Column({ nullable: true })
  observations?: string;

  @ManyToOne(() => Show, {
    cascade: false,
    eager: true,
    onDelete: 'NO ACTION',
    nullable: true,
  })
  @JoinColumn({ name: 'showId' })
  show?: Show;

  @Column({ type: 'uuid', nullable: true })
  showId?: string;

  @ManyToOne(() => Establishment, {
    cascade: false,
    eager: true,
    onDelete: 'NO ACTION',
    nullable: true,
  })
  @JoinColumn({ name: 'establishmentId' })
  establishment?: Establishment;

  @Column({ type: 'uuid', nullable: true })
  establishmentId?: string;

  @Column({ nullable: true })
  value?: number;
}
