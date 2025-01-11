import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736584877469 implements MigrationInterface {
    name = 'Migration1736584877469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "branchId" uuid`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_dd1b22e313f7e7d28805557261f" FOREIGN KEY ("branchId") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_dd1b22e313f7e7d28805557261f"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "branchId"`);
    }

}
