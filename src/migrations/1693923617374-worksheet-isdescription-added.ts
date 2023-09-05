import { MigrationInterface, QueryRunner } from "typeorm";

export class WorksheetIsdescriptionAdded1693923617374 implements MigrationInterface {
    name = 'WorksheetIsdescriptionAdded1693923617374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" ADD "is_description" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" DROP COLUMN "is_description"`);
    }

}
