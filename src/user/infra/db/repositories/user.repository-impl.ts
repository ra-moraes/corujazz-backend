import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserOrmEntity } from 'src/user/infra/db/entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import { User } from 'src/user/domain/entities/user.domain-entity';
import { UserRepository } from 'src/user/domain/interfaces/user.repository';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repo: Repository<UserOrmEntity>,
  ) {}

  async save(user: User): Promise<void> {
    const ormEntity = UserMapper.toOrmEntity(user);
    await this.repo.save(ormEntity);
  }

  async findByEmail(email: string): Promise<User | null> {
    const ormEntity = await this.repo.findOne({ where: { email } });

    return ormEntity ? UserMapper.toDomain(ormEntity) : null;
  }

  async findAll(): Promise<User[]> {
    const ormEntities = await this.repo.find();
    return ormEntities.map((user: UserOrmEntity) => UserMapper.toDomain(user));
  }

  async find(id: string): Promise<User | null> {
    const ormEntity = await this.repo.findOne({ where: { id } });

    return ormEntity ? UserMapper.toDomain(ormEntity) : null;
  }
}
