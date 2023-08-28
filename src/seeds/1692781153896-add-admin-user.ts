import { MigrationInterface, QueryRunner } from "typeorm"
import * as crypto from 'node:crypto';
import {config} from "../config";

export class AddAdminUser1692781153896 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        let password = "strongSecret"

        password = crypto.pbkdf2Sync(password, config.pwd.salt, 100, 64, 'sha256').toString(`hex`)

        await queryRunner.query(`insert into user_entity ("email", "first_name", "last_name", "hashed_password", "birth_date", "phone" , "role", "region_id", "local_id")
            values('admin@gmail.com', 'Nurzhan', 'Kermenbayev', '${password}', '2018-01-01', '87059038943', 'admin', '0a492740-18b7-4b45-9b74-c0879dcfeedd', '0a492740-18b7-4b45-9b74-c0879dcfeedd' )`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
