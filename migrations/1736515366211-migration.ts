import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736515366211 implements MigrationInterface {
    name = 'Migration1736515366211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "category"`);
        await queryRunner.query(`CREATE TYPE "public"."products_category_enum" AS ENUM('Fruits', 'Vegetables', 'Grains', 'Nuts', 'Seeds', 'Legumes', 'Herbs & Spices', 'Dairy', 'Eggs', 'Meat', 'Seafood', 'Baked Goods', 'Beverages', 'Processed Foods', 'Other')`);
        await queryRunner.query(`ALTER TABLE "products" ADD "category" "public"."products_category_enum" NOT NULL DEFAULT 'Other'`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "unit"`);
        await queryRunner.query(`CREATE TYPE "public"."products_unit_enum" AS ENUM('kg', 'g', 'lb', 'oz', 'l', 'ml', 'bushel', 'crate', 'box', 'bag', 'bunch', 'dozen', 'unit', 'pack', 'tray', 'other')`);
        await queryRunner.query(`ALTER TABLE "products" ADD "unit" "public"."products_unit_enum" NOT NULL DEFAULT 'kg'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "unit"`);
        await queryRunner.query(`DROP TYPE "public"."products_unit_enum"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "unit" character varying NOT NULL DEFAULT 'kg'`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "category"`);
        await queryRunner.query(`DROP TYPE "public"."products_category_enum"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "category" character varying NOT NULL DEFAULT 'General'`);
    }

}
