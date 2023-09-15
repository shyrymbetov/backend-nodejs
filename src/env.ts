import { parseEnv, port, z } from 'znv';

export const env = parseEnv(process.env, {
  DB_HOST: z.string().min(1),
  DB_NAME: z.string().min(1),
  DB_SCHEMA: z.string().min(1),
  DB_PORT: port(),
  DB_APP_USER: z.string().min(1),
  DB_APP_PASS: z.string().min(0),
  DB_MIGRATOR_USER: z.string().min(1),
  DB_MIGRATOR_PASS: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z.string().min(1),
  MAIL_HOST: z.string().min(1),
  MAIL_PORT: z.number().min(1),
  MAIL_USERNAME: z.string().min(1),
  MAIL_SECRET: z.string().min(1),
  PWD_SALT: z.string().min(1),
  API_HOST: z.string().min(1),
  API_PORT: port(),
  SOCKET_PORT: port(),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  CORS_ORIGIN: z.string().min(1).transform((val) => val.split(',')),
  FILE_PATH: z.string()
});
