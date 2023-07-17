import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1689575483585 implements MigrationInterface {
    name = 'FirstMigration1689575483585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_entity_role_enum" AS ENUM('admin', 'student', 'schoolboy', 'expert', 'master-expert', 'orientator')`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "avatar" uuid, "email" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "hashed_password" character varying, "active" boolean NOT NULL DEFAULT false, "birth_date" TIMESTAMP NOT NULL, "phone" character varying NOT NULL, "region_id" uuid NOT NULL, "local_id" uuid NOT NULL, "school" uuid, "class" integer, "master_id" uuid, "orientator_id" uuid, "role" "public"."user_entity_role_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "region_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name_kz" character varying NOT NULL, "name_ru" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, CONSTRAINT "PK_387f37fbb418e96eddc9c95c83a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "local_area_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "region_id" uuid NOT NULL, "name_kz" character varying NOT NULL, "name_ru" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, CONSTRAINT "PK_8408a2468e1580365b136cee108" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "school_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "local_id" uuid NOT NULL, "name_kz" character varying NOT NULL, "name_ru" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, CONSTRAINT "PK_41976c69228356dc32b3ca94093" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "school_entity"`);
        await queryRunner.query(`DROP TABLE "local_area_entity"`);
        await queryRunner.query(`DROP TABLE "region_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TYPE "public"."user_entity_role_enum"`);
    }

}
