import { MigrationInterface, QueryRunner } from "typeorm";

export class Notification1694452521985 implements MigrationInterface {
    name = 'Notification1694452521985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notification_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "read" boolean NOT NULL DEFAULT false, "user_id" uuid NOT NULL, "sender" json NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, CONSTRAINT "PK_112676de71a3a708b914daed289" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "notification_entity"`);
    }

}
