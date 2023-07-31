import z from 'zod';
import {CreateStudentSchema} from "../schemas/create-student.schema";

export type CreateStudentDto = z.infer<typeof CreateStudentSchema>['body'];
