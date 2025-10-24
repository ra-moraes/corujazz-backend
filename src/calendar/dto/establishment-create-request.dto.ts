import { IsInt, IsNotEmpty } from 'class-validator';

export class EstablishmentCreateRequestDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'O endereço é obrigatório' })
  street: string;

  @IsNotEmpty({ message: 'A cidade é obrigatória' })
  city: string;

  @IsNotEmpty({ message: 'A distância é obrigatória' })
  @IsInt({ message: 'A distância deve ser um número inteiro' })
  distance: number;

  @IsNotEmpty({ message: 'O contato é obrigatório' })
  contactName: string;

  @IsNotEmpty({ message: 'O telefone do contato é obrigatório' })
  contactPhone: string;
}
