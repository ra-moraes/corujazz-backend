import { Unavailability } from '../entitites/unavailability.domain-entity';

export interface UnavailabilityRepository {
  save(unavailability: Unavailability): Promise<void>;
  delete(unavailability: Unavailability): Promise<void>;
  find(unavailabilityId: string): Promise<Unavailability | undefined>;
  findAll(): Promise<Unavailability[]>;
  findByUserId(userId: number): Promise<Unavailability[]>;
}

export const UNAVAILABILITY_REPOSITORY = Symbol('UNAVAILABILITY_REPOSITORY');
