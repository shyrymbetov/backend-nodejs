import { DataSource } from 'typeorm';
import { config } from './config';

export const dataSource = new DataSource(config.db);

export async function connectToDatabase() {
  const { username, host, port, database } = config.db;
  const uri = `postgresql://${username}@${host}:${port}/${database}`;
  try {
    await dataSource.initialize();
  } catch (err) {
    console.error(`⚡️[database]: Failed to connect to database on ${uri}`);
    console.error(err);
    return;
  }
  console.log(`⚡️[database]: Connected to database on ${uri}`);
}
