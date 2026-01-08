import { Expose, Transform } from 'class-transformer';
import { Presentation } from '../domain/entitites/presentation.domain-entity';

export class PresentationGetResponseDto {
  @Expose()
  @Transform(({ obj }: { obj: Presentation }) => obj.getIdPresentation())
  id: string;

  @Expose()
  @Transform(({ obj }: { obj: Presentation }) => obj.getStartDate())
  startDate: Date;

  @Expose()
  @Transform(({ obj }: { obj: Presentation }) => obj.getEndDate())
  endDate: Date;

  @Expose()
  @Transform(({ obj }: { obj: Presentation }) =>
    obj.getPresentationDateRange().getStartDateTime(),
  )
  presentationStartDate: Date;

  @Expose()
  @Transform(({ obj }: { obj: Presentation }) =>
    obj.getPresentationDateRange().getEndDateTime(),
  )
  presentationEndDate: Date;

  @Expose()
  @Transform(({ obj }: { obj: Presentation }) =>
    obj.getSoundCheckDateRange().getStartDateTime(),
  )
  soundCheckStartDate: Date;

  @Expose()
  @Transform(({ obj }: { obj: Presentation }) =>
    obj.getSoundCheckDateRange().getEndDateTime(),
  )
  soundCheckEndDate: Date;

  @Expose()
  @Transform(({ obj }: { obj: Presentation }) => obj.getDuration())
  duration: number;

  @Expose()
  @Transform(({ obj }: { obj: Presentation }) => obj.getShow().getId())
  showId: string;

  @Expose()
  @Transform(({ obj }: { obj: Presentation }) => obj.getShow().getName())
  showName: string;

  @Expose()
  @Transform(({ obj }: { obj: Presentation }) => obj.getEstablishment().getId())
  establishmentId: string;

  @Expose()
  @Transform(({ obj }: { obj: Presentation }) =>
    obj.getEstablishment().getName(),
  )
  establishmentName: string;

  @Expose()
  @Transform(({ obj }: { obj: Presentation }) =>
    obj.getEstablishment().getContact().getName(),
  )
  establishmentContactName: string;

  @Expose()
  @Transform(({ obj }: { obj: Presentation }) =>
    obj.getEstablishment().getContact().getPhone(),
  )
  establishmentContactPhone: string;

  @Expose()
  @Transform(({ obj }: { obj: Presentation }) =>
    obj.getEstablishment().getAddress().getStreet(),
  )
  establishmentStreet: string;

  @Expose()
  @Transform(({ obj }: { obj: Presentation }) =>
    obj.getEstablishment().getAddress().getCity(),
  )
  establishmentCity: string;
}
