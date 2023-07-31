import { MigrationInterface, QueryRunner } from "typeorm";

export class UserJoinMigrationUpdate1690764334795 implements MigrationInterface {
    name = 'UserJoinMigrationUpdate1690764334795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_2c2204448391d4e91ddd48cb867"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_937916f016f1660ef65c5debdf3"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "orientatorId"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "masterId"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_0f58814dd29683c2b3e27a56e16" FOREIGN KEY ("orientator_id") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_bc8de7558445f0647569f3f05e3" FOREIGN KEY ("master_id") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_bc8de7558445f0647569f3f05e3"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_0f58814dd29683c2b3e27a56e16"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "masterId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "orientatorId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_937916f016f1660ef65c5debdf3" FOREIGN KEY ("masterId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_2c2204448391d4e91ddd48cb867" FOREIGN KEY ("orientatorId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
