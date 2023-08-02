import { MigrationInterface, QueryRunner } from "typeorm";

export class WorksheetMigration1690945451395 implements MigrationInterface {
    name = 'WorksheetMigration1690945451395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."worksheet_fields_entity_scholarship_type_enum" AS ENUM('NEED_BASED', 'MERIT', 'GOVERNTMENT')`);
        await queryRunner.query(`CREATE TYPE "public"."worksheet_fields_entity_answer_type_enum" AS ENUM('SINGLE', 'MULTIPLE')`);
        await queryRunner.query(`CREATE TABLE "worksheet_fields_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "scholarship_type" "public"."worksheet_fields_entity_scholarship_type_enum" NOT NULL, "placeholder" character varying, "description" character varying, "title" character varying, "required" boolean NOT NULL DEFAULT false, "is_first_option_empty" boolean, "is_checked_by_default" boolean, "text_limitation" json, "options" character varying array, "answer_type" "public"."worksheet_fields_entity_answer_type_enum", "text" character varying, "date_format" character varying, "quantity" json, "content" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "profile_id" uuid, "contacts_id" uuid, "education_id" uuid, "languages_id" uuid, "recommendations_id" uuid, "motivation_id" uuid, "documents_id" uuid, "other_id" uuid, CONSTRAINT "PK_e4fd44ee227b7a17b34f010a90d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "worksheet_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "universityId" uuid, CONSTRAINT "REL_abbbe3122770a99ea3a9b73906" UNIQUE ("universityId"), CONSTRAINT "PK_59a64c5ebb53b304602612fbb62" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "university_country_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, CONSTRAINT "PK_1f51b5f813e80999bb28623dc46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "university_state_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "countryId" uuid, CONSTRAINT "PK_9d86f27471f687fb1b8e4ecc0e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP COLUMN "state"`);
        await queryRunner.query(`CREATE TYPE "public"."university_entity_study_language_enum" AS ENUM('ENGLISH', 'GOVERNMENT')`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD "study_language" "public"."university_entity_study_language_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD "countryId" uuid`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD "stateId" uuid`);
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "is_visible" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "can_apply" SET DEFAULT false`);
        await queryRunner.query(`ALTER TYPE "public"."university_entity_scholarship_type_enum" RENAME TO "university_entity_scholarship_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."university_entity_scholarship_type_enum" AS ENUM('NEED_BASED', 'MERIT', 'GOVERNMENT')`);
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "scholarship_type" TYPE "public"."university_entity_scholarship_type_enum" USING "scholarship_type"::"text"::"public"."university_entity_scholarship_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."university_entity_scholarship_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" ADD CONSTRAINT "FK_d9b012d9b8d2aca6a63b679cf28" FOREIGN KEY ("profile_id") REFERENCES "worksheet_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" ADD CONSTRAINT "FK_268a59c8db5bb67e44f0fbe504b" FOREIGN KEY ("contacts_id") REFERENCES "worksheet_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" ADD CONSTRAINT "FK_c1f2bef8c1088a94a592d371958" FOREIGN KEY ("education_id") REFERENCES "worksheet_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" ADD CONSTRAINT "FK_e371ca94c44e71609c8a9d16b13" FOREIGN KEY ("languages_id") REFERENCES "worksheet_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" ADD CONSTRAINT "FK_7326372de5d91346c7da8276c6a" FOREIGN KEY ("recommendations_id") REFERENCES "worksheet_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" ADD CONSTRAINT "FK_5f53e3ff6285731d657121a3660" FOREIGN KEY ("motivation_id") REFERENCES "worksheet_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" ADD CONSTRAINT "FK_e25583c8e8ed4556cc621929ddb" FOREIGN KEY ("documents_id") REFERENCES "worksheet_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" ADD CONSTRAINT "FK_9c7efb9741846125f3af73dae02" FOREIGN KEY ("other_id") REFERENCES "worksheet_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "worksheet_entity" ADD CONSTRAINT "FK_abbbe3122770a99ea3a9b739062" FOREIGN KEY ("universityId") REFERENCES "university_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "university_state_entity" ADD CONSTRAINT "FK_19d29b9afd25e1ef53edd00c703" FOREIGN KEY ("countryId") REFERENCES "university_country_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD CONSTRAINT "FK_3b67794d8c6b49037119e58d37f" FOREIGN KEY ("countryId") REFERENCES "university_country_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD CONSTRAINT "FK_aa5ea3e746b47eed278377a5668" FOREIGN KEY ("stateId") REFERENCES "university_state_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "university_entity" DROP CONSTRAINT "FK_aa5ea3e746b47eed278377a5668"`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP CONSTRAINT "FK_3b67794d8c6b49037119e58d37f"`);
        await queryRunner.query(`ALTER TABLE "university_state_entity" DROP CONSTRAINT "FK_19d29b9afd25e1ef53edd00c703"`);
        await queryRunner.query(`ALTER TABLE "worksheet_entity" DROP CONSTRAINT "FK_abbbe3122770a99ea3a9b739062"`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" DROP CONSTRAINT "FK_9c7efb9741846125f3af73dae02"`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" DROP CONSTRAINT "FK_e25583c8e8ed4556cc621929ddb"`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" DROP CONSTRAINT "FK_5f53e3ff6285731d657121a3660"`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" DROP CONSTRAINT "FK_7326372de5d91346c7da8276c6a"`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" DROP CONSTRAINT "FK_e371ca94c44e71609c8a9d16b13"`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" DROP CONSTRAINT "FK_c1f2bef8c1088a94a592d371958"`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" DROP CONSTRAINT "FK_268a59c8db5bb67e44f0fbe504b"`);
        await queryRunner.query(`ALTER TABLE "worksheet_fields_entity" DROP CONSTRAINT "FK_d9b012d9b8d2aca6a63b679cf28"`);
        await queryRunner.query(`CREATE TYPE "public"."university_entity_scholarship_type_enum_old" AS ENUM('NEED_BASED', 'MERIT', 'GOVERNTMENT')`);
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "scholarship_type" TYPE "public"."university_entity_scholarship_type_enum_old" USING "scholarship_type"::"text"::"public"."university_entity_scholarship_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."university_entity_scholarship_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."university_entity_scholarship_type_enum_old" RENAME TO "university_entity_scholarship_type_enum"`);
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "can_apply" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "is_visible" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP COLUMN "stateId"`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP COLUMN "countryId"`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP COLUMN "study_language"`);
        await queryRunner.query(`DROP TYPE "public"."university_entity_study_language_enum"`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "university_state_entity"`);
        await queryRunner.query(`DROP TABLE "university_country_entity"`);
        await queryRunner.query(`DROP TABLE "worksheet_entity"`);
        await queryRunner.query(`DROP TABLE "worksheet_fields_entity"`);
        await queryRunner.query(`DROP TYPE "public"."worksheet_fields_entity_answer_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."worksheet_fields_entity_scholarship_type_enum"`);
    }

}
