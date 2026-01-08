import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class PresentationEditRequestDto {
  @IsString({ message: 'O show deve ser string' })
  @IsOptional()
  showId: string;

  @IsString({ message: 'O estabelecimento deve ser string' })
  @IsOptional()
  establishmentId: string;

  @IsInt({ message: 'O valor deve ser um número inteiro' })
  @IsOptional()
  value: number;

  @IsInt({ message: 'O tempo de apresentação deve ser um número inteiro' })
  @IsOptional()
  duration: number;

  @IsDate({
    message: 'A data/hora do início da apresentação deve ser uma data válida',
  })
  @Type(() => Date)
  @IsOptional()
  presentationStart: Date;

  @IsDate({
    message: 'A data/hora do fim da apresentação deve ser uma data válida',
  })
  @Type(() => Date)
  @IsOptional()
  presentationEnd: Date;

  @IsDate({
    message:
      'A data/hora do início da da passagem de som deve ser uma data válida',
  })
  @Type(() => Date)
  @IsOptional()
  soundCheckStart: Date;

  @IsDate({
    message: 'A data/hora do fim da passagem de som deve ser uma data válida',
  })
  @Type(() => Date)
  @IsOptional()
  soundCheckEnd: Date;

  @IsString({ message: 'Observações deve ser string' })
  @IsOptional()
  observations?: string;
}
