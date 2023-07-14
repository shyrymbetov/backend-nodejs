import { Router } from 'express';
import {
    createUserHandler,
    deleteUserHandler,
    editUserHandler,
    getUserHandler,
    getUsersHandler
} from './user.controller';
import { isAuthenticatedMiddleware } from '../../middlewares/is-authenticated.middleware';
import { isAdminMiddleware } from '../../middlewares/is-admin.middleware';

export const userRouter = Router();
userRouter.route('/')
    .get(isAuthenticatedMiddleware, isAdminMiddleware, getUsersHandler)
    .post(isAuthenticatedMiddleware, isAdminMiddleware, createUserHandler)
;

userRouter.route('/:id')
  .get(isAuthenticatedMiddleware, isAdminMiddleware, getUserHandler)
  .patch(isAuthenticatedMiddleware, isAdminMiddleware, editUserHandler)
  .delete(isAuthenticatedMiddleware, isAdminMiddleware, deleteUserHandler)
;

// userRouter.route('/:id/students').get(isAuthenticatedMiddleware, isAdminMiddleware, getUserHandler);

userRouter.route('/my').get(isAuthenticatedMiddleware, getUserHandler);
// userRouter.route('/my/students').get(isAuthenticatedMiddleware, getUserHandler);


