import { MigrationInterface, QueryRunner } from "typeorm";

export class UserJoinMigration1690759348053 implements MigrationInterface {
    name = 'UserJoinMigration1690759348053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "orientatorId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "masterId" uuid`);
        await queryRunner.query(`ALTER TABLE "email_verify_link_entity" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "email_verify_link_entity" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "email_verify_link_entity" ADD "code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_2c2204448391d4e91ddd48cb867" FOREIGN KEY ("orientatorId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_937916f016f1660ef65c5debdf3" FOREIGN KEY ("masterId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_937916f016f1660ef65c5debdf3"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_2c2204448391d4e91ddd48cb867"`);
        await queryRunner.query(`ALTER TABLE "email_verify_link_entity" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "email_verify_link_entity" ADD "code" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "email_verify_link_entity" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "masterId"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "orientatorId"`);
    }

}
