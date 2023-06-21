import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1687211561641 implements MigrationInterface {
  name = 'CreateUserTable1687211561641';
  private schema = process.env.DB_SCHEMA;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "${this.schema}"."user_entity_role_enum" AS ENUM('admin', 'student', 'docsman', 'orientator')`
    );
    await queryRunner.query(
      `CREATE TABLE "${this.schema}"."user_entity" (
        "id" SERIAL NOT NULL,
        "email" character varying NOT NULL,
        "first_name" character varying NOT NULL,
        "last_name" character varying NOT NULL,
        "hashed_password" character varying NOT NULL,
        "role" "${this.schema}"."user_entity_role_enum" NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deactivated_at" TIMESTAMP,
        CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "${this.schema}"."user_entity"`);
    await queryRunner.query(
      `DROP TYPE "${this.schema}"."user_entity_role_enum"`
    );
  }
}
