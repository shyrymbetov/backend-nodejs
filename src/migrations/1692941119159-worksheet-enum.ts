import { MigrationInterface, QueryRunner } from "typeorm";

export class WorksheetEnum1692941119159 implements MigrationInterface {
    name = 'WorksheetEnum1692941119159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."worksheet_fields_entity_type_enum" RENAME TO "worksheet_fields_entity_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."worksheet_fields_entity_type_enum" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM', 'TEXT')`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" ALTER COLUMN "type" TYPE "public"."worksheet_fields_entity_type_enum" USING "type"::"text"::"public"."worksheet_fields_entity_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."worksheet_fields_entity_type_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."application_contacts_fields_entity_type_enum" RENAME TO "application_contacts_fields_entity_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."application_contacts_fields_entity_type_enum" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM', 'TEXT')`);
        await queryRunner.query(`ALTER TABLE "application_contacts_fields_entity" ALTER COLUMN "type" TYPE "public"."application_contacts_fields_entity_type_enum" USING "type"::"text"::"public"."application_contacts_fields_entity_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."application_contacts_fields_entity_type_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."application_education_fields_entity_type_enum" RENAME TO "application_education_fields_entity_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."application_education_fields_entity_type_enum" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM', 'TEXT')`);
        await queryRunner.query(`ALTER TABLE "application_education_fields_entity" ALTER COLUMN "type" TYPE "public"."application_education_fields_entity_type_enum" USING "type"::"text"::"public"."application_education_fields_entity_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."application_education_fields_entity_type_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."application_languages_fields_entity_type_enum" RENAME TO "application_languages_fields_entity_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."application_languages_fields_entity_type_enum" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM', 'TEXT')`);
        await queryRunner.query(`ALTER TABLE "application_languages_fields_entity" ALTER COLUMN "type" TYPE "public"."application_languages_fields_entity_type_enum" USING "type"::"text"::"public"."application_languages_fields_entity_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."application_languages_fields_entity_type_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."application_recommendations_fields_entity_type_enum" RENAME TO "application_recommendations_fields_entity_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."application_recommendations_fields_entity_type_enum" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM', 'TEXT')`);
        await queryRunner.query(`ALTER TABLE "application_recommendations_fields_entity" ALTER COLUMN "type" TYPE "public"."application_recommendations_fields_entity_type_enum" USING "type"::"text"::"public"."application_recommendations_fields_entity_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."application_recommendations_fields_entity_type_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."application_motivation_fields_entity_type_enum" RENAME TO "application_motivation_fields_entity_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."application_motivation_fields_entity_type_enum" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM', 'TEXT')`);
        await queryRunner.query(`ALTER TABLE "application_motivation_fields_entity" ALTER COLUMN "type" TYPE "public"."application_motivation_fields_entity_type_enum" USING "type"::"text"::"public"."application_motivation_fields_entity_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."application_motivation_fields_entity_type_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."application_documents_fields_entity_type_enum" RENAME TO "application_documents_fields_entity_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."application_documents_fields_entity_type_enum" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM', 'TEXT')`);
        await queryRunner.query(`ALTER TABLE "application_documents_fields_entity" ALTER COLUMN "type" TYPE "public"."application_documents_fields_entity_type_enum" USING "type"::"text"::"public"."application_documents_fields_entity_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."application_documents_fields_entity_type_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."application_other_fields_entity_type_enum" RENAME TO "application_other_fields_entity_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."application_other_fields_entity_type_enum" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM', 'TEXT')`);
        await queryRunner.query(`ALTER TABLE "application_other_fields_entity" ALTER COLUMN "type" TYPE "public"."application_other_fields_entity_type_enum" USING "type"::"text"::"public"."application_other_fields_entity_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."application_other_fields_entity_type_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."application_profile_fields_entity_type_enum" RENAME TO "application_profile_fields_entity_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."application_profile_fields_entity_type_enum" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM', 'TEXT')`);
        await queryRunner.query(`ALTER TABLE "application_profile_fields_entity" ALTER COLUMN "type" TYPE "public"."application_profile_fields_entity_type_enum" USING "type"::"text"::"public"."application_profile_fields_entity_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."application_profile_fields_entity_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."application_profile_fields_entity_type_enum_old" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM')`);
        await queryRunner.query(`ALTER TABLE "application_profile_fields_entity" ALTER COLUMN "type" TYPE "public"."application_profile_fields_entity_type_enum_old" USING "type"::"text"::"public"."application_profile_fields_entity_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."application_profile_fields_entity_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."application_profile_fields_entity_type_enum_old" RENAME TO "application_profile_fields_entity_type_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."application_other_fields_entity_type_enum_old" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM')`);
        await queryRunner.query(`ALTER TABLE "application_other_fields_entity" ALTER COLUMN "type" TYPE "public"."application_other_fields_entity_type_enum_old" USING "type"::"text"::"public"."application_other_fields_entity_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."application_other_fields_entity_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."application_other_fields_entity_type_enum_old" RENAME TO "application_other_fields_entity_type_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."application_documents_fields_entity_type_enum_old" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM')`);
        await queryRunner.query(`ALTER TABLE "application_documents_fields_entity" ALTER COLUMN "type" TYPE "public"."application_documents_fields_entity_type_enum_old" USING "type"::"text"::"public"."application_documents_fields_entity_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."application_documents_fields_entity_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."application_documents_fields_entity_type_enum_old" RENAME TO "application_documents_fields_entity_type_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."application_motivation_fields_entity_type_enum_old" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM')`);
        await queryRunner.query(`ALTER TABLE "application_motivation_fields_entity" ALTER COLUMN "type" TYPE "public"."application_motivation_fields_entity_type_enum_old" USING "type"::"text"::"public"."application_motivation_fields_entity_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."application_motivation_fields_entity_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."application_motivation_fields_entity_type_enum_old" RENAME TO "application_motivation_fields_entity_type_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."application_recommendations_fields_entity_type_enum_old" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM')`);
        await queryRunner.query(`ALTER TABLE "application_recommendations_fields_entity" ALTER COLUMN "type" TYPE "public"."application_recommendations_fields_entity_type_enum_old" USING "type"::"text"::"public"."application_recommendations_fields_entity_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."application_recommendations_fields_entity_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."application_recommendations_fields_entity_type_enum_old" RENAME TO "application_recommendations_fields_entity_type_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."application_languages_fields_entity_type_enum_old" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM')`);
        await queryRunner.query(`ALTER TABLE "application_languages_fields_entity" ALTER COLUMN "type" TYPE "public"."application_languages_fields_entity_type_enum_old" USING "type"::"text"::"public"."application_languages_fields_entity_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."application_languages_fields_entity_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."application_languages_fields_entity_type_enum_old" RENAME TO "application_languages_fields_entity_type_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."application_education_fields_entity_type_enum_old" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM')`);
        await queryRunner.query(`ALTER TABLE "application_education_fields_entity" ALTER COLUMN "type" TYPE "public"."application_education_fields_entity_type_enum_old" USING "type"::"text"::"public"."application_education_fields_entity_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."application_education_fields_entity_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."application_education_fields_entity_type_enum_old" RENAME TO "application_education_fields_entity_type_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."application_contacts_fields_entity_type_enum_old" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM')`);
        await queryRunner.query(`ALTER TABLE "application_contacts_fields_entity" ALTER COLUMN "type" TYPE "public"."application_contacts_fields_entity_type_enum_old" USING "type"::"text"::"public"."application_contacts_fields_entity_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."application_contacts_fields_entity_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."application_contacts_fields_entity_type_enum_old" RENAME TO "application_contacts_fields_entity_type_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."worksheet_fields_entity_type_enum_old" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM')`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" ALTER COLUMN "type" TYPE "public"."worksheet_fields_entity_type_enum_old" USING "type"::"text"::"public"."worksheet_fields_entity_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."worksheet_fields_entity_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."worksheet_fields_entity_type_enum_old" RENAME TO "worksheet_fields_entity_type_enum"`);
    }

}
