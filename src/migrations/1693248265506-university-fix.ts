import { MigrationInterface, QueryRunner } from "typeorm";

export class UniversityFix1693248265506 implements MigrationInterface {
    name = 'UniversityFix1693248265506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" ADD "index" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" DROP COLUMN "index"`);
    }

}
