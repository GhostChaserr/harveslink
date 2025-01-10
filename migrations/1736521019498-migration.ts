import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736521019498 implements MigrationInterface {
    name = 'Migration1736521019498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "unit" TO "unitId"`);
        await queryRunner.query(`ALTER TYPE "public"."products_unit_enum" RENAME TO "products_unitid_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."units_name_enum" AS ENUM('kg', 'g', 'lb', 'oz', 'l', 'ml', 'bushel', 'crate', 'box', 'bag', 'bunch', 'dozen', 'unit', 'pack', 'tray', 'other')`);
        await queryRunner.query(`CREATE TABLE "units" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" "public"."units_name_enum" NOT NULL DEFAULT 'other', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5a8f2f064919b587d93936cb223" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "unitId"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "unitId" uuid`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_c65251602de2a10b9c6e1af8511" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_c65251602de2a10b9c6e1af8511"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "unitId"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "unitId" "public"."products_unitid_enum" NOT NULL DEFAULT 'kg'`);
        await queryRunner.query(`DROP TABLE "units"`);
        await queryRunner.query(`DROP TYPE "public"."units_name_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."products_unitid_enum" RENAME TO "products_unit_enum"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "unitId" TO "unit"`);
    }

}
