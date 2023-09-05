import { MigrationInterface, QueryRunner } from "typeorm";

export class ApplicationFiedls1693569665244 implements MigrationInterface {
    name = 'ApplicationFiedls1693569665244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application_entity" DROP CONSTRAINT "FK_68689449ffb56d6373d11f1fc02"`);
        await queryRunner.query(`ALTER TABLE "application_entity" DROP CONSTRAINT "FK_7c39d0ae3f167c6c0a22a28924f"`);
        await queryRunner.query(`CREATE TYPE "public"."application_fields_entity_type_enum" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM', 'TEXT')`);
        await queryRunner.query(`CREATE TYPE "public"."application_fields_entity_answer_type_enum" AS ENUM('SINGLE', 'MULTIPLE')`);
        await queryRunner.query(`CREATE TABLE "application_fields_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "worksheet_field_id" uuid, "field_value" text, "type" "public"."application_fields_entity_type_enum" NOT NULL, "placeholder" character varying, "description" text, "title" character varying, "required" boolean NOT NULL DEFAULT false, "index" integer NOT NULL DEFAULT '0', "is_multiple_upload" boolean, "is_first_option_empty" boolean, "is_checked_by_default" boolean, "text_limitation" json, "options" character varying array, "answer_type" "public"."application_fields_entity_answer_type_enum", "text" character varying, "date_format" character varying, "quantity" json, "content" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "profile_id" uuid, "contacts_id" uuid, "education_id" uuid, "languages_id" uuid, "recommendations_id" uuid, "motivation_id" uuid, "documents_id" uuid, "other_id" uuid, CONSTRAINT "PK_ee6561e5638602849f5375c56e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chat_messages_entity" DROP COLUMN "files"`);
        await queryRunner.query(`ALTER TABLE "chat_messages_entity" DROP COLUMN "text"`);
        await queryRunner.query(`ALTER TABLE "application_entity" DROP COLUMN "universityId"`);
        await queryRunner.query(`ALTER TABLE "application_entity" DROP COLUMN "studentId"`);
        await queryRunner.query(`ALTER TABLE "chat_messages_entity" ADD "content" text`);
        await queryRunner.query(`ALTER TABLE "application_entity" ADD "student_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "application_entity" ADD "university_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "application_entity" ALTER COLUMN "speciality_type" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "application_entity" ALTER COLUMN "is_archived" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "application_entity" ALTER COLUMN "is_archived" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "application_fields_entity" ADD CONSTRAINT "FK_c4764dfeaf31746025149f1645a" FOREIGN KEY ("profile_id") REFERENCES "application_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_fields_entity" ADD CONSTRAINT "FK_b73614a1f13de5c2a87c3f2640f" FOREIGN KEY ("contacts_id") REFERENCES "application_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_fields_entity" ADD CONSTRAINT "FK_1973df0675e7c269b6d92e41cd6" FOREIGN KEY ("education_id") REFERENCES "application_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_fields_entity" ADD CONSTRAINT "FK_33d942d37818cde60490467f680" FOREIGN KEY ("languages_id") REFERENCES "application_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_fields_entity" ADD CONSTRAINT "FK_112be9ea25b8e6af469080c4b2b" FOREIGN KEY ("recommendations_id") REFERENCES "application_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_fields_entity" ADD CONSTRAINT "FK_b69b9f140326fbf975a2961151a" FOREIGN KEY ("motivation_id") REFERENCES "application_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_fields_entity" ADD CONSTRAINT "FK_5ee01a3f3ba4ffc5e40fe81979e" FOREIGN KEY ("documents_id") REFERENCES "application_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_fields_entity" ADD CONSTRAINT "FK_18938ebb4beb1535672672c9f9b" FOREIGN KEY ("other_id") REFERENCES "application_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_entity" ADD CONSTRAINT "FK_3b24c6d8140c9367fdec1cc226c" FOREIGN KEY ("student_id") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_entity" ADD CONSTRAINT "FK_42e4f48e71fb46dedfad1d70caa" FOREIGN KEY ("university_id") REFERENCES "university_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application_entity" DROP CONSTRAINT "FK_42e4f48e71fb46dedfad1d70caa"`);
        await queryRunner.query(`ALTER TABLE "application_entity" DROP CONSTRAINT "FK_3b24c6d8140c9367fdec1cc226c"`);
        await queryRunner.query(`ALTER TABLE "application_fields_entity" DROP CONSTRAINT "FK_18938ebb4beb1535672672c9f9b"`);
        await queryRunner.query(`ALTER TABLE "application_fields_entity" DROP CONSTRAINT "FK_5ee01a3f3ba4ffc5e40fe81979e"`);
        await queryRunner.query(`ALTER TABLE "application_fields_entity" DROP CONSTRAINT "FK_b69b9f140326fbf975a2961151a"`);
        await queryRunner.query(`ALTER TABLE "application_fields_entity" DROP CONSTRAINT "FK_112be9ea25b8e6af469080c4b2b"`);
        await queryRunner.query(`ALTER TABLE "application_fields_entity" DROP CONSTRAINT "FK_33d942d37818cde60490467f680"`);
        await queryRunner.query(`ALTER TABLE "application_fields_entity" DROP CONSTRAINT "FK_1973df0675e7c269b6d92e41cd6"`);
        await queryRunner.query(`ALTER TABLE "application_fields_entity" DROP CONSTRAINT "FK_b73614a1f13de5c2a87c3f2640f"`);
        await queryRunner.query(`ALTER TABLE "application_fields_entity" DROP CONSTRAINT "FK_c4764dfeaf31746025149f1645a"`);
        await queryRunner.query(`ALTER TABLE "application_entity" ALTER COLUMN "is_archived" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "application_entity" ALTER COLUMN "is_archived" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "application_entity" ALTER COLUMN "speciality_type" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "application_entity" DROP COLUMN "university_id"`);
        await queryRunner.query(`ALTER TABLE "application_entity" DROP COLUMN "student_id"`);
        await queryRunner.query(`ALTER TABLE "chat_messages_entity" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "application_entity" ADD "studentId" uuid`);
        await queryRunner.query(`ALTER TABLE "application_entity" ADD "universityId" uuid`);
        await queryRunner.query(`ALTER TABLE "chat_messages_entity" ADD "text" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_messages_entity" ADD "files" json NOT NULL`);
        await queryRunner.query(`DROP TABLE "application_fields_entity"`);
        await queryRunner.query(`DROP TYPE "public"."application_fields_entity_answer_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."application_fields_entity_type_enum"`);
        await queryRunner.query(`ALTER TABLE "application_entity" ADD CONSTRAINT "FK_7c39d0ae3f167c6c0a22a28924f" FOREIGN KEY ("studentId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_entity" ADD CONSTRAINT "FK_68689449ffb56d6373d11f1fc02" FOREIGN KEY ("universityId") REFERENCES "university_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
