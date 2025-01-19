import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1737225119970 implements MigrationInterface {
    name = 'Migration1737225119970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auctions" ADD "accountId" uuid`);
        await queryRunner.query(`ALTER TABLE "auctions" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."auctions_status_enum" AS ENUM('PENDING', 'STARTED', 'CLOSED', 'BIDDING', 'TIMEOUT')`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD "status" "public"."auctions_status_enum" NOT NULL DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD CONSTRAINT "FK_79155986424c2c2a0c8e3e97559" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auctions" DROP CONSTRAINT "FK_79155986424c2c2a0c8e3e97559"`);
        await queryRunner.query(`ALTER TABLE "auctions" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."auctions_status_enum"`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD "status" character varying NOT NULL DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "auctions" DROP COLUMN "accountId"`);
    }

}
