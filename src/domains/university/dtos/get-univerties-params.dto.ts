import z from 'zod';
import {GetUniversitiesFilterSchema} from "../schemas/get-universities-filter.schema";

export type GetUniversitiesFilterDto = z.infer<typeof GetUniversitiesFilterSchema>['query'];
