import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class ReservationForPresentationCreateRequestDto {
  @IsString({ message: 'Observações deve ser string' })
  @IsOptional()
  observations?: string;

  @IsString({ message: 'O show deve ser string' })
  @IsOptional()
  showId?: string;

  @IsString({ message: 'O estabelecimento deve ser string' })
  @IsOptional()
  establishmentId?: string;

  @IsOptional()
  @IsInt({ message: 'O valor deve ser um número inteiro' })
  value?: number;

  @IsNotEmpty({ message: 'A data inicial é obrigatória' })
  @IsDate({ message: 'A data deve ser uma data válida' })
  @Type(() => Date)
  startDate: Date;

  @IsNotEmpty({ message: 'A data final é obrigatória' })
  @IsDate({ message: 'A data deve ser uma data válida' })
  @Type(() => Date)
  endDate: Date;
}
