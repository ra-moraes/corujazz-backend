import { UserRole } from '../../../domain/user-role.enum';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.EQUIPE })
  role: UserRole;

  @Column({ type: 'varchar', nullable: true })
  name: string | null;
}
