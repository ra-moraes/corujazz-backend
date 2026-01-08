import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1767030986691 implements MigrationInterface {
  name = 'Migrations1767030986691';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "presentation_calendars" ("id" uuid NOT NULL, "userId" uuid NOT NULL, "calendarId" uuid NOT NULL, "observations" character varying, "showId" uuid NOT NULL, "establishmentId" uuid NOT NULL, "value" integer NOT NULL, "duration" integer NOT NULL, "presentationStart" TIMESTAMP NOT NULL, "presentationEnd" TIMESTAMP NOT NULL, "soundCheckStart" TIMESTAMP NOT NULL, "soundCheckEnd" TIMESTAMP NOT NULL, "externalCalendarId" character varying, CONSTRAINT "PK_acfe0fcacc7cc8b668495e6c83b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "presentation_calendars" ADD CONSTRAINT "FK_583dad74c327d703eb6e590ac0c" FOREIGN KEY ("calendarId") REFERENCES "calendars"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "presentation_calendars" ADD CONSTRAINT "FK_faff805e8e0447e7add27ac8f56" FOREIGN KEY ("showId") REFERENCES "shows"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "presentation_calendars" ADD CONSTRAINT "FK_cf5aa7b747a6bf7d75dacf1fc8f" FOREIGN KEY ("establishmentId") REFERENCES "establishments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "presentation_calendars" DROP CONSTRAINT "FK_cf5aa7b747a6bf7d75dacf1fc8f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "presentation_calendars" DROP CONSTRAINT "FK_faff805e8e0447e7add27ac8f56"`,
    );
    await queryRunner.query(
      `ALTER TABLE "presentation_calendars" DROP CONSTRAINT "FK_583dad74c327d703eb6e590ac0c"`,
    );
    await queryRunner.query(`DROP TABLE "presentation_calendars"`);
  }
}
