import { MigrationInterface, QueryRunner } from "typeorm";

export class ApplicationStatusDefault1695212685848 implements MigrationInterface {
    name = 'ApplicationStatusDefault1695212685848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application_entity" ALTER COLUMN "application_status" SET DEFAULT 'DRAFT'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application_entity" ALTER COLUMN "application_status" DROP DEFAULT`);
    }

}
