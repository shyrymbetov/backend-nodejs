import z from 'zod';
import {GetUniversityCountryFilterSchema} from "../schemas/get-university-country.schema";

export type GetUniversityCountryFilterDto = z.infer<typeof GetUniversityCountryFilterSchema>['query'];
