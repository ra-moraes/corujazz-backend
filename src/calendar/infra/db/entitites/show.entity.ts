import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('shows')
export class Show {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  baseValue: number;
}
