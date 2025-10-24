import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class Migrations1756491742853 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const hash = await bcrypt.hash('admin123', 10);
    await queryRunner.query(`
        INSERT INTO users (id, email, password, role)
        VALUES (uuid_generate_v4(), 'admin@local', '${hash}', 'admin')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
