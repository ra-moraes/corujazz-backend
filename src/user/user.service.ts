import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRole } from './domain/user-role.enum';
import { User } from './domain/entities/user.domain-entity';
import {
  USER_REPOSITORY,
  type UserRepository,
} from './domain/interfaces/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  async create(
    email: string,
    password: string,
    role: UserRole,
    name: string,
  ): Promise<User> {
    const hash: string = await bcrypt.hash(password, 10);
    const user = new User(email, hash, role, name);

    await this.userRepo.save(user);

    return user;
  }

  async load(id: string): Promise<User | null> {
    return this.userRepo.find(id);
  }
}
