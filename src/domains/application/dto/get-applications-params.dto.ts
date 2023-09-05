import z from 'zod';
import {GetApplicationsFilterSchema} from "../schemas/get-applications-filter.schema";

export type GetApplicationsParamsDto = z.infer<typeof GetApplicationsFilterSchema>['query'];
