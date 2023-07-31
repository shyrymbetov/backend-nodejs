import { Router } from 'express';
import {
    changeUserPasswordByLinkHandler,
    emailCheckHandler, generateChangePasswordLinkHandler, generateEmailVerificationLinkHandler,
    loginHandler,
    registerHandler,
    registerWithReferralLinkHandler, verifyUserEmailByLinkHandler
} from './auth.controller';

export const authRouter = Router();
authRouter.route('/register-student').post(registerHandler);
authRouter.route('/referral-link/:userId').post(registerWithReferralLinkHandler);
authRouter.route('/login').post(loginHandler);
authRouter.route('/email-check').post(emailCheckHandler);

const actionLinkRouter = Router();
authRouter.use('/action', actionLinkRouter);

actionLinkRouter.route('/generate-email').post(generateEmailVerificationLinkHandler);
actionLinkRouter.route('/email-verify/:verifyId').post(verifyUserEmailByLinkHandler);
actionLinkRouter.route('/generate-pwd').post(generateChangePasswordLinkHandler);
actionLinkRouter.route('/change-password/:pwdId').post(changeUserPasswordByLinkHandler);
