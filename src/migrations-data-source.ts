import * as dotenv from 'dotenv';
dotenv.config();

import  { DataSource } from 'typeorm';
import { config } from './config';
import { env } from './env';

export const migrationsDataSource = new DataSource({
  ...config.db,
  username: env.DB_MIGRATOR_USER,
  password: env.DB_MIGRATOR_PASS,
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
