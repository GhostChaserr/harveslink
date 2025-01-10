import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736510762201 implements MigrationInterface {
    name = 'Migration1736510762201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_5c124086aa5e7d3bc35331eea60"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "farmerId" TO "accountId"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_139d27206922368a4ba800d1778" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_139d27206922368a4ba800d1778"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "accountId" TO "farmerId"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_5c124086aa5e7d3bc35331eea60" FOREIGN KEY ("farmerId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
