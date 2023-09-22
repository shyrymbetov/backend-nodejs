import { MigrationInterface, QueryRunner } from "typeorm";

export class ApplicationChatIdDeleted1695378820996 implements MigrationInterface {
    name = 'ApplicationChatIdDeleted1695378820996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application_entity" DROP CONSTRAINT "FK_3b44b586d5e4b1628b8e49c8d73"`);
        await queryRunner.query(`ALTER TABLE "application_entity" DROP CONSTRAINT "REL_3b44b586d5e4b1628b8e49c8d7"`);
        await queryRunner.query(`ALTER TABLE "application_entity" DROP COLUMN "chat_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application_entity" ADD "chat_id" uuid`);
        await queryRunner.query(`ALTER TABLE "application_entity" ADD CONSTRAINT "REL_3b44b586d5e4b1628b8e49c8d7" UNIQUE ("chat_id")`);
        await queryRunner.query(`ALTER TABLE "application_entity" ADD CONSTRAINT "FK_3b44b586d5e4b1628b8e49c8d73" FOREIGN KEY ("chat_id") REFERENCES "chat_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
