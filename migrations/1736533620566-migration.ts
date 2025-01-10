import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736533620566 implements MigrationInterface {
    name = 'Migration1736533620566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" ADD "count" integer`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "UQ_d77c7b1347dfcb58d07749e1464" UNIQUE ("code")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "UQ_d77c7b1347dfcb58d07749e1464"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "count"`);
    }

}
