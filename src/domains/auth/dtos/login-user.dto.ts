import z from 'zod';
import { LoginUserSchema } from '../schemas/login-user.schema';

export type LoginUserDto = z.infer<typeof LoginUserSchema>['body'];
