import z from 'zod';
import {EditCurrentUserSchema} from "../schemas/edit-current-user.schema";

export type EditCurrentUserDto = z.infer<typeof EditCurrentUserSchema>['body'];
