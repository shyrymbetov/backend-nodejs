import z from 'zod';
import {CreateCountrySchema} from "../schemas/create-country.schema";

export type CreateCountryDto = z.infer<typeof CreateCountrySchema>['body'];
