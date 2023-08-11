import { MigrationInterface, QueryRunner } from "typeorm";

export class UniversityFixMigration1691751120352 implements MigrationInterface {
    name = 'UniversityFixMigration1691751120352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "university_important_dates_entity" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_important_dates_entity" ALTER COLUMN "deadline" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_campus_information_entity" ALTER COLUMN "title" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_campus_information_entity" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_campus_information_entity" ALTER COLUMN "additional_description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_admission_information_entity" ALTER COLUMN "title" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_admission_information_entity" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_admission_requirements_entity" ALTER COLUMN "title" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_admission_requirements_entity" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_tuition_cost_entity" ALTER COLUMN "title" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_tuition_cost_entity" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_tuition_cost_entity" ALTER COLUMN "tuition_cost" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_tuition_cost_entity" ALTER COLUMN "full_cost" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_tuition_cost_entity" ALTER COLUMN "additional_cost" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_tuition_cost_entity" ALTER COLUMN "program_cost" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_degree_entity" ALTER COLUMN "degree" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_degree_entity" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_discount_scholarships_entity" ALTER COLUMN "title" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_discount_scholarships_entity" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "university_discount_scholarships_entity" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_discount_scholarships_entity" ALTER COLUMN "title" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_degree_entity" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_degree_entity" ALTER COLUMN "degree" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_tuition_cost_entity" ALTER COLUMN "program_cost" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_tuition_cost_entity" ALTER COLUMN "additional_cost" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_tuition_cost_entity" ALTER COLUMN "full_cost" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_tuition_cost_entity" ALTER COLUMN "tuition_cost" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_tuition_cost_entity" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_tuition_cost_entity" ALTER COLUMN "title" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_admission_requirements_entity" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_admission_requirements_entity" ALTER COLUMN "title" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_admission_information_entity" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_admission_information_entity" ALTER COLUMN "title" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_campus_information_entity" ALTER COLUMN "additional_description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_campus_information_entity" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_campus_information_entity" ALTER COLUMN "title" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_important_dates_entity" ALTER COLUMN "deadline" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_important_dates_entity" ALTER COLUMN "name" SET NOT NULL`);
    }

}
