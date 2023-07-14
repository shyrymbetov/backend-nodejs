import z from 'zod';
import {CreateUserSchema} from "../schemas/create-user.schema";

export type CreateUserDto = z.infer<typeof CreateUserSchema>['body'];
