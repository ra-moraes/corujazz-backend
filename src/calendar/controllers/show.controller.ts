import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/user/domain/user-role.enum';
import { ShowResponseDto } from '../dto/show-response.dto';
import { ShowService } from '../services/show.service';
import { ShowCreateRequestDto } from '../dto/show-create-request.dto';
import {
  SHOW_REPOSITORY,
  type ShowRepository,
} from '../domain/interfaces/show.repository';

@Controller('shows')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShowController {
  constructor(
    private readonly showService: ShowService,
    @Inject(SHOW_REPOSITORY)
    private readonly userRepo: ShowRepository,
  ) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.BANDA, UserRole.EQUIPE)
  async getAll(): Promise<ShowResponseDto[]> {
    const shows = await this.userRepo.findAll();

    return (
      shows?.map((show) => ({
        id: show.getId(),
        name: show.getName(),
        baseValue: show.getBaseValue(),
      })) || []
    );
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.BANDA)
  async create(@Body() dto: ShowCreateRequestDto): Promise<ShowResponseDto> {
    const show = await this.showService.create(dto.name, dto.baseValue);

    return {
      id: show.getId(),
      name: show.getName(),
      baseValue: show.getBaseValue(),
    };
  }
}
