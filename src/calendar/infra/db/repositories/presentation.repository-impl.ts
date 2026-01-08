import { Injectable, NotFoundException } from '@nestjs/common';
import { Presentation as PresentationOrm } from '../entitites/presentation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { PresentationRepository } from 'src/calendar/domain/interfaces/presentation.repository';
import { Presentation } from 'src/calendar/domain/entitites/presentation.domain-entity';
import { PresentationMapper } from '../mappers/presentation.mapper';
import { Calendar as CalendarOrm } from '../entitites/calendar.entity';

@Injectable()
export class PresentationRepositoryImpl implements PresentationRepository {
  constructor(
    @InjectRepository(PresentationOrm)
    private readonly presentationRepo: Repository<PresentationOrm>,
    @InjectRepository(CalendarOrm)
    private readonly calendarRepo: Repository<CalendarOrm>,
  ) {}

  async save(
    presentation: Presentation,
    manager?: EntityManager,
  ): Promise<void> {
    const presentationRepo = manager
      ? manager.getRepository(PresentationOrm)
      : this.presentationRepo;
    const calendarRepo = manager
      ? manager.getRepository(CalendarOrm)
      : this.calendarRepo;

    const ormEntity = PresentationMapper.toOrmEntity(presentation);
    
    await calendarRepo.save(ormEntity.calendar);
    await presentationRepo.save(ormEntity);
  }

  async delete(
    presentation: Presentation,
    manager?: EntityManager,
  ): Promise<void> {
    const repository = manager
      ? manager.getRepository(PresentationOrm)
      : this.presentationRepo;

    if (!presentation.getIdPresentation()) {
      throw new NotFoundException('Apresentação não existe (id inválido)');
    }

    await repository.delete({
      id: presentation.getIdPresentation(),
    });
  }

  async find(presentationId: string): Promise<Presentation | undefined> {
    const ormEntity = await this.presentationRepo.findOne({
      where: { id: presentationId },
      relations: ['show', 'establishment', 'calendar'],
    });

    if (!ormEntity) {
      return undefined;
    }

    return PresentationMapper.toDomain(ormEntity);
  }

  findAll(): Promise<Presentation[]> {
    throw new Error('Method not implemented.');
  }

  // findByUserId(userId: number): Promise<Presentation[]> {
  findByUserId(): Promise<Presentation[]> {
    throw new Error('Method not implemented.');
  }
}
