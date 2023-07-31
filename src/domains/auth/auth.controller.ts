import { Request, Response } from 'express';
import {
  register,
  login,
  emailCheck,
  registerWithReferralLink,
  changeUserPasswordByLink
} from './auth.service';
import { RegisterUserSchema } from './schemas/register-user.schema';
import { LoginUserSchema } from './schemas/login-user.schema';
import { EmailCheckSchema } from "./schemas/email-check.schema";
import {
  generateChangePasswordLink,
  generateEmailVerificationLink,
  verificationUserEmail
} from "./user-action-link.service";

//handler for Auth Service
export async function registerHandler(req: Request, res: Response) {
  const { body } = RegisterUserSchema.parse(req);
  return res.send(await register(body));
}

export async function registerWithReferralLinkHandler(req: Request, res: Response) {
  const { userId } = req.params;
  const { body } = RegisterUserSchema.parse(req);
  // res.status(400).send('User not exists')

  return res.send(await registerWithReferralLink(userId, body));
}

export async function loginHandler(req: Request, res: Response) {
  const { body } = LoginUserSchema.parse(req);
  return res.send(await login(body));
}

export async function emailCheckHandler(req: Request, res: Response) {
  const { body } = EmailCheckSchema.parse(req);
  return res.send(await emailCheck(body.email));
}

//handler for Action Link Service
export async function generateChangePasswordLinkHandler(req: Request, res: Response) {
  const { body } = EmailCheckSchema.parse(req);
  return res.send(await generateChangePasswordLink(body.email));
}

export async function changeUserPasswordByLinkHandler(req: Request, res: Response) {
  const { pwdId } = req.params;
  const { body } = LoginUserSchema.parse(req);
  return res.send(await changeUserPasswordByLink(pwdId, body));
}

export async function generateEmailVerificationLinkHandler(req: Request, res: Response) {
  const { body } = EmailCheckSchema.parse(req);
  return res.send(await generateEmailVerificationLink(body.email));
}

export async function verifyUserEmailByLinkHandler(req: Request, res: Response) {
  const { pwdId } = req.params;
  const { body } = LoginUserSchema.parse(req);
  return res.send(await verificationUserEmail(pwdId, body));
}

