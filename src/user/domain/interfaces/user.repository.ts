import { User } from '../entities/user.domain-entity';

export interface UserRepository {
  save(user: User): Promise<void>;
  find(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[] | null>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
