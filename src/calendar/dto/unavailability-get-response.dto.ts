import { Expose, Transform } from 'class-transformer';
import { UnavailabilityWithUserName } from './unavailability-with-user,dto';

export class UnavailabilityGetResponseDto {
  @Expose()
  @Transform(({ obj }: { obj: UnavailabilityWithUserName }) =>
    obj.getIdUnavailability(),
  )
  id: string;

  @Expose()
  @Transform(({ obj }: { obj: UnavailabilityWithUserName }) =>
    obj.getStartDate(),
  )
  startDate: Date;

  @Expose()
  @Transform(({ obj }: { obj: UnavailabilityWithUserName }) => obj.getEndDate())
  endDate: Date;

  @Expose()
  @Transform(({ obj }: { obj: UnavailabilityWithUserName }) => obj.getReason())
  reason: string;

  @Expose()
  @Transform(({ obj }: { obj: UnavailabilityWithUserName }) => obj.userName)
  userName: string;

  @Expose()
  @Transform(({ obj }: { obj: UnavailabilityWithUserName }) => obj.canDelete)
  canDelete: boolean;
}
