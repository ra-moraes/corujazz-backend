import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1758493585912 implements MigrationInterface {
  name = 'Migrations1758493585912';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."calendars_type_enum" AS ENUM('unavailability', 'presentation-date-reservation', 'presentation')`,
    );
    await queryRunner.query(
      `CREATE TABLE "calendars" ("id" uuid NOT NULL, "dateStart" TIMESTAMP NOT NULL, "dateEnd" TIMESTAMP NOT NULL, "type" "public"."calendars_type_enum" NOT NULL, CONSTRAINT "PK_90dc0330e8ec9028e23c290dee8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "unavailability_calendars" ("id" uuid NOT NULL, "userId" uuid NOT NULL, "calendarId" uuid NOT NULL, "reason" character varying NOT NULL, CONSTRAINT "PK_009ca2ebbb5045e9ccb2c593930" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "unavailability_calendars" ADD CONSTRAINT "FK_bef76040d45d1208ee8dfbdc690" FOREIGN KEY ("calendarId") REFERENCES "calendars"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "unavailability_calendars" DROP CONSTRAINT "FK_bef76040d45d1208ee8dfbdc690"`,
    );
    await queryRunner.query(`DROP TABLE "unavailability_calendars"`);
    await queryRunner.query(`DROP TABLE "calendars"`);
    await queryRunner.query(`DROP TYPE "public"."calendars_type_enum"`);
  }
}
