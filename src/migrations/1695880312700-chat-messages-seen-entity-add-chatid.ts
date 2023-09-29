import { MigrationInterface, QueryRunner } from "typeorm";

export class ChatMessagesSeenEntityAddChatid1695880312700 implements MigrationInterface {
    name = 'ChatMessagesSeenEntityAddChatid1695880312700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_messages_seen_entity" ADD "chat_id" uuid NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_messages_seen_entity" DROP COLUMN "chat_id"`);
    }

}
