import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736510561036 implements MigrationInterface {
    name = 'Migration1736510561036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."products_status_enum" AS ENUM('active', 'sold_out', 'expired')`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productName" character varying NOT NULL, "category" character varying NOT NULL DEFAULT 'General', "description" character varying, "price" double precision NOT NULL DEFAULT '0', "country" character varying NOT NULL DEFAULT 'GEO', "unit" character varying NOT NULL DEFAULT 'kg', "quantityAvailable" double precision NOT NULL DEFAULT '0', "expiryDate" date, "media" text array NOT NULL DEFAULT '{}', "status" "public"."products_status_enum" NOT NULL DEFAULT 'active', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "farmerId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."accounts_accounttype_enum" AS ENUM('farmer', 'restaurant', 'consumer', 'charity', 'admin')`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "accountType" "public"."accounts_accounttype_enum" NOT NULL DEFAULT 'consumer', "phone" character varying, "locationLat" double precision, "locationLon" double precision, "ratingAverage" double precision NOT NULL DEFAULT '0', "reviewsCount" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ee66de6cdc53993296d1ceb8aa0" UNIQUE ("email"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_5c124086aa5e7d3bc35331eea60" FOREIGN KEY ("farmerId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_5c124086aa5e7d3bc35331eea60"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TYPE "public"."accounts_accounttype_enum"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TYPE "public"."products_status_enum"`);
    }

}
