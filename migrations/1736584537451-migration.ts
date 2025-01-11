import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736584537451 implements MigrationInterface {
    name = 'Migration1736584537451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "branches" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "country" character varying NOT NULL, "city" character varying NOT NULL, "address" character varying NOT NULL, "name" character varying NOT NULL, "cover" character varying NOT NULL, "locationLat" double precision, "locationLon" double precision, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "accountId" uuid, CONSTRAINT "PK_7f37d3b42defea97f1df0d19535" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "branches" ADD CONSTRAINT "FK_2cc5f77a32adb29281702d07dcc" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "branches" DROP CONSTRAINT "FK_2cc5f77a32adb29281702d07dcc"`);
        await queryRunner.query(`DROP TABLE "branches"`);
    }

}
