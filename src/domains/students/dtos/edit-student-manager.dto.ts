import z from 'zod';
import {EditStudentManagerSchema} from "../schemas/edit-student-manager.schema";

export type EditStudentManagerDto = z.infer<typeof EditStudentManagerSchema>['body'];
