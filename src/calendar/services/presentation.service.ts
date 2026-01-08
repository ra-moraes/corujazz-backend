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
import { DateTimeRange } from '../domain/value-objects/date-time-range.vo';
import {
  PRESENTATION_REPOSITORY,
  type PresentationRepository,
} from '../domain/interfaces/presentation.repository';
import { Presentation } from '../domain/entitites/presentation.domain-entity';
import { DataSource, EntityManager } from 'typeorm';
import { type Calendar, CALENDAR } from 'src/infra/calendar/calendar.interface';
import { DateHelper } from 'src/common/helpers/date.helper';

@Injectable()
export class PresentationService {
  constructor(
    private readonly dataSource: DataSource,
    @Inject(PRESENTATION_REPOSITORY)
    private readonly presentationRepo: PresentationRepository,
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
    @Inject(CALENDAR)
    private readonly externalCalendarService: Calendar,
  ) {}

  async create(
    soundCheckStart: Date,
    soundCheckEnd: Date,
    presentationStart: Date,
    presentationEnd: Date,
    duration: number,
    showId: string,
    establishmentId: string,
    value: number,
    userId: string,
    observations?: string,
    reservationForPresentationId?: string,
  ): Promise<Presentation> {
    const user = await this.userRepo.find(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const presentation = new Presentation(
      UserId.create(userId),
      DateTimeRange.create(soundCheckStart, soundCheckEnd),
      DateTimeRange.create(presentationStart, presentationEnd),
      duration,
      await this.loadShow(showId),
      value,
      await this.loadEstablishment(establishmentId),
      observations,
      undefined,
      undefined,
    );

    const reservationForPresentation =
      await this.loadReservationForPresentation(reservationForPresentationId);

    await this.validateAvailability(presentation, reservationForPresentation);

    await this.createExternalCalendarEvent(presentation);

    return this.dataSource.transaction(async (manager) => {
      await this.deleteReservationForPresentation(
        manager,
        reservationForPresentation,
      );

      await this.presentationRepo.save(presentation, manager);

      return presentation;
    });
  }

  async edit(
    presentationId: string,
    soundCheckStart?: Date,
    soundCheckEnd?: Date,
    presentationStart?: Date,
    presentationEnd?: Date,
    duration?: number,
    showId?: string,
    establishmentId?: string,
    value?: number,
    observations?: string,
  ): Promise<Presentation> {
    const presentation = await this.presentationRepo.find(presentationId);

    if (!presentation) {
      throw new NotFoundException('Apresentação não encontrada');
    }

    const soundCheckDateRange = DateTimeRange.create(
      soundCheckStart ||
        presentation.getSoundCheckDateRange().getStartDateTime(),
      soundCheckEnd || presentation.getSoundCheckDateRange().getEndDateTime(),
    );

    const presentationDateRange = DateTimeRange.create(
      presentationStart ||
        presentation.getPresentationDateRange().getStartDateTime(),
      presentationEnd ||
        presentation.getPresentationDateRange().getEndDateTime(),
    );

    const show = showId ? await this.loadShow(showId) : undefined;
    const establishment = establishmentId
      ? await this.loadEstablishment(establishmentId)
      : undefined;

    presentation.update({
      soundCheckDateRange,
      presentationDateRange,
      duration,
      show,
      value,
      establishment,
      observations,
    });

    await this.deletePresentationExternalCalendar(presentation);
    await this.createExternalCalendarEvent(presentation);
    await this.presentationRepo.save(presentation);

    return presentation;
  }

  private readonly loadEstablishment = async (
    establishmentId: string,
  ): Promise<Establishment> => {
    const establishment = await this.establishmentRepo.find(establishmentId);

    if (!establishment) {
      throw new NotFoundException('Show não encontrado');
    }

    return establishment;
  };

  private readonly loadShow = async (showId: string): Promise<Show> => {
    const show = await this.showRepo.find(showId);

    if (!show) {
      throw new NotFoundException('Show não encontrado');
    }

    return show;
  };

  private readonly loadReservationForPresentation = async (
    reservationId?: string,
  ): Promise<ReservationForPresentation | undefined> => {
    if (!reservationId) {
      return undefined;
    }

    const reservation = await this.reservationRepo.find(reservationId);
    if (!reservation) {
      throw new NotFoundException('Reserva não encontrada');
    }

    return reservation;
  };

  private readonly validateAvailability = async (
    presentation: Presentation,
    reservartionForPresentation?: ReservationForPresentation,
  ) => {
    const ignoreCalendarIds = reservartionForPresentation
      ? [reservartionForPresentation.getCalendarId()]
      : [];
    const isAvailable = await this.calendarRepo.isDateAvailable(
      presentation.getStartDate(),
      presentation.getEndDate(),
      ignoreCalendarIds,
    );

    if (!isAvailable) {
      throw new ConflictException('O período selecionado não está disponível');
    }
  };

  private readonly createExternalCalendarEvent = async (
    presentation: Presentation,
  ) => {
    const description: string = `
<b>#Estabelecimento:</b> 
  - Local: ${presentation.getEstablishment().getName()}
  - Endereço: ${presentation.getEstablishment().getAddress().toString()}

<b>#Passagem de som: </b>
  - Início: ${DateHelper.formatDateToBr(presentation.getSoundCheckDateRange().getStartDateTime())}
  - Fim: ${DateHelper.formatDateToBr(presentation.getSoundCheckDateRange().getEndDateTime())}

<b>#Apresentação: </b>
  - Show/Formato:  ${presentation.getShow().getName()}
  - Duração: ${presentation.getDuration()} minutos
  - Início: ${DateHelper.formatDateToBr(presentation.getPresentationDateRange().getStartDateTime())}
  - Fim: ${DateHelper.formatDateToBr(presentation.getPresentationDateRange().getEndDateTime())}
`;

    const externalCalendarEvent =
      await this.externalCalendarService.createEvent(
        `Show: ${presentation.getEstablishment().getName()}`,
        description,
        presentation.getStartDate().toISOString(),
        presentation.getEndDate().toISOString(),
      );
    presentation.setExternalCalendarId(externalCalendarEvent.id);
  };

  private readonly deleteReservationForPresentation = async (
    manager: EntityManager,
    reservartionForPresentation?: ReservationForPresentation,
  ) => {
    if (!reservartionForPresentation) {
      return;
    }

    const externalCalendarId =
      reservartionForPresentation.getExternalCalendarId();
    if (externalCalendarId) {
      await this.externalCalendarService.removeEvent(externalCalendarId);
    }

    await this.calendarRepo.delete(reservartionForPresentation, manager);
    await this.reservationRepo.delete(reservartionForPresentation, manager);
  };

  async delete(presentationId: string): Promise<void> {
    const presentation = await this.presentationRepo.find(presentationId);
    if (!presentation) {
      throw new NotFoundException('Apresentação não encontrada');
    }

    const calendarId = presentation.getCalendarId();
    if (!calendarId) {
      throw new NotFoundException('Apresentação/Agenda não encontrada');
    }

    await this.deletePresentationExternalCalendar(presentation);
    await this.calendarRepo.delete(presentation);
    await this.presentationRepo.delete(presentation);
  }

  async deletePresentationExternalCalendar(
    presentation: Presentation,
  ): Promise<void> {
    const externalCalendarId = presentation.getExternalCalendarId();
    if (externalCalendarId) {
      await this.externalCalendarService.removeEvent(externalCalendarId);
    }
  }

  async getPresentation(presentationId: string): Promise<Presentation> {
    const presentation = await this.presentationRepo.find(presentationId);

    if (!presentation) {
      throw new NotFoundException('Apresentação não encontrada');
    }

    return presentation;
  }
}
