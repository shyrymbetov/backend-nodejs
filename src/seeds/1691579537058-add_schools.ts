import { MigrationInterface, QueryRunner } from "typeorm"
// import * as _crypto from "crypto";
const xlsx = require('xlsx');
const crypto = require('crypto');

export class AddSchools1691579537058 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const filePath = 'src/shared/listofschools.xlsx';// Update the file path accordingly


        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        sheetData.splice(0, 1)

        const distinctRegion = sheetData
            .map(item => ({ RU: item.RU.trim(), KZ: item.KZ.trim() }))
            .map(item => JSON.stringify(item))
            .filter((value, index, self) => self.indexOf(value) === index)
            .map(item => {
                return JSON.parse(item);
            });

        distinctRegion.forEach(item => {
            item.UUID = crypto.randomUUID();
        });


        const distinctLocalArea = sheetData
            .map(item => ({ RU_1: item.RU_1.trim(), KZ_1: item.KZ_1.trim(), RU: item.RU.trim() }))
            .map(item => JSON.stringify(item))
            .filter((value, index, self) => self.indexOf(value) === index)
            .map(item => {
                return JSON.parse(item);
            });

        distinctLocalArea.forEach(item => {
            item.UUID = crypto.randomUUID();
        });

        for (let i = 0; i < distinctLocalArea.length; i++) {
            for (let j = 0; j < distinctRegion.length; j++) {
                if (distinctLocalArea[i].RU === distinctRegion[j].RU) {
                    distinctLocalArea[i].UUIDRegion = distinctRegion[j].UUID;
                    break; // No need to continue searching once a match is found
                }
            }
        }


        const schools = sheetData
            .map(item => ({
                RU_2: item.RU_2,
                KZ_2: item.KZ_2,
                RU_1: item.RU_1.trim()
            }))
            .map(item => JSON.stringify(item))
            .filter((value, index, self) => self.indexOf(value) === index)
            .map(item => {
                const parsedItem = JSON.parse(item);
                parsedItem.UUID = crypto.randomUUID();
                return parsedItem;
            });




        for (let i = 0; i < schools.length; i++) {
            for (let j = 0; j < distinctLocalArea.length; j++) {
                if (schools[i].RU_1 === distinctLocalArea[j].RU_1) {
                    schools[i].UUIDLocalArea = distinctLocalArea[j].UUID;
                    break; // No need to continue searching once a match is found
                }
            }
        }


        for (let i = 0; i < distinctRegion.length; i++) {
            await queryRunner.query(`insert into region_entity (id, "name_kz", "name_ru")
            values('${distinctRegion[i]["UUID"]}', '${distinctRegion[i]["KZ"]}', '${distinctRegion[i]["RU"]}')`);

        }

        for (let i = 0; i < distinctLocalArea.length; i++) {
            await queryRunner.query(`insert into local_area_entity (id, "name_kz", "name_ru", "region_id")
            values('${distinctLocalArea[i]["UUID"]}', '${distinctLocalArea[i]["KZ_1"]}', '${distinctLocalArea[i]["RU_1"]}', '${distinctLocalArea[i]["UUIDRegion"]}')`);

        }

        for (let i = 0; i < schools.length; i++) {
            await queryRunner.query(`insert into school_entity (id, "name_kz", "name_ru", "local_id")
            values('${schools[i]["UUID"]}', '${schools[i]["KZ_2"]}', '${schools[i]["RU_2"]}', '${schools[i]["UUIDLocalArea"]}')`);

        }



    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
