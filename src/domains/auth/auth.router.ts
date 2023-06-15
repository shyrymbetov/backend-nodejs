import { Router } from 'express';
import { loginHandler, registerHandler } from './auth.controller';

export const authRouter = Router();
authRouter.route('/register').post(registerHandler);
authRouter.route('/login').post(loginHandler);
