import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/domain/user-role.enum';
import { CurrentUserId } from 'src/auth/decorators/current-user-id.decorator';
import { ReservationForPresentationService } from '../services/reservation-for-presentation.service';
import { ReservationForPresentationCreateRequestDto } from '../dto/reservation-for-presentation-create-request.dto';
import { ReservationForPresentationResponseDto } from '../dto/reservation-for-presentation-response.dto';

@Controller('reservations-for-presentation')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReservationForPresentationController {
  constructor(
    private readonly reservationService: ReservationForPresentationService,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.BANDA)
  async create(
    @Body() dto: ReservationForPresentationCreateRequestDto,
    @CurrentUserId() userId: string,
  ): Promise<ReservationForPresentationResponseDto> {
    const reservation = await this.reservationService.create(
      dto.startDate,
      dto.endDate,
      userId,
      dto.observations,
      dto.showId,
      dto.establishmentId,
      dto.value,
    );

    return {
      id: reservation.getIdReservationForPresentation(),
      startDate: reservation.getStartDate(),
      endDate: reservation.getEndDate(),
      observation: reservation.getObservations(),
      showId: reservation.getShow()?.getId(),
      establishmentId: reservation.getEstablishment()?.getId(),
      value: reservation.getValue(),
    };
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.BANDA)
  async delete(@Param('id') reservationId: string): Promise<void> {
    await this.reservationService.delete(reservationId);
  }
}
