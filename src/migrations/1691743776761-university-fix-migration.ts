import { MigrationInterface, QueryRunner } from "typeorm";

export class UniversityFixMigration1691743776761 implements MigrationInterface {
    name = 'UniversityFixMigration1691743776761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "state" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "state" SET NOT NULL`);
    }

}
