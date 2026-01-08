import { ConfigModule } from '@nestjs/config';
import { Show } from './infra/db/entitites/show.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/db/database.module';
import { Module } from '@nestjs/common';
import { ShowService } from './services/show.service';
import { ShowController } from './controllers/show.controller';
import { SHOW_REPOSITORY } from './domain/interfaces/show.repository';
import { ShowRepositoryImpl } from './infra/db/repositories/show.repository-impl';
import { EstablishmentService } from './services/establishment.service';
import { ESTABLISHMENT_REPOSITORY } from './domain/interfaces/establishment.repository';
import { EstablishmentRepositoryImpl } from './infra/db/repositories/establishment.repository-impl';
import { Establishment } from './infra/db/entitites/establishment.entity';
import { EstablishmentController } from './controllers/establichment.controller';
import { Calendar } from './infra/db/entitites/calendar.entity';
import { Unavailability } from './infra/db/entitites/unavailability.entity';
import { UnavailabilityRepositoryImpl } from './infra/db/repositories/unavailability.repository-impl';
import { UNAVAILABILITY_REPOSITORY } from './domain/interfaces/unavailability.repository';
import { UnavailabilityService } from './services/unavailability.service';
import { UserModule } from 'src/user/user.module';
import { CALENDAR_REPOSITORY } from './domain/interfaces/calendar.repository';
import { CalendarRepositoryImpl } from './infra/db/repositories/calendar.repository-impl';
import { UnavailabilityController } from './controllers/unavailability.controller';
import { RESERVATION_FOR_PRESENTATION_REPOSITORY } from './domain/interfaces/reservation-for-presentation.repository';
import { ReservationForPresentationRepositoryImpl } from './infra/db/repositories/reservation-for-presentation.repository-impl';
import { ReservationForPresentationService } from './services/reservation-for-presentation.service';
import { ReservationForPresentationController } from './controllers/reservation-for-presentation.controller';
import { ReservationForPresentation } from './infra/db/entitites/reservation-for-presentation.entity';
import { InfraModule } from 'src/infra/infra.module';
import { PRESENTATION_REPOSITORY } from './domain/interfaces/presentation.repository';
import { PresentationRepositoryImpl } from './infra/db/repositories/presentation.repository-impl';
import { PresentationService } from './services/presentation.service';
import { PresentationController } from './controllers/presentation.controller';
import { Presentation } from './infra/db/entitites/presentation.entity';
import { CalendarController } from './controllers/calendar.controller';
import { CalendarService } from './services/calendar.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      Show,
      Establishment,
      Calendar,
      Unavailability,
      ReservationForPresentation,
      Presentation,
    ]),
    DatabaseModule,
    UserModule,
    InfraModule,
  ],
  providers: [
    ShowService,
    EstablishmentService,
    UnavailabilityService,
    ReservationForPresentationService,
    PresentationService,
    CalendarService,
    {
      provide: SHOW_REPOSITORY,
      useClass: ShowRepositoryImpl,
    },
    {
      provide: ESTABLISHMENT_REPOSITORY,
      useClass: EstablishmentRepositoryImpl,
    },
    {
      provide: UNAVAILABILITY_REPOSITORY,
      useClass: UnavailabilityRepositoryImpl,
    },
    {
      provide: CALENDAR_REPOSITORY,
      useClass: CalendarRepositoryImpl,
    },
    {
      provide: RESERVATION_FOR_PRESENTATION_REPOSITORY,
      useClass: ReservationForPresentationRepositoryImpl,
    },
    {
      provide: PRESENTATION_REPOSITORY,
      useClass: PresentationRepositoryImpl,
    },
  ],
  controllers: [
    ShowController,
    EstablishmentController,
    UnavailabilityController,
    ReservationForPresentationController,
    PresentationController,
    CalendarController,
  ],
  exports: [TypeOrmModule],
})
export class CalendarModule {}
