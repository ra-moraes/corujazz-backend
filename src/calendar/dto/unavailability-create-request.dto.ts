import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class UnavailabilityCreateRequestDto {
  @IsNotEmpty({ message: 'O motivo é obrigatório' })
  reason: string;

  @IsNotEmpty({ message: 'A data inicial é obrigatória' })
  @IsDate({ message: 'A data deve ser uma data válida' })
  @Type(() => Date)
  startDate: Date;

  @IsNotEmpty({ message: 'A data final é obrigatória' })
  @IsDate({ message: 'A data deve ser uma data válida' })
  @Type(() => Date)
  endDate: Date;
}
