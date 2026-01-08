import { Expose, Transform } from 'class-transformer';
import { PresentationGetResponseDto } from './presentation-get-response.dto';
import { Presentation } from '../domain/entitites/presentation.domain-entity';

export class PresentationGetResponseBandaDto extends PresentationGetResponseDto {
  @Expose()
  @Transform(({ obj }: { obj: Presentation }) => obj.getObservations())
  observation?: string;

  @Expose()
  @Transform(({ obj }: { obj: Presentation }) => obj.getValue())
  value?: number;
}
