import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class PresentationCreateRequestDto {
  @IsString({ message: 'O show deve ser string' })
  showId: string;

  @IsString({ message: 'O estabelecimento deve ser string' })
  establishmentId: string;

  @IsInt({ message: 'O valor deve ser um número inteiro' })
  value: number;

  @IsInt({ message: 'O tempo de apresentação deve ser um número inteiro' })
  duration: number;

  @IsNotEmpty({
    message: 'A data/hora do início da apresentação é obrigatória',
  })
  @IsDate({
    message: 'A data/hora do início da apresentação deve ser uma data válida',
  })
  @Type(() => Date)
  presentationStart: Date;

  @IsNotEmpty({ message: 'A data/hora do fim da apresentação é obrigatória' })
  @IsDate({
    message: 'A data/hora do fim da apresentação deve ser uma data válida',
  })
  @Type(() => Date)
  presentationEnd: Date;

  @IsNotEmpty({
    message: 'A data/hora do início da passagem de som é obrigatória',
  })
  @IsDate({
    message:
      'A data/hora do início da da passagem de som deve ser uma data válida',
  })
  @Type(() => Date)
  soundCheckStart: Date;

  @IsNotEmpty({
    message: 'A data/hora do fim da passagem de som é obrigatória',
  })
  @IsDate({
    message: 'A data/hora do fim da passagem de som deve ser uma data válida',
  })
  @Type(() => Date)
  soundCheckEnd: Date;

  @IsString({ message: 'Observações deve ser string' })
  @IsOptional()
  observations?: string;

  @IsString({
    message:
      'O identificador de uma reserva para substituição deve ser uma string',
  })
  @IsOptional()
  reservationForPresentationId?: string;
}
