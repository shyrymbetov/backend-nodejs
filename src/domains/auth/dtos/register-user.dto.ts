import z from 'zod';
import { RegisterUserSchema } from '../schemas/register-user.schema';

export type RegisterUserDto = z.infer<typeof RegisterUserSchema>['body'];
