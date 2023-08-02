import { MigrationInterface, QueryRunner } from "typeorm";

export class UniversityMigration1690886177528 implements MigrationInterface {
    name = 'UniversityMigration1690886177528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "university_important_dates_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "deadline" TIMESTAMP NOT NULL, "additional_dates" json NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "universityId" uuid, CONSTRAINT "PK_0bcafe99621881518c8f01eaf0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "university_admission_information_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "admission_steps" json NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "universityId" uuid, CONSTRAINT "REL_a02f4ef620610ac73e29d0b494" UNIQUE ("universityId"), CONSTRAINT "PK_5eabf7b0600f8ad0ad18edc8e3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "university_admission_requirements_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "certificates" json NOT NULL, "requirements" json NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "universityId" uuid, CONSTRAINT "REL_9e6d87a271c1e4c4928db9d7d2" UNIQUE ("universityId"), CONSTRAINT "PK_ed98b874355dd6100fdeb3c7a02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "university_tuition_cost_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "tuition_cost" integer NOT NULL, "full_cost" integer NOT NULL, "additional_cost" json NOT NULL, "program_cost" json NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "universityId" uuid, CONSTRAINT "REL_b37cf0e5980c9366755d29b652" UNIQUE ("universityId"), CONSTRAINT "PK_06e19490a5c9015496a403a7371" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "university_speciality_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "min_cost" integer NOT NULL, "max_cost" integer NOT NULL, "directions" character varying array, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "facultyId" uuid, CONSTRAINT "PK_89dce1b709ae6f491cfb735993e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "university_faculty_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "degreeId" uuid, CONSTRAINT "PK_33d0d4f0803fb9458f59362352d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."university_degree_entity_degree_enum" AS ENUM('Bachelor', 'Master''s degree', 'Language program', 'Foundation', 'Degree Preparation')`);
        await queryRunner.query(`CREATE TABLE "university_degree_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "degree" "public"."university_degree_entity_degree_enum" NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "universityId" uuid, CONSTRAINT "PK_ab12dd8c35ec400b7671a6a3ced" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "university_discount_scholarships_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "program_cost" json NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "universityId" uuid, CONSTRAINT "REL_6ed4320f827e2d08b1e3f40f5b" UNIQUE ("universityId"), CONSTRAINT "PK_b3519f93154987095cbb1aac35b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "university_campus_information_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "additional_description" character varying NOT NULL, "gallery" uuid array, "additional_dates" json NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "universityId" uuid, CONSTRAINT "PK_c22b8d48027350ddd7869471a6c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD "is_visible" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD "can_apply" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD "logo" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD "color" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD "gallery" uuid array`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD "key_facts" json NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD "rating_information" json NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."university_entity_top_rating_enum" AS ENUM('TOP_100', 'TOP_200', 'TOP_500')`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD "top_rating" "public"."university_entity_top_rating_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD "full_description" character varying NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."university_entity_scholarship_type_enum" AS ENUM('NEED_BASED', 'MERIT', 'GOVERNTMENT')`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD "scholarship_type" "public"."university_entity_scholarship_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_important_dates_entity" ADD CONSTRAINT "FK_52bf4231cb785860053769fab20" FOREIGN KEY ("universityId") REFERENCES "university_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "university_admission_information_entity" ADD CONSTRAINT "FK_a02f4ef620610ac73e29d0b4944" FOREIGN KEY ("universityId") REFERENCES "university_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "university_admission_requirements_entity" ADD CONSTRAINT "FK_9e6d87a271c1e4c4928db9d7d21" FOREIGN KEY ("universityId") REFERENCES "university_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "university_tuition_cost_entity" ADD CONSTRAINT "FK_b37cf0e5980c9366755d29b6528" FOREIGN KEY ("universityId") REFERENCES "university_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "university_speciality_entity" ADD CONSTRAINT "FK_923d97a48e6b13dad3f4cbd8af4" FOREIGN KEY ("facultyId") REFERENCES "university_faculty_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "university_faculty_entity" ADD CONSTRAINT "FK_6b62f27c9e903c3cceb948a3fde" FOREIGN KEY ("degreeId") REFERENCES "university_degree_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "university_degree_entity" ADD CONSTRAINT "FK_e013304671d9f5d7e3b01698ae2" FOREIGN KEY ("universityId") REFERENCES "university_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "university_discount_scholarships_entity" ADD CONSTRAINT "FK_6ed4320f827e2d08b1e3f40f5b3" FOREIGN KEY ("universityId") REFERENCES "university_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "university_campus_information_entity" ADD CONSTRAINT "FK_93c35881733282778fc7d6f7c85" FOREIGN KEY ("universityId") REFERENCES "university_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "university_campus_information_entity" DROP CONSTRAINT "FK_93c35881733282778fc7d6f7c85"`);
        await queryRunner.query(`ALTER TABLE "university_discount_scholarships_entity" DROP CONSTRAINT "FK_6ed4320f827e2d08b1e3f40f5b3"`);
        await queryRunner.query(`ALTER TABLE "university_degree_entity" DROP CONSTRAINT "FK_e013304671d9f5d7e3b01698ae2"`);
        await queryRunner.query(`ALTER TABLE "university_faculty_entity" DROP CONSTRAINT "FK_6b62f27c9e903c3cceb948a3fde"`);
        await queryRunner.query(`ALTER TABLE "university_speciality_entity" DROP CONSTRAINT "FK_923d97a48e6b13dad3f4cbd8af4"`);
        await queryRunner.query(`ALTER TABLE "university_tuition_cost_entity" DROP CONSTRAINT "FK_b37cf0e5980c9366755d29b6528"`);
        await queryRunner.query(`ALTER TABLE "university_admission_requirements_entity" DROP CONSTRAINT "FK_9e6d87a271c1e4c4928db9d7d21"`);
        await queryRunner.query(`ALTER TABLE "university_admission_information_entity" DROP CONSTRAINT "FK_a02f4ef620610ac73e29d0b4944"`);
        await queryRunner.query(`ALTER TABLE "university_important_dates_entity" DROP CONSTRAINT "FK_52bf4231cb785860053769fab20"`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP COLUMN "scholarship_type"`);
        await queryRunner.query(`DROP TYPE "public"."university_entity_scholarship_type_enum"`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP COLUMN "full_description"`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP COLUMN "top_rating"`);
        await queryRunner.query(`DROP TYPE "public"."university_entity_top_rating_enum"`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP COLUMN "rating_information"`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP COLUMN "key_facts"`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP COLUMN "gallery"`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP COLUMN "color"`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP COLUMN "logo"`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP COLUMN "can_apply"`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP COLUMN "is_visible"`);
        await queryRunner.query(`DROP TABLE "university_campus_information_entity"`);
        await queryRunner.query(`DROP TABLE "university_discount_scholarships_entity"`);
        await queryRunner.query(`DROP TABLE "university_degree_entity"`);
        await queryRunner.query(`DROP TYPE "public"."university_degree_entity_degree_enum"`);
        await queryRunner.query(`DROP TABLE "university_faculty_entity"`);
        await queryRunner.query(`DROP TABLE "university_speciality_entity"`);
        await queryRunner.query(`DROP TABLE "university_tuition_cost_entity"`);
        await queryRunner.query(`DROP TABLE "university_admission_requirements_entity"`);
        await queryRunner.query(`DROP TABLE "university_admission_information_entity"`);
        await queryRunner.query(`DROP TABLE "university_important_dates_entity"`);
    }

}
