import {Router} from 'express';
import {
    createApplicationHandler, deleteApplicationHandler, editApplicationHandler, getApplicationHandler,
    getApplicationsHandler
} from './application.controller';
import {isAuthenticatedMiddleware} from '../../middlewares/is-authenticated.middleware';

export const applicationRouter = Router();
applicationRouter.route('/')
    .get(isAuthenticatedMiddleware, getApplicationsHandler)
    .post(isAuthenticatedMiddleware, createApplicationHandler)
;

applicationRouter.route('/:id')
  .get(isAuthenticatedMiddleware, getApplicationHandler)
  .patch(isAuthenticatedMiddleware, editApplicationHandler)
  .delete(isAuthenticatedMiddleware, deleteApplicationHandler)
;


