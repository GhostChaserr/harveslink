import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1737205583984 implements MigrationInterface {
    name = 'Migration1737205583984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "languages" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "languages"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "country"`);
    }

}
