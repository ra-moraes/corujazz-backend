import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Calendar } from './calendar.entity';

@Entity('unavailability_calendars')
export class Unavailability {
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

  @Column()
  reason: string;
}
