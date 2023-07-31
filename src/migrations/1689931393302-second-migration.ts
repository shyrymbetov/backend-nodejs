import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondMigration1689931393302 implements MigrationInterface {
    name = 'SecondMigration1689931393302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "password_change_link_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "used" boolean NOT NULL DEFAULT false, "expired_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, CONSTRAINT "PK_e810fd9bee3a0a4eb1ee3fd026d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "university_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "university_name" character varying NOT NULL, "country" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, CONSTRAINT "PK_5efa5ba9addbbd709fdd9189653" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "email_verify_link_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "code" boolean NOT NULL DEFAULT false, "used" boolean NOT NULL, "expired_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, CONSTRAINT "PK_fda1adf28ea202d75f258f11bc0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "file_name" character varying NOT NULL, "full_path" character varying NOT NULL, "file_format" character varying NOT NULL, "mime" character varying NOT NULL, "size" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, CONSTRAINT "PK_d8375e0b2592310864d2b4974b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "verified" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "verified"`);
        await queryRunner.query(`DROP TABLE "file_entity"`);
        await queryRunner.query(`DROP TABLE "email_verify_link_entity"`);
        await queryRunner.query(`DROP TABLE "university_entity"`);
        await queryRunner.query(`DROP TABLE "password_change_link_entity"`);
    }

}
