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
import {UniversityImportantDatesEntity} from "./domains/university/model/university-important-dates.entity";
import {UniversityCampusInformationEntity} from "./domains/university/model/university-campus-information.entity";
import {UniversityDegreeEntity} from "./domains/university/model/university-degree.entity";
import {UniversityDiscountScholarshipsEntity} from "./domains/university/model/university-discount-scholarships.entity";
import {UniversityFacultyEntity} from "./domains/university/data/model/university-faculty.entity";
import {UniversitySpecialityEntity} from "./domains/university/data/model/university-speciality.entity";
import {UniversityTuitionCostEntity} from "./domains/university/model/university-tuition-cost.entity";
import {UniversityCountryEntity} from "./domains/university/data/model/university-country.entity";
import {WorksheetEntity} from "./domains/worksheet/model/worksheet.entity";
import {WorksheetFieldsEntity} from "./domains/worksheet/model/worksheet-fields.entity";
import {ApplicationEntity} from "./domains/application/model/application.entity";
import {ChatEntity} from "./domains/chat/model/chat.entity";
import {ChatMessagesEntity} from "./domains/chat/model/chat-messages.entity";
import {UniversityAdmissionEntity} from "./domains/university/model/university-admission.entity";
import {ApplicationFieldsEntity} from "./domains/application/model/application-fields.entity";
import {NotificationEntity} from "./domains/notifications/model/notification.entity";

const entities = [
  UserEntity,
  RegionEntity,
  LocalAreaEntity,
  SchoolEntity,
  PasswordChangeLinkEntity,
  UniversityEntity,
  EmailVerifyLinkEntity,
  FileEntity,
  UniversityImportantDatesEntity,
  UniversityAdmissionEntity,
  UniversityCampusInformationEntity,
  UniversityDegreeEntity,
  UniversityDiscountScholarshipsEntity,
  UniversityFacultyEntity,
  UniversitySpecialityEntity,
  UniversityTuitionCostEntity,
  UniversityCountryEntity,
  WorksheetEntity,
  WorksheetFieldsEntity,
  ChatEntity,
  ChatMessagesEntity,
  ApplicationEntity,
  ApplicationFieldsEntity,
  NotificationEntity,
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
    socket_port: env.SOCKET_PORT,
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
