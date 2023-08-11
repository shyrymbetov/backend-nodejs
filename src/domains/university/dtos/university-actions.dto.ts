import z from 'zod';
import {UniversityActionsSchema} from "../schemas/university-actions.schema";

export type UniversityActionsDto = z.infer<typeof UniversityActionsSchema>['body'];
