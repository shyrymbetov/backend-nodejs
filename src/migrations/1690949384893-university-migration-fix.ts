import { MigrationInterface, QueryRunner } from "typeorm";

export class UniversityMigrationFix1690949384893 implements MigrationInterface {
    name = 'UniversityMigrationFix1690949384893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "university_campus_information_entity" RENAME COLUMN "additional_dates" TO "additional_information"`);
        await queryRunner.query(`ALTER TYPE "public"."university_degree_entity_degree_enum" RENAME TO "university_degree_entity_degree_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."university_degree_entity_degree_enum" AS ENUM('BACHELOR', 'MASTERS_DEGREE', 'LANGUAGE_PROGRAM', 'FOUNDATION', 'DEGREE_PREPARATION')`);
        await queryRunner.query(`ALTER TABLE "university_degree_entity" ALTER COLUMN "degree" TYPE "public"."university_degree_entity_degree_enum" USING "degree"::"text"::"public"."university_degree_entity_degree_enum"`);
        await queryRunner.query(`DROP TYPE "public"."university_degree_entity_degree_enum_old"`);
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "logo" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "logo" SET NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."university_degree_entity_degree_enum_old" AS ENUM('Bachelor', 'Master''s degree', 'Language program', 'Foundation', 'Degree Preparation')`);
        await queryRunner.query(`ALTER TABLE "university_degree_entity" ALTER COLUMN "degree" TYPE "public"."university_degree_entity_degree_enum_old" USING "degree"::"text"::"public"."university_degree_entity_degree_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."university_degree_entity_degree_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."university_degree_entity_degree_enum_old" RENAME TO "university_degree_entity_degree_enum"`);
        await queryRunner.query(`ALTER TABLE "university_campus_information_entity" RENAME COLUMN "additional_information" TO "additional_dates"`);
    }

}
