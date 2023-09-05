import z from 'zod';
import {CreateApplicationSchema} from "../schemas/create-application.schema";

export type CreateApplicationDto = z.infer<typeof CreateApplicationSchema>['body'];
