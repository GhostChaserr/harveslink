import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1737205015691 implements MigrationInterface {
    name = 'Migration1737205015691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ADD "avatar" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "avatar"`);
    }

}
