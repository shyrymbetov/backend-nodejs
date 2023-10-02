import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1696217068790 implements MigrationInterface {
    name = 'Migrations1696217068790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chat_messages_seen_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "chat_id" uuid NOT NULL, "chat_message_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "unique_chatMessageId_userId" UNIQUE ("chat_message_id", "user_id"), CONSTRAINT "PK_2a094b7c1f59ecc7de6ef6e90ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chat_messages_entity" ADD "file" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_messages_entity" DROP COLUMN "file"`);
        await queryRunner.query(`DROP TABLE "chat_messages_seen_entity"`);
    }

}
