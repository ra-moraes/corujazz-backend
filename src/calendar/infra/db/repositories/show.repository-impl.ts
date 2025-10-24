import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowRepository } from 'src/calendar/domain/interfaces/show.repository';
import { Show as ShowOrmEntity } from '../entitites/show.entity';
import { Repository } from 'typeorm';
import { Show } from 'src/calendar/domain/entitites/show.domain-entity';
import { ShowMapper } from '../mappers/show.mapper';

@Injectable()
export class ShowRepositoryImpl implements ShowRepository {
  constructor(
    @InjectRepository(ShowOrmEntity)
    private readonly repo: Repository<ShowOrmEntity>,
  ) {}

  async find(showId: string): Promise<Show | undefined> {
    const ormEntity = await this.repo.findOneBy({ id: showId });
    return ormEntity ? ShowMapper.toDomain(ormEntity) : undefined;
  }

  async save(show: Show): Promise<void> {
    const ormEntity = ShowMapper.toOrmEntity(show);
    await this.repo.save(ormEntity);
  }

  async findAll(): Promise<Show[]> {
    const ormEntities = await this.repo.find();
    return ormEntities.map((showOrm: ShowOrmEntity) =>
      ShowMapper.toDomain(showOrm),
    );
  }
}
