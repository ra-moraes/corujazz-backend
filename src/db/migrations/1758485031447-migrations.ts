import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1758485031447 implements MigrationInterface {
  name = 'Migrations1758485031447';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "establishments" ("id" uuid NOT NULL, "name" character varying NOT NULL, "street" character varying NOT NULL, "city" character varying NOT NULL, "distance" integer NOT NULL, "contactPhone" character varying NOT NULL, "contactName" character varying NOT NULL, CONSTRAINT "PK_7fb6da6c365114ccb61b091bbdf" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "establishments"`);
  }
}
