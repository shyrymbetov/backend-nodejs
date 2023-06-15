import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBooks1683098724149 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`insert into book_entity (id, title, author, "publishedAt")
        values(1, 'Lord of the Rings', 'J. R. R. Tolkien', '1954-01-01')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`delete book_entity where id = 1`);
  }
}
