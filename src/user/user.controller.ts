// src/user/user.controller.ts
import { Controller, Get, Post, Body, UseGuards, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserResponseDto } from './dtos/user-response.dto';
import { UserCreateRequestDto } from './dtos/user-create-request.dto';
import { UserRole } from './domain/user-role.enum';
import { USER_REPOSITORY } from './domain/interfaces/user.repository';
import type { UserRepository } from './domain/interfaces/user.repository';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  @Get()
  @Roles(UserRole.ADMIN)
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepo.findAll();

    return (
      users?.map((user) => ({
        id: user.getId(),
        email: user.getEmail(),
        role: user.getRole(),
        name: user.getName(),
      })) || []
    );
  }

  @Post()
  @Roles(UserRole.ADMIN)
  async create(@Body() dto: UserCreateRequestDto): Promise<UserResponseDto> {
    const user = await this.userService.create(
      dto.email,
      dto.password,
      dto.role,
      dto.name,
    );

    return {
      id: user.getId(),
      email: user.getEmail(),
      role: user.getRole(),
      name: user.getName(),
    };
  }
}
