import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736537395165 implements MigrationInterface {
    name = 'Migration1736537395165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "count"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" ADD "count" integer`);
    }

}
