import { Request, Response } from 'express';
import {register, login, emailCheck, registerWithReferralLink} from './auth.service';
import { RegisterUserSchema } from './schemas/register-user.schema';
import { LoginUserSchema } from './schemas/login-user.schema';
import {EmailCheckSchema} from "./schemas/email-check.schema";

export async function registerHandler(req: Request, res: Response) {
  const { body } = RegisterUserSchema.parse(req);
  return res.send(await register(body));
}

export async function registerWithReferralLinkHandler(req: Request, res: Response) {
  const { referral } = req.params;
  const { body } = LoginUserSchema.parse(req);
  // res.status(400).send('User not exists')

  return res.send(await registerWithReferralLink(referral, body));
}

export async function loginHandler(req: Request, res: Response) {
  const { body } = LoginUserSchema.parse(req);
  return res.send(await login(body));
}

export async function emailCheckHandler(req: Request, res: Response) {
  const { body } = EmailCheckSchema.parse(req);
  return res.send(await emailCheck(body.email));
}
