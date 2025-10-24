import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1760097559744 implements MigrationInterface {
  name = 'Migrations1760097559744';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "reservation_for_presentation_calendars" ("id" uuid NOT NULL, "userId" uuid NOT NULL, "calendarId" uuid NOT NULL, "observations" character varying, "showId" uuid, "establishmentId" uuid, CONSTRAINT "PK_a5a51a03e22954c1f3419d92e1b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_for_presentation_calendars" ADD CONSTRAINT "FK_9ec0a604afcfeb260f25f3b43ec" FOREIGN KEY ("calendarId") REFERENCES "calendars"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_for_presentation_calendars" ADD CONSTRAINT "FK_c181437411737c5826aaca154ab" FOREIGN KEY ("showId") REFERENCES "shows"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_for_presentation_calendars" ADD CONSTRAINT "FK_167312d481384d484de25d580e9" FOREIGN KEY ("establishmentId") REFERENCES "establishments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reservation_for_presentation_calendars" DROP CONSTRAINT "FK_167312d481384d484de25d580e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_for_presentation_calendars" DROP CONSTRAINT "FK_c181437411737c5826aaca154ab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_for_presentation_calendars" DROP CONSTRAINT "FK_9ec0a604afcfeb260f25f3b43ec"`,
    );
    await queryRunner.query(
      `DROP TABLE "reservation_for_presentation_calendars"`,
    );
  }
}
