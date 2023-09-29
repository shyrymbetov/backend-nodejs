import { MigrationInterface, QueryRunner } from "typeorm";

export class ChatMessagesSeenEntity1695812501464 implements MigrationInterface {
    name = 'ChatMessagesSeenEntity1695812501464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_messages_seen_entity" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "chat_messages_seen_entity" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "chat_messages_seen_entity" DROP COLUMN "deactivated_at"`);
        await queryRunner.query(`ALTER TABLE "chat_messages_seen_entity" ADD CONSTRAINT "unique_chatMessageId_userId" UNIQUE ("chat_message_id", "user_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_messages_seen_entity" DROP CONSTRAINT "unique_chatMessageId_userId"`);
        await queryRunner.query(`ALTER TABLE "chat_messages_seen_entity" ADD "deactivated_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "chat_messages_seen_entity" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "chat_messages_seen_entity" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
