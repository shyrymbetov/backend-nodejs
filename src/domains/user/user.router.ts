import { Router } from 'express';
import { getUsersHandler } from './user.controller';
import { isAuthenticatedMiddleware } from '../../middlewares/is-authenticated.middleware';
import { isAdminMiddleware } from '../../middlewares/is-admin.middleware';

export const userRouter = Router();
userRouter
  .route('/')
  .get(isAuthenticatedMiddleware, isAdminMiddleware, getUsersHandler);
