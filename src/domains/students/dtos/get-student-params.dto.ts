import z from 'zod';
import {GetStudentsFilterSchema} from "../schemas/get-students-filter.schema";

export type GetStudentsParamsDto = z.infer<typeof GetStudentsFilterSchema>['query'];
