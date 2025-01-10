import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736532709268 implements MigrationInterface {
    name = 'Migration1736532709268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" ADD "code" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "code"`);
    }

}
