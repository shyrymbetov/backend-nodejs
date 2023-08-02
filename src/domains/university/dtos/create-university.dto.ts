import z from 'zod';
import {CreateUniversitySchema} from "../schemas/create-university.schema";

export type CreateUniversityDto = z.infer<typeof CreateUniversitySchema>['body'];
