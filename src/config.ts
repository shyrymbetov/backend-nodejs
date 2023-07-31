import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';
import { UserEntity } from './domains/user/model/user.entity';
import { env } from './env';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import {RegionEntity} from "./domains/data/model/region.entity";
import {LocalAreaEntity} from "./domains/data/model/local-area.entity";
import {SchoolEntity} from "./domains/data/model/school.entity";
import {PasswordChangeLinkEntity} from "./domains/auth/model/password-change-link.entity";
import {UniversityEntity} from "./domains/university/model/university.entity";
import {EmailVerifyLinkEntity} from "./domains/auth/model/email-verify-link.entity";
import {FileEntity} from "./domains/files/model/file.entity";

const entities = [
  UserEntity,
  RegionEntity,
  LocalAreaEntity,
  SchoolEntity,
  PasswordChangeLinkEntity,
  UniversityEntity,
  EmailVerifyLinkEntity,
  FileEntity,
]

const dataSourceConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_APP_USER,
  password: env.DB_APP_PASS,
  database: env.DB_NAME,
  schema: env.DB_SCHEMA,
  synchronize: false,
  entities: entities,
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
  mail: {
    host: env.MAIL_HOST,
    port: env.MAIL_PORT,
    secure: true,
    username: env.MAIL_USERNAME,
    password: env.MAIL_SECRET,
  },
};
