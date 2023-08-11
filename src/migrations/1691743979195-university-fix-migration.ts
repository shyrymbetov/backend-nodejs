import { MigrationInterface, QueryRunner } from "typeorm";

export class UniversityFixMigration1691743979195 implements MigrationInterface {
    name = 'UniversityFixMigration1691743979195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "state" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "color" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "full_description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "scholarship_type" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "study_language" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "study_language" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "scholarship_type" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "full_description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "color" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "state" SET NOT NULL`);
    }

}
