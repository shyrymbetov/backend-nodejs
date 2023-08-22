import { MigrationInterface, QueryRunner } from "typeorm";

export class WorksheetFix21692683298919 implements MigrationInterface {
    name = 'WorksheetFix21692683298919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "university_entity" DROP CONSTRAINT "FK_5efa5ba9addbbd709fdd9189653"`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD "worksheetId" uuid`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD CONSTRAINT "UQ_2f9febef5d933f7b62135fb08d9" UNIQUE ("worksheetId")`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD CONSTRAINT "FK_2f9febef5d933f7b62135fb08d9" FOREIGN KEY ("worksheetId") REFERENCES "worksheet_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "university_entity" DROP CONSTRAINT "FK_2f9febef5d933f7b62135fb08d9"`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP CONSTRAINT "UQ_2f9febef5d933f7b62135fb08d9"`);
        await queryRunner.query(`ALTER TABLE "university_entity" DROP COLUMN "worksheetId"`);
        await queryRunner.query(`ALTER TABLE "university_entity" ADD CONSTRAINT "FK_5efa5ba9addbbd709fdd9189653" FOREIGN KEY ("id") REFERENCES "worksheet_entity"("university_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
