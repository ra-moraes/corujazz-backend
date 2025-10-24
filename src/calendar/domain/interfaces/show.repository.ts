import { Show } from '../entitites/show.domain-entity';

export interface ShowRepository {
  save(show: Show): Promise<void>;
  find(showId: string): Promise<Show | undefined>;
  findAll(): Promise<Show[]>;
}

export const SHOW_REPOSITORY = Symbol('SHOW_REPOSITORY');
