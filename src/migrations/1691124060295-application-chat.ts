import { MigrationInterface, QueryRunner } from "typeorm";

export class ApplicationChat1691124060295 implements MigrationInterface {
    name = 'ApplicationChat1691124060295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chat_messages_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "files" json NOT NULL, "text" character varying NOT NULL, "user" json NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "chatId" uuid, CONSTRAINT "PK_a9d5f09702ddafa6559febefd76" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "applicationId" uuid, CONSTRAINT "REL_255e95ee20f62dd6adc7579b6b" UNIQUE ("applicationId"), CONSTRAINT "PK_07e65670b36d025a69930ae6f2e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "application_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "studentId" uuid, "universityId" uuid, CONSTRAINT "PK_c999b2d40dd9ad46b17b47fb842" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chat_messages_entity" ADD CONSTRAINT "FK_3ff01f4baa44594d08b782546c7" FOREIGN KEY ("chatId") REFERENCES "chat_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_entity" ADD CONSTRAINT "FK_255e95ee20f62dd6adc7579b6b2" FOREIGN KEY ("applicationId") REFERENCES "application_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_entity" ADD CONSTRAINT "FK_7c39d0ae3f167c6c0a22a28924f" FOREIGN KEY ("studentId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_entity" ADD CONSTRAINT "FK_68689449ffb56d6373d11f1fc02" FOREIGN KEY ("universityId") REFERENCES "university_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application_entity" DROP CONSTRAINT "FK_68689449ffb56d6373d11f1fc02"`);
        await queryRunner.query(`ALTER TABLE "application_entity" DROP CONSTRAINT "FK_7c39d0ae3f167c6c0a22a28924f"`);
        await queryRunner.query(`ALTER TABLE "chat_entity" DROP CONSTRAINT "FK_255e95ee20f62dd6adc7579b6b2"`);
        await queryRunner.query(`ALTER TABLE "chat_messages_entity" DROP CONSTRAINT "FK_3ff01f4baa44594d08b782546c7"`);
        await queryRunner.query(`DROP TABLE "application_entity"`);
        await queryRunner.query(`DROP TABLE "chat_entity"`);
        await queryRunner.query(`DROP TABLE "chat_messages_entity"`);
    }

}
