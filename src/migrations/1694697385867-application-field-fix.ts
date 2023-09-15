import { MigrationInterface, QueryRunner } from "typeorm";

export class ApplicationFieldFix1694697385867 implements MigrationInterface {
    name = 'ApplicationFieldFix1694697385867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application_fields_entity" ADD "is_description" boolean`);
        await queryRunner.query(`ALTER TABLE "chat_messages_entity" ALTER COLUMN "user" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_messages_entity" ALTER COLUMN "user" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "application_fields_entity" DROP COLUMN "is_description"`);
    }

}
