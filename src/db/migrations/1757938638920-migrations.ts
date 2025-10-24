import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1757938638920 implements MigrationInterface {
  name = 'Migrations1757938638920';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying`);
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
  }
}
