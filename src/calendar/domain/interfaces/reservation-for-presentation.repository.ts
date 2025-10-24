import { ReservationForPresentation } from '../entitites/reservation-for-presentation.domain-entity';

export interface ReservationForPresentationRepository {
  save(reservation: ReservationForPresentation): Promise<void>;
  delete(reservation: ReservationForPresentation): Promise<void>;
  find(reservationId: string): Promise<ReservationForPresentation | undefined>;
  findAll(): Promise<ReservationForPresentation[]>;
  findByUserId(userId: number): Promise<ReservationForPresentation[]>;
}

export const RESERVATION_FOR_PRESENTATION_REPOSITORY = Symbol(
  'RESERVATION_FOR_PRESENTATION_REPOSITORY',
);
