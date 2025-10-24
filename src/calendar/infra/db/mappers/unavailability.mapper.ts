import { Unavailability } from 'src/calendar/domain/entitites/unavailability.domain-entity';
import { Unavailability as UnavailabilityOrm } from '../entitites/unavailability.entity';
import { UserId } from 'src/calendar/domain/value-objects/user-id.vo';
import {
  Calendar as CalendarOrm,
  CalendarType,
} from '../entitites/calendar.entity';

export class UnavailabilityMapper {
  static toDomain(orm: UnavailabilityOrm): Unavailability {
    const calendar = orm.calendar;

    const unavailability = new Unavailability(
      orm.reason,
      UserId.create(orm.userId),
      calendar.dateStart,
      calendar.dateEnd,
      orm.id,
      calendar.id,
    );

    return unavailability;
  }

  static toOrmEntity(domain: Unavailability): UnavailabilityOrm {
    const orm = new UnavailabilityOrm();

    const id = domain.getIdUnavailability();
    if (id) {
      orm.id = id;
    }

    const calendar = new CalendarOrm();
    const calendarId = domain.getCalendarId();
    if (calendarId) {
      orm.calendarId = calendarId;
      calendar.id = calendarId;
    }

    calendar.dateStart = domain.getStartDate();
    calendar.dateEnd = domain.getEndDate();
    calendar.type = CalendarType.UNAVAILABILITY;
    orm.calendar = calendar;

    orm.reason = domain.getReason();
    orm.userId = domain.getUserId().getId();

    return orm;
  }
}
