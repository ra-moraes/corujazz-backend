import { Unavailability } from 'src/calendar/domain/entitites/unavailability.domain-entity';
import { UnavailabilityRepository } from 'src/calendar/domain/interfaces/unavailability.repository';
import { UnavailabilityMapper } from '../mappers/unavailability.mapper';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Unavailability as UnavailabilityOrmEntity } from '../entitites/unavailability.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UnavailabilityRepositoryImpl implements UnavailabilityRepository {
  constructor(
    @InjectRepository(UnavailabilityOrmEntity)
    private readonly repo: Repository<UnavailabilityOrmEntity>,
  ) {}

  async save(unavailability: Unavailability): Promise<void> {
    const ormEntity = UnavailabilityMapper.toOrmEntity(unavailability);
    await this.repo.save(ormEntity);
  }

  async delete(unavailability: Unavailability): Promise<void> {
    if (!unavailability.getIdUnavailability()) {
      throw new NotFoundException('Indisponibilidade não existe (id inválido)');
    }

    await this.repo.delete({
      id: unavailability.getIdUnavailability(),
    });
  }

  async find(unavailabilityId: string): Promise<Unavailability | undefined> {
    const ormEntity = await this.repo.findOne({
      where: { id: unavailabilityId },
    });

    if (!ormEntity) {
      return undefined;
    }

    return UnavailabilityMapper.toDomain(ormEntity);
  }
  findAll(): Promise<Unavailability[]> {
    throw new Error('Method not implemented.');
  }
  findByUserId(userId: number): Promise<Unavailability[]> {
    throw new Error('Method not implemented.');
  }
}
