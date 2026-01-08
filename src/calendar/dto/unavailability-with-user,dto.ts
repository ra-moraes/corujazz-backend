import { Unavailability } from '../domain/entitites/unavailability.domain-entity';

export type UnavailabilityWithUserName = Unavailability & {
  userName: string;
  canDelete: boolean;
};
