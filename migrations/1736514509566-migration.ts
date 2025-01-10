import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736514509566 implements MigrationInterface {
    name = 'Migration1736514509566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "currency" character varying NOT NULL DEFAULT 'GEL'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "currency"`);
    }

}
