import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Establishment as EstablishmentOrmEntity } from '../entitites/establishment.entity';
import { Repository } from 'typeorm';
import { EstablishmentRepository } from 'src/calendar/domain/interfaces/establishment.repository';
import { EstablishmentMapper } from '../mappers/establishment.mapper';
import { Establishment } from 'src/calendar/domain/entitites/establishment.domain-entity';

@Injectable()
export class EstablishmentRepositoryImpl implements EstablishmentRepository {
  constructor(
    @InjectRepository(EstablishmentOrmEntity)
    private readonly repo: Repository<EstablishmentOrmEntity>,
  ) {}

  async find(establishmentId: string): Promise<Establishment | undefined> {
    const ormEntity = await this.repo.findOneBy({ id: establishmentId });
    return ormEntity ? EstablishmentMapper.toDomain(ormEntity) : undefined;
  }

  async save(establishment: Establishment): Promise<void> {
    const ormEntity = EstablishmentMapper.toOrmEntity(establishment);
    await this.repo.save(ormEntity);
  }

  async findAll(): Promise<Establishment[]> {
    const ormEntities = await this.repo.find();
    return ormEntities.map((establishmentOrm: EstablishmentOrmEntity) =>
      EstablishmentMapper.toDomain(establishmentOrm),
    );
  }
}
