import { Injectable, NotFoundException } from '@nestjs/common';
import { ReservationForPresentation as ReservationForPresentationOrm } from '../entitites/reservation-for-presentation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ReservationForPresentationRepository } from 'src/calendar/domain/interfaces/reservation-for-presentation.repository';
import { ReservationForPresentation } from 'src/calendar/domain/entitites/reservation-for-presentation.domain-entity';
import { ReservationForPresentationMapper } from '../mappers/reservation-for-presentation.mapper';

@Injectable()
export class ReservationForPresentationRepositoryImpl
  implements ReservationForPresentationRepository
{
  constructor(
    @InjectRepository(ReservationForPresentationOrm)
    private readonly repo: Repository<ReservationForPresentationOrm>,
  ) {}

  async save(
    reservation: ReservationForPresentation,
    manager?: EntityManager,
  ): Promise<void> {
    const repository = manager
      ? manager.getRepository(ReservationForPresentationOrm)
      : this.repo;

    const ormEntity = ReservationForPresentationMapper.toOrmEntity(reservation);
    await repository.save(ormEntity);
  }

  async delete(
    reservation: ReservationForPresentation,
    manager?: EntityManager,
  ): Promise<void> {
    const repository = manager
      ? manager.getRepository(ReservationForPresentationOrm)
      : this.repo;

    if (!reservation.getIdReservationForPresentation()) {
      throw new NotFoundException('Reserva não existe (id inválido)');
    }

    await repository.delete({
      id: reservation.getIdReservationForPresentation(),
    });
  }

  async find(
    reservationId: string,
  ): Promise<ReservationForPresentation | undefined> {
    const ormEntity = await this.repo.findOne({
      where: { id: reservationId },
      relations: ['show', 'establishment', 'calendar'],
    });

    if (!ormEntity) {
      return undefined;
    }

    return ReservationForPresentationMapper.toDomain(ormEntity);
  }

  findAll(): Promise<ReservationForPresentation[]> {
    throw new Error('Method not implemented.');
  }

  // findByUserId(userId: number): Promise<ReservationForPresentation[]> {
  findByUserId(): Promise<ReservationForPresentation[]> {
    throw new Error('Method not implemented.');
  }
}
