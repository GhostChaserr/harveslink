import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736519225527 implements MigrationInterface {
    name = 'Migration1736519225527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "category" TO "categoryId"`);
        await queryRunner.query(`ALTER TYPE "public"."products_category_enum" RENAME TO "products_categoryid_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."categories_category_enum" AS ENUM('Fruits', 'Vegetables', 'Grains', 'Nuts', 'Seeds', 'Legumes', 'Herbs & Spices', 'Dairy', 'Eggs', 'Meat', 'Seafood', 'Baked Goods', 'Beverages', 'Processed Foods', 'Other')`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "category" "public"."categories_category_enum" NOT NULL DEFAULT 'Other', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "categoryId" "public"."products_categoryid_enum" NOT NULL DEFAULT 'Other'`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TYPE "public"."categories_category_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."products_categoryid_enum" RENAME TO "products_category_enum"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "categoryId" TO "category"`);
    }

}
