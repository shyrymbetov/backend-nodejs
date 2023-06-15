import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';
import { UserEntity } from './domains/user/user.entity';
import { env } from './env';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const dataSourceConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_APP_USER,
  password: env.DB_APP_PASS,
  database: env.DB_NAME,
  synchronize: false,
  entities: [UserEntity],
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

const apiConfig = {
  server: {
    port: env.API_PORT,
  },
  cors: true,
  logger: {
    level: 'debug',
    color: true,
  },
};

export const config = {
  db: dataSourceConfig,
  api: apiConfig,
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
  },
  pwd: {
    salt: env.PWD_SALT,
  },
};
