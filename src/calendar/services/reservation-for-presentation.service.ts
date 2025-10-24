import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserId } from '../domain/value-objects/user-id.vo';
import {
  USER_REPOSITORY,
  type UserRepository,
} from 'src/user/domain/interfaces/user.repository';
import {
  CALENDAR_REPOSITORY,
  type CalendarRepository,
} from '../domain/interfaces/calendar.repository';
import {
  RESERVATION_FOR_PRESENTATION_REPOSITORY,
  type ReservationForPresentationRepository,
} from '../domain/interfaces/reservation-for-presentation.repository';
import { ReservationForPresentation } from '../domain/entitites/reservation-for-presentation.domain-entity';
import {
  SHOW_REPOSITORY,
  type ShowRepository,
} from '../domain/interfaces/show.repository';
import { Show } from '../domain/entitites/show.domain-entity';
import {
  ESTABLISHMENT_REPOSITORY,
  type EstablishmentRepository,
} from '../domain/interfaces/establishment.repository';
import { Establishment } from '../domain/entitites/establishment.domain-entity';

@Injectable()
export class ReservationForPresentationService {
  constructor(
    @Inject(RESERVATION_FOR_PRESENTATION_REPOSITORY)
    private readonly reservationRepo: ReservationForPresentationRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
    @Inject(CALENDAR_REPOSITORY)
    private readonly calendarRepo: CalendarRepository,
    @Inject(SHOW_REPOSITORY)
    private readonly showRepo: ShowRepository,
    @Inject(ESTABLISHMENT_REPOSITORY)
    private readonly establishmentRepo: EstablishmentRepository,
  ) {}

  async create(
    startDate: Date,
    endDate: Date,
    userId: string,
    observations?: string,
    showId?: string,
    establishmentId?: string,
    value?: number,
  ): Promise<ReservationForPresentation> {
    const user = await this.userRepo.find(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const isAvailable = await this.calendarRepo.isDateAvailable(
      startDate,
      endDate,
    );
    if (!isAvailable) {
      throw new ConflictException('O período selecionado não está disponível');
    }

    const calendarId = undefined;
    const reservationId = undefined;
    const show = await this.loadShow(showId);
    const establishment = await this.loadEstablishment(establishmentId);

    const reservation = new ReservationForPresentation(
      UserId.create(userId),
      startDate,
      endDate,
      reservationId,
      calendarId,
      observations,
      show,
      establishment,
      value,
    );

    await this.reservationRepo.save(reservation);

    return reservation;
  }

  private readonly loadEstablishment = async (
    establishmentId?: string,
  ): Promise<Establishment | undefined> => {
    if (!establishmentId) {
      return undefined;
    }

    const establishment = await this.establishmentRepo.find(establishmentId);

    if (!establishment) {
      throw new NotFoundException('Show não encontrado');
    }

    return establishment;
  };

  private readonly loadShow = async (
    showId?: string,
  ): Promise<Show | undefined> => {
    if (!showId) {
      return undefined;
    }

    const show = await this.showRepo.find(showId);

    if (!show) {
      throw new NotFoundException('Show não encontrado');
    }

    return show;
  };

  async delete(reservationId: string): Promise<void> {
    const reservation = await this.reservationRepo.find(reservationId);
    if (!reservation) {
      throw new NotFoundException('Reserva não encontrada');
    }

    const calendarId = reservation.getCalendarId();
    if (!calendarId) {
      throw new NotFoundException('Reserva não encontrada');
    }

    await this.calendarRepo.delete(reservation);
    await this.reservationRepo.delete(reservation);
  }
}
