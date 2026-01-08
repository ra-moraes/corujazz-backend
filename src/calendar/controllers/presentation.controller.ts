import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/domain/user-role.enum';
import { CurrentUserId } from 'src/auth/decorators/current-user-id.decorator';
import { PresentationService } from '../services/presentation.service';
import { PresentationCreateRequestDto } from '../dto/presentation-create-request.dto';
import { PresentationResponseDto } from '../dto/presentation-response.dto';
import { PresentationEditRequestDto } from '../dto/presentation-edit-request.dto';
import { CurrentUserRole } from 'src/auth/decorators/current-user-role.decorator';
import { PresentationGetResponseDto } from '../dto/presentation-get-response.dto';
import { plainToInstance } from 'class-transformer';
import { PresentationGetResponseEquipeDto } from '../dto/presentation-get-response-equipe.dto';
import { PresentationGetResponseBandaDto } from '../dto/presentation-get-response-banda.dto';
import { PresentationGetResponseAdminDto } from '../dto/presentation-get-response-admin.dto';
import { Presentation } from '../domain/entitites/presentation.domain-entity';

@Controller('presentation')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PresentationController {
  constructor(private readonly presentationService: PresentationService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.BANDA)
  async create(
    @Body() dto: PresentationCreateRequestDto,
    @CurrentUserId() userId: string,
  ): Promise<PresentationResponseDto> {
    const presentation = await this.presentationService.create(
      dto.soundCheckStart,
      dto.soundCheckEnd,
      dto.presentationStart,
      dto.presentationEnd,
      dto.duration,
      dto.showId,
      dto.establishmentId,
      dto.value,
      userId,
      dto.observations,
      dto.reservationForPresentationId,
    );

    return {
      id: presentation.getIdPresentation()!,
      startDate: presentation.getStartDate(),
      endDate: presentation.getEndDate(),
      observation: presentation.getObservations(),
      showId: presentation.getShow().getId(),
      establishmentId: presentation.getEstablishment().getId(),
      value: presentation.getValue(),
    };
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.BANDA)
  async delete(@Param('id') presentationId: string): Promise<void> {
    await this.presentationService.delete(presentationId);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.BANDA)
  async edit(
    @Body() dto: PresentationEditRequestDto,
    @Param('id') presentationId: string,
  ): Promise<PresentationResponseDto> {
    const presentation = await this.presentationService.edit(
      presentationId,
      dto.soundCheckStart,
      dto.soundCheckEnd,
      dto.presentationStart,
      dto.presentationEnd,
      dto.duration,
      dto.showId,
      dto.establishmentId,
      dto.value,
      dto.observations,
    );

    return {
      id: presentation.getIdPresentation()!,
      startDate: presentation.getStartDate(),
      endDate: presentation.getEndDate(),
      observation: presentation.getObservations(),
      showId: presentation.getShow().getId(),
      establishmentId: presentation.getEstablishment().getId(),
      value: presentation.getValue(),
    };
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.BANDA, UserRole.EQUIPE)
  async getPresentation(
    @Param('id') presentationId: string,
    @CurrentUserRole() userRole: string,
  ): Promise<PresentationGetResponseDto> {
    const presentation =
      await this.presentationService.getPresentation(presentationId);

    const response = (() => {
      switch (userRole as UserRole) {
        case UserRole.EQUIPE:
          return plainToInstance<
            PresentationGetResponseEquipeDto,
            Presentation
          >(PresentationGetResponseEquipeDto, presentation, {
            excludeExtraneousValues: true,
          });
        case UserRole.BANDA:
          return plainToInstance<PresentationGetResponseBandaDto, Presentation>(
            PresentationGetResponseBandaDto,
            presentation,
            {
              excludeExtraneousValues: true,
            },
          );
        case UserRole.ADMIN:
          return plainToInstance<PresentationGetResponseAdminDto, Presentation>(
            PresentationGetResponseAdminDto,
            presentation,
            {
              excludeExtraneousValues: true,
            },
          );
      }
    })();

    return response;
  }
}
