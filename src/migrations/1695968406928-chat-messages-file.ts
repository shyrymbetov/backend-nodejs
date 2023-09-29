import { MigrationInterface, QueryRunner } from "typeorm";

export class ChatMessagesFile1695968406928 implements MigrationInterface {
    name = 'ChatMessagesFile1695968406928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_messages_entity" ADD "file" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_messages_entity" DROP COLUMN "file"`);
    }

}
