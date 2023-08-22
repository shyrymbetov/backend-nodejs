import { Router } from 'express';
import {
    createUserHandler,
    deleteUserHandler, editCurrentUserHandler,
    editUserHandler, getCurrentUserHandler,
    getUserHandler, getUserManagersForFilterHandler,
    getUsersHandler, getUserStudentsHandler
} from './user.controller';
import { isAuthenticatedMiddleware } from '../../middlewares/is-authenticated.middleware';
import { isAdminMiddleware } from '../../middlewares/is-admin.middleware';

export const userRouter = Router();
userRouter.route('/')
    .get(isAuthenticatedMiddleware, getUsersHandler)
    .post(isAuthenticatedMiddleware, isAdminMiddleware, createUserHandler)
;

userRouter.route('/my')
    .get(isAuthenticatedMiddleware, getCurrentUserHandler)
    .patch(isAuthenticatedMiddleware, editCurrentUserHandler)
;

userRouter.route('/:id')
  .get(isAuthenticatedMiddleware, getUserHandler)
  .patch(isAuthenticatedMiddleware, isAdminMiddleware, editUserHandler)
  .delete(isAuthenticatedMiddleware, isAdminMiddleware, deleteUserHandler)
;

userRouter.route('/students/:id')
  .get(isAuthenticatedMiddleware, getUserStudentsHandler)

userRouter.route('/managers/:id')
  .get(isAuthenticatedMiddleware, getUserManagersForFilterHandler)
;



