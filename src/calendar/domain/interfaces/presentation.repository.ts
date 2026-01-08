import { EntityManager } from 'typeorm';
import { Presentation } from '../entitites/presentation.domain-entity';

export interface PresentationRepository {
  save(reservation: Presentation, manager?: EntityManager): Promise<void>;
  delete(reservation: Presentation, manager?: EntityManager): Promise<void>;
  find(reservationId: string): Promise<Presentation | undefined>;
  findAll(): Promise<Presentation[]>;
  findByUserId(userId: number): Promise<Presentation[]>;
}

export const PRESENTATION_REPOSITORY = Symbol('PRESENTATION_REPOSITORY');
