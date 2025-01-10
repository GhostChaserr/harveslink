import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736536994710 implements MigrationInterface {
    name = 'Migration1736536994710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_ab5ed7082f9dc4bd1ecc8e58993"`);
        await queryRunner.query(`ALTER TABLE "reservations" RENAME COLUMN "productId" TO "productUsageDetails"`);
        await queryRunner.query(`CREATE TABLE "reservations_products_products" ("reservationsId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_cf27906ae06b89afa7a2cf07048" PRIMARY KEY ("reservationsId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_479f27917f24d6624f0204d402" ON "reservations_products_products" ("reservationsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b8784b01504ed0499c7552a760" ON "reservations_products_products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "productUsageDetails"`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "productUsageDetails" jsonb`);
        await queryRunner.query(`ALTER TABLE "reservations_products_products" ADD CONSTRAINT "FK_479f27917f24d6624f0204d402c" FOREIGN KEY ("reservationsId") REFERENCES "reservations"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "reservations_products_products" ADD CONSTRAINT "FK_b8784b01504ed0499c7552a7606" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations_products_products" DROP CONSTRAINT "FK_b8784b01504ed0499c7552a7606"`);
        await queryRunner.query(`ALTER TABLE "reservations_products_products" DROP CONSTRAINT "FK_479f27917f24d6624f0204d402c"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "productUsageDetails"`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "productUsageDetails" uuid`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b8784b01504ed0499c7552a760"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_479f27917f24d6624f0204d402"`);
        await queryRunner.query(`DROP TABLE "reservations_products_products"`);
        await queryRunner.query(`ALTER TABLE "reservations" RENAME COLUMN "productUsageDetails" TO "productId"`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_ab5ed7082f9dc4bd1ecc8e58993" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
