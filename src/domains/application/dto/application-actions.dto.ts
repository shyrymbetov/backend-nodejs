import z from 'zod';
import {ApplicationActionsSchema} from "../schemas/application-actions.schema";

export type ApplicationActionsDto = z.infer<typeof ApplicationActionsSchema>['body'];
