import { Router } from 'express';
import {
    emailCheckHandler,
    loginHandler,
    registerHandler,
    registerWithReferralLinkHandler
} from './auth.controller';

export const authRouter = Router();
authRouter.route('/register-student').post(registerHandler);
authRouter.route('/login').post(loginHandler);
authRouter.route('/email-check').post(emailCheckHandler);
authRouter.route('/referral/:referral').post(registerWithReferralLinkHandler);
