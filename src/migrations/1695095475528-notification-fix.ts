import { MigrationInterface, QueryRunner } from "typeorm";

export class NotificationFix1695095475528 implements MigrationInterface {
    name = 'NotificationFix1695095475528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification_entity" ADD "link" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification_entity" DROP COLUMN "link"`);
    }

}
