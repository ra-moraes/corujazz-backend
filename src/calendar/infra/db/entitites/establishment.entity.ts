import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('establishments')
export class Establishment {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  distance: number;

  @Column()
  contactPhone: string;

  @Column()
  contactName: string;
}
