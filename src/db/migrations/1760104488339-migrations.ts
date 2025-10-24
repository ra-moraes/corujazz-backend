import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1760104488339 implements MigrationInterface {
  name = 'Migrations1760104488339';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reservation_for_presentation_calendars" ADD "value" integer`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reservation_for_presentation_calendars" DROP COLUMN "value"`,
    );
  }
}
