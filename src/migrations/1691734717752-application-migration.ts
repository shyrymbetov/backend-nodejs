import { MigrationInterface, QueryRunner } from "typeorm";

export class ApplicationMigration1691734717752 implements MigrationInterface {
    name = 'ApplicationMigration1691734717752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "university_entity" DROP CONSTRAINT "FK_aa5ea3e746b47eed278377a5668"`);
        await queryRunner.query(`ALTER TABLE "university_entity" RENAME COLUMN "stateId" TO "state"`);
        await queryRunner.query(`CREATE TYPE "public"."application_contacts_fields_entity_type_enum" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM')`);
        await queryRunner.query(`CREATE TYPE "public"."application_contacts_fields_entity_answer_type_enum" AS ENUM('SINGLE', 'MULTIPLE')`);
        await queryRunner.query(`CREATE TABLE "application_contacts_fields_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "field_value" text, "type" "public"."application_contacts_fields_entity_type_enum" NOT NULL, "placeholder" character varying, "description" character varying, "title" character varying, "required" boolean NOT NULL DEFAULT false, "is_first_option_empty" boolean, "is_checked_by_default" boolean, "text_limitation" json, "options" character varying array, "answer_type" "public"."application_contacts_fields_entity_answer_type_enum", "text" character varying, "date_format" character varying, "quantity" json, "content" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "application_id" uuid, CONSTRAINT "PK_9149666dacbce7c61c904b8a1c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."application_education_fields_entity_type_enum" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM')`);
        await queryRunner.query(`CREATE TYPE "public"."application_education_fields_entity_answer_type_enum" AS ENUM('SINGLE', 'MULTIPLE')`);
        await queryRunner.query(`CREATE TABLE "application_education_fields_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "field_value" text, "type" "public"."application_education_fields_entity_type_enum" NOT NULL, "placeholder" character varying, "description" character varying, "title" character varying, "required" boolean NOT NULL DEFAULT false, "is_first_option_empty" boolean, "is_checked_by_default" boolean, "text_limitation" json, "options" character varying array, "answer_type" "public"."application_education_fields_entity_answer_type_enum", "text" character varying, "date_format" character varying, "quantity" json, "content" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "application_id" uuid, CONSTRAINT "PK_1532b1e6e5f200dd9c153604d1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."application_languages_fields_entity_type_enum" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM')`);
        await queryRunner.query(`CREATE TYPE "public"."application_languages_fields_entity_answer_type_enum" AS ENUM('SINGLE', 'MULTIPLE')`);
        await queryRunner.query(`CREATE TABLE "application_languages_fields_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "field_value" text, "type" "public"."application_languages_fields_entity_type_enum" NOT NULL, "placeholder" character varying, "description" character varying, "title" character varying, "required" boolean NOT NULL DEFAULT false, "is_first_option_empty" boolean, "is_checked_by_default" boolean, "text_limitation" json, "options" character varying array, "answer_type" "public"."application_languages_fields_entity_answer_type_enum", "text" character varying, "date_format" character varying, "quantity" json, "content" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "application_id" uuid, CONSTRAINT "PK_8ff7be049728c3eea37a6d9d701" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."application_recommendations_fields_entity_type_enum" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM')`);
        await queryRunner.query(`CREATE TYPE "public"."application_recommendations_fields_entity_answer_type_enum" AS ENUM('SINGLE', 'MULTIPLE')`);
        await queryRunner.query(`CREATE TABLE "application_recommendations_fields_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "field_value" text, "type" "public"."application_recommendations_fields_entity_type_enum" NOT NULL, "placeholder" character varying, "description" character varying, "title" character varying, "required" boolean NOT NULL DEFAULT false, "is_first_option_empty" boolean, "is_checked_by_default" boolean, "text_limitation" json, "options" character varying array, "answer_type" "public"."application_recommendations_fields_entity_answer_type_enum", "text" character varying, "date_format" character varying, "quantity" json, "content" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "application_id" uuid, CONSTRAINT "PK_8b9ca0e47f289ee68090e7c324a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."application_motivation_fields_entity_type_enum" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM')`);
        await queryRunner.query(`CREATE TYPE "public"."application_motivation_fields_entity_answer_type_enum" AS ENUM('SINGLE', 'MULTIPLE')`);
        await queryRunner.query(`CREATE TABLE "application_motivation_fields_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "field_value" text, "type" "public"."application_motivation_fields_entity_type_enum" NOT NULL, "placeholder" character varying, "description" character varying, "title" character varying, "required" boolean NOT NULL DEFAULT false, "is_first_option_empty" boolean, "is_checked_by_default" boolean, "text_limitation" json, "options" character varying array, "answer_type" "public"."application_motivation_fields_entity_answer_type_enum", "text" character varying, "date_format" character varying, "quantity" json, "content" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "application_id" uuid, CONSTRAINT "PK_fd89e7ee86fc39a909f94464cd9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."application_documents_fields_entity_type_enum" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM')`);
        await queryRunner.query(`CREATE TYPE "public"."application_documents_fields_entity_answer_type_enum" AS ENUM('SINGLE', 'MULTIPLE')`);
        await queryRunner.query(`CREATE TABLE "application_documents_fields_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "field_value" text, "type" "public"."application_documents_fields_entity_type_enum" NOT NULL, "placeholder" character varying, "description" character varying, "title" character varying, "required" boolean NOT NULL DEFAULT false, "is_first_option_empty" boolean, "is_checked_by_default" boolean, "text_limitation" json, "options" character varying array, "answer_type" "public"."application_documents_fields_entity_answer_type_enum", "text" character varying, "date_format" character varying, "quantity" json, "content" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "application_id" uuid, CONSTRAINT "PK_61bd895cbf2c484b19539dbb42c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."application_other_fields_entity_type_enum" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM')`);
        await queryRunner.query(`CREATE TYPE "public"."application_other_fields_entity_answer_type_enum" AS ENUM('SINGLE', 'MULTIPLE')`);
        await queryRunner.query(`CREATE TABLE "application_other_fields_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "field_value" text, "type" "public"."application_other_fields_entity_type_enum" NOT NULL, "placeholder" character varying, "description" character varying, "title" character varying, "required" boolean NOT NULL DEFAULT false, "is_first_option_empty" boolean, "is_checked_by_default" boolean, "text_limitation" json, "options" character varying array, "answer_type" "public"."application_other_fields_entity_answer_type_enum", "text" character varying, "date_format" character varying, "quantity" json, "content" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "application_id" uuid, CONSTRAINT "PK_6240744728de155df3c28e0a099" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."application_profile_fields_entity_type_enum" AS ENUM('NAME', 'EMAIL', 'PHONE', 'DATE', 'DROPDOWN', 'LIMITATION', 'SURVEY', 'CHECK', 'FILE', 'QUANTITY', 'EDUCATION_FORM')`);
        await queryRunner.query(`CREATE TYPE "public"."application_profile_fields_entity_answer_type_enum" AS ENUM('SINGLE', 'MULTIPLE')`);
        await queryRunner.query(`CREATE TABLE "application_profile_fields_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "field_value" text, "type" "public"."application_profile_fields_entity_type_enum" NOT NULL, "placeholder" character varying, "description" character varying, "title" character varying, "required" boolean NOT NULL DEFAULT false, "is_first_option_empty" boolean, "is_checked_by_default" boolean, "text_limitation" json, "options" character varying array, "answer_type" "public"."application_profile_fields_entity_answer_type_enum", "text" character varying, "date_format" character varying, "quantity" json, "content" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "application_id" uuid, CONSTRAINT "PK_99a60ac715f82431b45159591d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "application_entity" ADD "speciality_type" json NOT NULL`);
        await queryRunner.query(`ALTER TABLE "application_entity" ADD "is_archived" boolean NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."application_entity_application_status_enum" AS ENUM('DRAFT', 'APPLICATION_RECEIVED', 'UNDER_CONSIDERATION', 'OFFER_RECEIVED', 'CONFIRMED', 'DEPARTURE')`);
        await queryRunner.query(`ALTER TABLE "application_entity" ADD "application_status" "public"."application_entity_application_status_enum" NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."application_entity_actions_status_enum" AS ENUM('ISSUED_OFFER', 'REQUIRES_ACTION', 'REJECTED_OFFER')`);
        await queryRunner.query(`ALTER TABLE "application_entity" ADD "actions_status" "public"."application_entity_actions_status_enum"`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "application_contacts_fields_entity" ADD CONSTRAINT "FK_a77387b8f6c8b07aa9633c05ba8" FOREIGN KEY ("application_id") REFERENCES "application_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_education_fields_entity" ADD CONSTRAINT "FK_c942cdd9780dd7c2606c774c7b3" FOREIGN KEY ("application_id") REFERENCES "application_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_languages_fields_entity" ADD CONSTRAINT "FK_13f92914316ce3231e2054ce536" FOREIGN KEY ("application_id") REFERENCES "application_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_recommendations_fields_entity" ADD CONSTRAINT "FK_ff5cf6cc6e440eb8a404eefe287" FOREIGN KEY ("application_id") REFERENCES "application_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_motivation_fields_entity" ADD CONSTRAINT "FK_5cc2767ae1ad0880e7ee0325d24" FOREIGN KEY ("application_id") REFERENCES "application_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_documents_fields_entity" ADD CONSTRAINT "FK_b511da903a1d964f8f69bac5f43" FOREIGN KEY ("application_id") REFERENCES "application_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_other_fields_entity" ADD CONSTRAINT "FK_79dc3462d43019b0a190e1418c8" FOREIGN KEY ("application_id") REFERENCES "application_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_profile_fields_entity" ADD CONSTRAINT "FK_843ea7696d1aed0bdae5e700420" FOREIGN KEY ("application_id") REFERENCES "application_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application_profile_fields_entity" DROP CONSTRAINT "FK_843ea7696d1aed0bdae5e700420"`);
        await queryRunner.query(`ALTER TABLE "application_other_fields_entity" DROP CONSTRAINT "FK_79dc3462d43019b0a190e1418c8"`);
        await queryRunner.query(`ALTER TABLE "application_documents_fields_entity" DROP CONSTRAINT "FK_b511da903a1d964f8f69bac5f43"`);
        await queryRunner.query(`ALTER TABLE "application_motivation_fields_entity" DROP CONSTRAINT "FK_5cc2767ae1ad0880e7ee0325d24"`);
        await queryRunner.query(`ALTER TABLE "application_recommendations_fields_entity" DROP CONSTRAINT "FK_ff5cf6cc6e440eb8a404eefe287"`);
        await queryRunner.query(`ALTER TABLE "application_languages_fields_entity" DROP CONSTRAINT "FK_13f92914316ce3231e2054ce536"`);
        await queryRunner.query(`ALTER TABLE "application_education_fields_entity" DROP CONSTRAINT "FK_c942cdd9780dd7c2606c774c7b3"`);
        await queryRunner.query(`ALTER TABLE "application_contacts_fields_entity" DROP CONSTRAINT "FK_a77387b8f6c8b07aa9633c05ba8"`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD "state" uuid`);
        await queryRunner.query(`ALTER TABLE "application_entity" DROP COLUMN "actions_status"`);
        await queryRunner.query(`DROP TYPE "public"."application_entity_actions_status_enum"`);
        await queryRunner.query(`ALTER TABLE "application_entity" DROP COLUMN "application_status"`);
        await queryRunner.query(`DROP TYPE "public"."application_entity_application_status_enum"`);
        await queryRunner.query(`ALTER TABLE "application_entity" DROP COLUMN "is_archived"`);
        await queryRunner.query(`ALTER TABLE "application_entity" DROP COLUMN "speciality_type"`);
        await queryRunner.query(`DROP TABLE "application_profile_fields_entity"`);
        await queryRunner.query(`DROP TYPE "public"."application_profile_fields_entity_answer_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."application_profile_fields_entity_type_enum"`);
        await queryRunner.query(`DROP TABLE "application_other_fields_entity"`);
        await queryRunner.query(`DROP TYPE "public"."application_other_fields_entity_answer_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."application_other_fields_entity_type_enum"`);
        await queryRunner.query(`DROP TABLE "application_documents_fields_entity"`);
        await queryRunner.query(`DROP TYPE "public"."application_documents_fields_entity_answer_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."application_documents_fields_entity_type_enum"`);
        await queryRunner.query(`DROP TABLE "application_motivation_fields_entity"`);
        await queryRunner.query(`DROP TYPE "public"."application_motivation_fields_entity_answer_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."application_motivation_fields_entity_type_enum"`);
        await queryRunner.query(`DROP TABLE "application_recommendations_fields_entity"`);
        await queryRunner.query(`DROP TYPE "public"."application_recommendations_fields_entity_answer_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."application_recommendations_fields_entity_type_enum"`);
        await queryRunner.query(`DROP TABLE "application_languages_fields_entity"`);
        await queryRunner.query(`DROP TYPE "public"."application_languages_fields_entity_answer_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."application_languages_fields_entity_type_enum"`);
        await queryRunner.query(`DROP TABLE "application_education_fields_entity"`);
        await queryRunner.query(`DROP TYPE "public"."application_education_fields_entity_answer_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."application_education_fields_entity_type_enum"`);
        await queryRunner.query(`DROP TABLE "application_contacts_fields_entity"`);
        await queryRunner.query(`DROP TYPE "public"."application_contacts_fields_entity_answer_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."application_contacts_fields_entity_type_enum"`);
        await queryRunner.query(`ALTER TABLE "university_entity" RENAME COLUMN "state" TO "stateId"`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD CONSTRAINT "FK_aa5ea3e746b47eed278377a5668" FOREIGN KEY ("stateId") REFERENCES "university_state_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
