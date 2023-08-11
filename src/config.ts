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
import {UniversityAdmissionInformationEntity} from "./domains/university/model/university-admission-information.entity";
import {
  UniversityAdmissionRequirementsEntity
} from "./domains/university/model/university-admission-requirements.entity";
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
import {ApplicationContactsFieldsEntity} from "./domains/application/model/application-contact-fields.entity";
import {ApplicationEducationFieldsEntity} from "./domains/application/model/application-education-fields.entity";
import {ApplicationLanguagesFieldsEntity} from "./domains/application/model/application-language-fields.entity";
import {
  ApplicationRecommendationsFieldsEntity
} from "./domains/application/model/application-recomandations-fields.entity";
import {ApplicationMotivationFieldsEntity} from "./domains/application/model/application-motivation-fields.entity";
import {ApplicationDocumentsFieldsEntity} from "./domains/application/model/application-documents-fields.entity";
import {ApplicationOtherFieldsEntity} from "./domains/application/model/application-other-fields.entity";
import {ApplicationProfileFieldsEntity} from "./domains/application/model/application-profile-fields.entity";

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
  UniversityAdmissionInformationEntity,
  UniversityAdmissionRequirementsEntity,
  UniversityCampusInformationEntity,
  UniversityDegreeEntity,
  UniversityDiscountScholarshipsEntity,
  UniversityFacultyEntity,
  UniversitySpecialityEntity,
  UniversityTuitionCostEntity,
  UniversityCountryEntity,
  WorksheetEntity,
  WorksheetFieldsEntity,
  ApplicationEntity,
  ChatEntity,
  ChatMessagesEntity,
  ApplicationContactsFieldsEntity,
  ApplicationEducationFieldsEntity,
  ApplicationLanguagesFieldsEntity,
  ApplicationRecommendationsFieldsEntity,
  ApplicationMotivationFieldsEntity,
  ApplicationDocumentsFieldsEntity,
  ApplicationOtherFieldsEntity,
  ApplicationProfileFieldsEntity,
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
