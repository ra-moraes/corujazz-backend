import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1758480508053 implements MigrationInterface {
  name = 'Migrations1758480508053';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "shows" ("id" uuid NOT NULL, "name" character varying NOT NULL, "baseValue" integer NOT NULL, CONSTRAINT "PK_db2b12161dbc5081c4f50025669" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "shows"`);
  }
}
