import { MigrationInterface, QueryRunner } from "typeorm";

export class WorksheetFieldFix1692352683979 implements MigrationInterface {
    name = 'WorksheetFieldFix1692352683979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" ADD "is_multiple_upload" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" DROP COLUMN "is_multiple_upload"`);
    }

}
