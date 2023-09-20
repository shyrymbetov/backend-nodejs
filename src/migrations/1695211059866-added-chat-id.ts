import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedChatId1695211059866 implements MigrationInterface {
    name = 'AddedChatId1695211059866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_messages_entity" DROP CONSTRAINT "FK_3ff01f4baa44594d08b782546c7"`);
        await queryRunner.query(`ALTER TABLE "chat_messages_entity" RENAME COLUMN "chatId" TO "chat_id"`);
        await queryRunner.query(`ALTER TABLE "chat_messages_entity" ALTER COLUMN "chat_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_messages_entity" ADD CONSTRAINT "FK_6aac61b407a090a38e4477b93b0" FOREIGN KEY ("chat_id") REFERENCES "chat_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_messages_entity" DROP CONSTRAINT "FK_6aac61b407a090a38e4477b93b0"`);
        await queryRunner.query(`ALTER TABLE "chat_messages_entity" ALTER COLUMN "chat_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_messages_entity" RENAME COLUMN "chat_id" TO "chatId"`);
        await queryRunner.query(`ALTER TABLE "chat_messages_entity" ADD CONSTRAINT "FK_3ff01f4baa44594d08b782546c7" FOREIGN KEY ("chatId") REFERENCES "chat_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
