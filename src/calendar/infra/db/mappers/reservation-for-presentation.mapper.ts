// import { Unavailability } from 'src/calendar/domain/entitites/unavailability.domain-entity';
// import { Unavailability as UnavailabilityOrm } from '../entitites/unavailability.entity';
import { UserId } from 'src/calendar/domain/value-objects/user-id.vo';
import {
  Calendar as CalendarOrm,
  CalendarType,
} from '../entitites/calendar.entity';
import { ReservationForPresentation as ReservationForPresentationOrm } from '../entitites/reservation-for-presentation.entity';
import { ReservationForPresentation } from 'src/calendar/domain/entitites/reservation-for-presentation.domain-entity';
import { ShowMapper } from './show.mapper';
import { EstablishmentMapper } from './establishment.mapper';
import { DateTimeRange } from 'src/calendar/domain/value-objects/date-time-range.vo';

export class ReservationForPresentationMapper {
  static toDomain(
    orm: ReservationForPresentationOrm,
  ): ReservationForPresentation {
    const calendar = orm.calendar;

    const reservation = new ReservationForPresentation(
      UserId.create(orm.userId),
      DateTimeRange.create(calendar.dateStart, calendar.dateEnd),
      orm.id,
      calendar.id,
      orm.observations,
      orm.show ? ShowMapper.toDomain(orm.show) : undefined,
      orm.establishment
        ? EstablishmentMapper.toDomain(orm.establishment)
        : undefined,
      orm.value,
    );
    reservation.setExternalCalendarId(calendar.externalCalendarId);

    return reservation;
  }

  static toOrmEntity(
    domain: ReservationForPresentation,
  ): ReservationForPresentationOrm {
    const orm = new ReservationForPresentationOrm();

    const id = domain.getIdReservationForPresentation();
    if (id) {
      orm.id = id;
    }

    const calendar = new CalendarOrm();
    const calendarId = domain.getCalendarId();
    calendar.id = calendarId;
    calendar.dateStart = domain.getStartDate();
    calendar.dateEnd = domain.getEndDate();
    calendar.type = CalendarType.PRESENTATION_DATE_RESERVATION;
    calendar.externalCalendarId = domain.getExternalCalendarId();
    orm.calendar = calendar;
    orm.calendarId = calendarId;

    const show = domain.getShow();
    if (show) {
      orm.showId = show.getId();
    }

    const establishment = domain.getEstablishment();
    if (establishment) {
      orm.establishmentId = establishment.getId();
    }

    orm.observations = domain.getObservations();
    orm.userId = domain.getUserId().getId();

    orm.value = domain.getValue();

    return orm;
  }
}
