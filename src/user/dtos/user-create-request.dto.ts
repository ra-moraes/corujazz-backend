import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../domain/user-role.enum';

export class UserCreateRequestDto {
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;

  @IsEnum(UserRole, { message: 'Papel do usuário inválido' })
  role: UserRole;

  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;
}
