import { MigrationInterface, QueryRunner } from "typeorm";

export class NotificationFix1694677757008 implements MigrationInterface {
    name = 'NotificationFix1694677757008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification_entity" ADD "header" text`);
        await queryRunner.query(`ALTER TABLE "notification_entity" ALTER COLUMN "content" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notification_entity" ALTER COLUMN "sender" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification_entity" ALTER COLUMN "sender" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notification_entity" ALTER COLUMN "content" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notification_entity" DROP COLUMN "header"`);
    }

}
