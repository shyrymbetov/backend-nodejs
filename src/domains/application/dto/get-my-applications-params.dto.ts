import z from 'zod';
import {GetMyApplicationsFilterSchema} from "../schemas/get-my-applications-filter.schema";

export type GetMyApplicationsParamsDto = z.infer<typeof GetMyApplicationsFilterSchema>['query'];
