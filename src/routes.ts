import 'express-async-errors';
import { userRouter } from './domains/user/user.router';
import { authRouter } from './domains/auth/auth.router';
import { dataRouter } from "./domains/data/data.router";
import type { Express } from 'express';
import {fileRouter} from "./domains/files/file.router";
import {studentRouter} from "./domains/students/student.router";
import {universityRouter} from "./domains/university/university.router";
import {worksheetRouter} from "./domains/worksheet/worksheet.router";
import {applicationRouter} from "./domains/application/application.router";

export function addRoutes(app: Express) {
  app.use('/auth', authRouter);
  app.use('/users', userRouter);
  app.use('/university', universityRouter);
  app.use('/worksheet', worksheetRouter);
  app.use('/application', applicationRouter);
  app.use('/students', studentRouter);
  app.use('/data', dataRouter);
  app.use('/files', fileRouter);
}
