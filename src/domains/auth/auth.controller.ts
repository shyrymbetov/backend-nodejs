import { Request, Response } from 'express';
import { register, login } from './auth.service';
import { RegisterUserSchema } from './schemas/register-user.schema';
import { LoginUserSchema } from './schemas/login-user.schema';

export async function registerHandler(req: Request, res: Response) {
  const { body } = RegisterUserSchema.parse(req);
  return res.send(await register(body));
}

export async function loginHandler(req: Request, res: Response) {
  const { body } = LoginUserSchema.parse(req);
  return res.send(await login(body));
}
