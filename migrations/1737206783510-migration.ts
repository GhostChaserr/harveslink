import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1737206783510 implements MigrationInterface {
    name = 'Migration1737206783510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "city" character varying`);
        await queryRunner.query(`ALTER TABLE "products" ADD "address" character varying`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "country" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "country" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "country" SET DEFAULT 'GEO'`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "country" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "city"`);
    }

}
