import { MigrationInterface, QueryRunner } from "typeorm";

export class UniversityFix1693212151774 implements MigrationInterface {
    name = 'UniversityFix1693212151774'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "university_campus_information_entity" DROP COLUMN "gallery"`);
        await queryRunner.query(`ALTER TABLE "university_tuition_cost_entity" DROP COLUMN "full_cost"`);
        await queryRunner.query(`ALTER TABLE "university_campus_information_entity" ADD "image" uuid`);
        await queryRunner.query(`ALTER TABLE "university_campus_information_entity" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "university_campus_information_entity" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "university_campus_information_entity" DROP COLUMN "additional_description"`);
        await queryRunner.query(`ALTER TABLE "university_campus_information_entity" ADD "additional_description" text`);
        await queryRunner.query(`ALTER TABLE "university_admission_entity" DROP COLUMN "gen_description"`);
        await queryRunner.query(`ALTER TABLE "university_admission_entity" ADD "gen_description" text`);
        await queryRunner.query(`ALTER TABLE "university_admission_entity" DROP COLUMN "req_description"`);
        await queryRunner.query(`ALTER TABLE "university_admission_entity" ADD "req_description" text`);
        await queryRunner.query(`ALTER TABLE "university_tuition_cost_entity" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "university_tuition_cost_entity" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "university_degree_entity" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "university_degree_entity" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "university_discount_scholarships_entity" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "university_discount_scholarships_entity" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP COLUMN "full_description"`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD "full_description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "university_entity" DROP COLUMN "full_description"`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD "full_description" character varying`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "university_discount_scholarships_entity" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "university_discount_scholarships_entity" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "university_degree_entity" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "university_degree_entity" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "university_tuition_cost_entity" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "university_tuition_cost_entity" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "university_admission_entity" DROP COLUMN "req_description"`);
        await queryRunner.query(`ALTER TABLE "university_admission_entity" ADD "req_description" character varying`);
        await queryRunner.query(`ALTER TABLE "university_admission_entity" DROP COLUMN "gen_description"`);
        await queryRunner.query(`ALTER TABLE "university_admission_entity" ADD "gen_description" character varying`);
        await queryRunner.query(`ALTER TABLE "university_campus_information_entity" DROP COLUMN "additional_description"`);
        await queryRunner.query(`ALTER TABLE "university_campus_information_entity" ADD "additional_description" character varying`);
        await queryRunner.query(`ALTER TABLE "university_campus_information_entity" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "university_campus_information_entity" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "university_campus_information_entity" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "university_tuition_cost_entity" ADD "full_cost" integer`);
        await queryRunner.query(`ALTER TABLE "university_campus_information_entity" ADD "gallery" uuid array`);
    }

}
