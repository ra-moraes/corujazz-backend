import { Expose, Transform } from 'class-transformer';
import { ReservationForPresentation } from '../domain/entitites/reservation-for-presentation.domain-entity';
import { ReservationForPresentationGetResponseDto } from './reservation-for-presentation-get-response.dto';

export class ReservationForPresentationGetResponseBandaDto extends ReservationForPresentationGetResponseDto {
  @Expose()
  @Transform(({ obj }: { obj: ReservationForPresentation }) =>
    obj.getObservations(),
  )
  observation?: string;

  @Expose()
  @Transform(({ obj }: { obj: ReservationForPresentation }) => obj.getValue())
  value?: number;
}
