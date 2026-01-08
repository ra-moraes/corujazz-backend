import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { UnavailabilityService } from '../services/unavailability.service';
import {
  UNAVAILABILITY_REPOSITORY,
  type UnavailabilityRepository,
} from '../domain/interfaces/unavailability.repository';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/domain/user-role.enum';
import { UnavailabilityCreateRequestDto } from '../dto/unavailability-create-request.dto';
import { CurrentUserId } from 'src/auth/decorators/current-user-id.decorator';
import { UnavailabilityResponseDto } from '../dto/unavailability-response.dto';
import { Unavailability } from '../domain/entitites/unavailability.domain-entity';
import { UnavailabilityGetResponseDto } from '../dto/unavailability-get-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('unavailabilities')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UnavailabilityController {
  constructor(
    private readonly unavailabilityService: UnavailabilityService,
    @Inject(UNAVAILABILITY_REPOSITORY)
    private readonly unavailabilityRepo: UnavailabilityRepository,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.BANDA, UserRole.EQUIPE)
  async create(
    @Body() dto: UnavailabilityCreateRequestDto,
    @CurrentUserId() userId: string,
  ): Promise<UnavailabilityResponseDto> {
    const unavailability = await this.unavailabilityService.create(
      dto.reason,
      dto.startDate,
      dto.endDate,
      userId,
    );

    return {
      id: unavailability.getIdUnavailability(),
      reason: unavailability.getReason(),
      startDate: unavailability.getStartDate(),
      endDate: unavailability.getEndDate(),
    };
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.BANDA, UserRole.EQUIPE)
  async delete(
    @Param('id') unavailabilityId: string,
    @CurrentUserId() userId: string,
  ): Promise<void> {
    await this.unavailabilityService.delete(unavailabilityId, userId);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.BANDA, UserRole.EQUIPE)
  async getUnavailability(
    @Param('id') unavailabilityId: string,
    @CurrentUserId() userId: string,
  ): Promise<UnavailabilityGetResponseDto> {
    const unavailability = await this.unavailabilityService.getUnavailability(
      unavailabilityId,
      userId,
    );

    return plainToInstance<UnavailabilityGetResponseDto, Unavailability>(
      UnavailabilityGetResponseDto,
      unavailability,
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
