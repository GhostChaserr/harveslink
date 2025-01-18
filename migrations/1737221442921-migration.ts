import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1737221442921 implements MigrationInterface {
    name = 'Migration1737221442921'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "media" TO "gallery"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "gallery" TO "media"`);
    }

}
