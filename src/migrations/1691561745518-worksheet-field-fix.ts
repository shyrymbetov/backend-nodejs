import { MigrationInterface, QueryRunner } from "typeorm";

export class WorksheetFieldFix1691561745518 implements MigrationInterface {
    name = 'WorksheetFieldFix1691561745518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" RENAME COLUMN "scholarship_type" TO "type"`);
        await queryRunner.query(`ALTER TYPE "public"."worksheet_fields_entity_scholarship_type_enum" RENAME TO "worksheet_fields_entity_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."worksheet_fields_entity_type_enum" RENAME TO "worksheet_fields_entity_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."worksheet_fields_entity_type_enum" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM')`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" ALTER COLUMN "type" TYPE "public"."worksheet_fields_entity_type_enum" USING "type"::"text"::"public"."worksheet_fields_entity_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."worksheet_fields_entity_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."worksheet_fields_entity_type_enum_old" AS ENUM('NEED_BASED', 'MERIT', 'GOVERNTMENT')`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" ALTER COLUMN "type" TYPE "public"."worksheet_fields_entity_type_enum_old" USING "type"::"text"::"public"."worksheet_fields_entity_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."worksheet_fields_entity_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."worksheet_fields_entity_type_enum_old" RENAME TO "worksheet_fields_entity_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."worksheet_fields_entity_type_enum" RENAME TO "worksheet_fields_entity_scholarship_type_enum"`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" RENAME COLUMN "type" TO "scholarship_type"`);
    }

}
