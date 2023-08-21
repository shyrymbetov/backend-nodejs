import { MigrationInterface, QueryRunner } from "typeorm"
const xlsx = require('xlsx');

export class AddCountry1692172216927 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const filePath = 'src/shared/novaPortal.xlsx';

        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[1];
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const countries = sheetData[0]["__EMPTY_1"].split('\n');

        for (let i = 0; i < countries.length; i++) {
            await queryRunner.query(`insert into university_country_entity ("name")
            values('${countries[i]}')`);

        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
