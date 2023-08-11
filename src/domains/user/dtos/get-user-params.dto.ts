import z from 'zod';
import {GetUsersFilterSchema} from "../schemas/get-users-filter.schema";

export type GetUsersParamsDto = z.infer<typeof GetUsersFilterSchema>['query'];
