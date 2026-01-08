import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1767057198759 implements MigrationInterface {
  name = 'Migrations1767057198759';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "presentation_calendars" DROP COLUMN "externalCalendarId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "calendars" ADD "externalCalendarId" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "calendars" DROP COLUMN "externalCalendarId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "presentation_calendars" ADD "externalCalendarId" character varying`,
    );
  }
}
