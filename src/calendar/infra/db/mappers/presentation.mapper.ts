import { UserId } from 'src/calendar/domain/value-objects/user-id.vo';
import {
  Calendar as CalendarOrm,
  CalendarType,
} from '../entitites/calendar.entity';
import { Presentation as PresentationOrm } from '../entitites/presentation.entity';
import { Presentation } from 'src/calendar/domain/entitites/presentation.domain-entity';
import { ShowMapper } from './show.mapper';
import { EstablishmentMapper } from './establishment.mapper';
import { DateTimeRange } from 'src/calendar/domain/value-objects/date-time-range.vo';

export class PresentationMapper {
  static toDomain(orm: PresentationOrm): Presentation {
    const calendar = orm.calendar;

    const presentation = new Presentation(
      UserId.create(orm.userId),
      DateTimeRange.create(orm.soundCheckStart, orm.soundCheckEnd),
      DateTimeRange.create(orm.presentationStart, orm.presentationEnd),
      orm.duration,
      ShowMapper.toDomain(orm.show),
      orm.value,
      EstablishmentMapper.toDomain(orm.establishment),
      orm.observations,
      orm.id,
      calendar.id,
    );
    presentation.setExternalCalendarId(calendar.externalCalendarId);

    return presentation;
  }

  static toOrmEntity(domain: Presentation): PresentationOrm {
    const orm = new PresentationOrm();

    const id = domain.getIdPresentation();
    if (id) {
      orm.id = id;
    }

    const calendar = new CalendarOrm();
    calendar.id = domain.getCalendarId();
    calendar.dateStart = domain.getStartDate();
    calendar.dateEnd = domain.getEndDate();
    calendar.externalCalendarId = domain.getExternalCalendarId();
    calendar.type = CalendarType.PRESENTATION;
    orm.calendar = calendar;
    orm.calendarId = domain.getCalendarId();

    const show = domain.getShow();
    orm.showId = show.getId();

    const establishment = domain.getEstablishment();
    orm.establishmentId = establishment.getId();

    orm.observations = domain.getObservations();
    orm.userId = domain.getUserId().getId();

    orm.value = domain.getValue();

    orm.duration = domain.getDuration();

    orm.soundCheckStart = domain.getSoundCheckDateRange().getStartDateTime();
    orm.soundCheckEnd = domain.getSoundCheckDateRange().getEndDateTime();

    orm.presentationStart = domain
      .getPresentationDateRange()
      .getStartDateTime();
    orm.presentationEnd = domain.getPresentationDateRange().getEndDateTime();

    return orm;
  }
}
