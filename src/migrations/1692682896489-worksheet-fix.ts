import { MigrationInterface, QueryRunner } from "typeorm";

export class WorksheetFix1692682896489 implements MigrationInterface {
    name = 'WorksheetFix1692682896489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worksheet_entity" DROP CONSTRAINT "FK_abbbe3122770a99ea3a9b739062"`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP CONSTRAINT "FK_3b67794d8c6b49037119e58d37f"`);
        await queryRunner.query(`ALTER TABLE "worksheet_entity" RENAME COLUMN "universityId" TO "university_id"`);
        await queryRunner.query(`ALTER TABLE "university_entity" RENAME COLUMN "countryId" TO "country_id"`);
        await queryRunner.query(`ALTER TABLE "worksheet_entity" ALTER COLUMN "university_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "country_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "worksheet_entity" ADD CONSTRAINT "FK_0bf6907102c3b63d52869722244" FOREIGN KEY ("university_id") REFERENCES "university_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD CONSTRAINT "FK_bd788063cabc31a36af88596dfb" FOREIGN KEY ("country_id") REFERENCES "university_country_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD CONSTRAINT "FK_5efa5ba9addbbd709fdd9189653" FOREIGN KEY ("id") REFERENCES "worksheet_entity"("university_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "university_entity" DROP CONSTRAINT "FK_5efa5ba9addbbd709fdd9189653"`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP CONSTRAINT "FK_bd788063cabc31a36af88596dfb"`);
        await queryRunner.query(`ALTER TABLE "worksheet_entity" DROP CONSTRAINT "FK_0bf6907102c3b63d52869722244"`);
        await queryRunner.query(`ALTER TABLE "university_entity" ALTER COLUMN "country_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "worksheet_entity" ALTER COLUMN "university_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "university_entity" RENAME COLUMN "country_id" TO "countryId"`);
        await queryRunner.query(`ALTER TABLE "worksheet_entity" RENAME COLUMN "university_id" TO "universityId"`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD CONSTRAINT "FK_3b67794d8c6b49037119e58d37f" FOREIGN KEY ("countryId") REFERENCES "university_country_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "worksheet_entity" ADD CONSTRAINT "FK_abbbe3122770a99ea3a9b739062" FOREIGN KEY ("universityId") REFERENCES "university_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
