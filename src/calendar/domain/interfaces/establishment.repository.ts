import { Establishment } from '../entitites/establishment.domain-entity';

export interface EstablishmentRepository {
  save(show: Establishment): Promise<void>;
  find(establishmentId: string): Promise<Establishment | undefined>;
  findAll(): Promise<Establishment[]>;
}

export const ESTABLISHMENT_REPOSITORY = Symbol('ESTABLISHMENT_REPOSITORY');
