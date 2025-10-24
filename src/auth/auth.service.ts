// src/auth/auth.service.ts
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/infra/db/entities/user.entity';
import { LoginResponseDto } from './dtos/login-response.dto';
import { USER_REPOSITORY } from '../user/domain/interfaces/user.repository';
import type { UserRepository } from '../user/domain/interfaces/user.repository';
import { UserMapper } from 'src/user/infra/db/mappers/user.mapper';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userRepo.findByEmail(email);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (user && (await bcrypt.compare(pass, user.getPasswordHash()))) {
      return UserMapper.toOrmEntity(user);
    }
    throw new UnauthorizedException('Credenciais inválidas');
  }

  login(user: User): LoginResponseDto {
    const payload = { sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role,
    };
  }
}
