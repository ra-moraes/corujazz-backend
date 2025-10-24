import { IsInt, IsNotEmpty } from 'class-validator';

export class ShowCreateRequestDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsInt({ message: 'O valor base deve ser um número inteiro' })
  baseValue: number;
}
