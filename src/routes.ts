import { userRouter } from './domains/user/user.router';
import { authRouter } from './domains/auth/auth.router';
import type { Express } from 'express';

export function addRoutes(app: Express) {
  app.use('/auth', authRouter);
  app.use('/users', userRouter);
}
