import { MigrationInterface, QueryRunner } from "typeorm";

export class UniversityFix1692939860652 implements MigrationInterface {
    name = 'UniversityFix1692939860652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "top_rating" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "top_rating" SET NOT NULL`);
    }

}
