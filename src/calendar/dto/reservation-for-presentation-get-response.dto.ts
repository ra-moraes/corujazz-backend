import { Expose, Transform } from 'class-transformer';
import { ReservationForPresentation } from '../domain/entitites/reservation-for-presentation.domain-entity';

export class ReservationForPresentationGetResponseDto {
  @Expose()
  @Transform(({ obj }: { obj: ReservationForPresentation }) =>
    obj.getIdReservationForPresentation(),
  )
  id: string;

  @Expose()
  @Transform(({ obj }: { obj: ReservationForPresentation }) =>
    obj.getStartDate(),
  )
  startDate: Date;

  @Expose()
  @Transform(({ obj }: { obj: ReservationForPresentation }) => obj.getEndDate())
  endDate: Date;

  @Expose()
  @Transform(({ obj }: { obj: ReservationForPresentation }) =>
    obj.getShow()?.getId(),
  )
  showId?: string;

  @Expose()
  @Transform(({ obj }: { obj: ReservationForPresentation }) =>
    obj.getShow()?.getName(),
  )
  showName: string;

  @Expose()
  @Transform(({ obj }: { obj: ReservationForPresentation }) =>
    obj.getEstablishment()?.getId(),
  )
  establishmentId: string;

  @Expose()
  @Transform(({ obj }: { obj: ReservationForPresentation }) =>
    obj.getEstablishment()?.getName(),
  )
  establishmentName: string;
}
