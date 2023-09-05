import {Router} from 'express';
import {
    createApplicationHandler,
    deleteApplicationHandler,
    editApplicationHandler,
    editApplicationStatusHandler,
    getApplicationHandler, getApplicationsByUserHandler,
    getApplicationsHandler
} from './application.controller';
import {isAuthenticatedMiddleware} from '../../middlewares/is-authenticated.middleware';

export const applicationRouter = Router();
applicationRouter.route('/')
    .get(isAuthenticatedMiddleware, getApplicationsHandler)
    .post(isAuthenticatedMiddleware, createApplicationHandler)
;
applicationRouter.route('/user/:id')
    .get(isAuthenticatedMiddleware, getApplicationsByUserHandler)
;

applicationRouter.route('/:id')
  .get(isAuthenticatedMiddleware, getApplicationHandler)
  .patch(isAuthenticatedMiddleware, editApplicationHandler)
  .delete(isAuthenticatedMiddleware, deleteApplicationHandler)
;

applicationRouter.route('/:id')
    .patch(isAuthenticatedMiddleware, editApplicationStatusHandler)
;


