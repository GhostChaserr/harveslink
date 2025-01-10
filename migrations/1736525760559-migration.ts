import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736525760559 implements MigrationInterface {
    name = 'Migration1736525760559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "startDate" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "expiryDate"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "expiryDate" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "expiryDate"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "expiryDate" date`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "startDate"`);
    }

}
