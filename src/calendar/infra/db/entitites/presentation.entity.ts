import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Calendar } from './calendar.entity';
import { Show } from './show.entity';
import { Establishment } from './establishment.entity';

@Entity('presentation_calendars')
export class Presentation {
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
    nullable: false,
  })
  @JoinColumn({ name: 'showId' })
  show: Show;

  @Column({ type: 'uuid', nullable: false })
  showId: string;

  @ManyToOne(() => Establishment, {
    cascade: false,
    eager: true,
    onDelete: 'NO ACTION',
    nullable: false,
  })
  @JoinColumn({ name: 'establishmentId' })
  establishment: Establishment;

  @Column({ type: 'uuid', nullable: false })
  establishmentId: string;

  @Column({ nullable: false })
  value: number;

  @Column({ nullable: false })
  duration: number;

  @Column({ type: 'timestamp' })
  presentationStart: Date;

  @Column({ type: 'timestamp' })
  presentationEnd: Date;

  @Column({ type: 'timestamp' })
  soundCheckStart: Date;

  @Column({ type: 'timestamp' })
  soundCheckEnd: Date;
}
