import { MigrationInterface, QueryRunner } from "typeorm";

export class UniversityFixMigration1691752276025 implements MigrationInterface {
    name = 'UniversityFixMigration1691752276025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "university_admission_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "gen_title" character varying, "gen_description" character varying, "admission_steps" json NOT NULL, "req_title" character varying, "req_description" character varying, "certificates" json NOT NULL, "requirements" json NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deactivated_at" TIMESTAMP, "universityId" uuid, CONSTRAINT "REL_0e15832f1f79f382899640e3a0" UNIQUE ("universityId"), CONSTRAINT "PK_65a83a2b909693115295a4a3da6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "university_admission_entity" ADD CONSTRAINT "FK_0e15832f1f79f382899640e3a08" FOREIGN KEY ("universityId") REFERENCES "university_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "university_admission_entity" DROP CONSTRAINT "FK_0e15832f1f79f382899640e3a08"`);
        await queryRunner.query(`DROP TABLE "university_admission_entity"`);
    }

}
