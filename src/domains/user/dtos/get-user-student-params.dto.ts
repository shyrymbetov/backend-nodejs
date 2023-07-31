import z from 'zod';
import {GetUserStudentsFilterSchema} from "../schemas/get-user-students-filter.schema";

export type GetUserStudentsParamsDto = z.infer<typeof GetUserStudentsFilterSchema>['query'];
