import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1737221267924 implements MigrationInterface {
    name = 'Migration1737221267924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "media"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "media" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "media"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "media" text array NOT NULL DEFAULT '{}'`);
    }

}
