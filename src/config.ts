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
  schema: env.DB_SCHEMA,
  synchronize: false,
  entities: [UserEntity],
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const config = {
  db: dataSourceConfig,
  api: {
    port: env.API_PORT,
    cors: {
      origin: env.CORS_ORIGIN,
      credentials: true,
    },
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
  },
  pwd: {
    salt: env.PWD_SALT,
  },
};
