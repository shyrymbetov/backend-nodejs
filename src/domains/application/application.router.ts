import {Router} from 'express';
import {
    createApplicationHandler,
    deleteApplicationHandler,
    editApplicationHandler,
    // editApplicationStatusHandler,
    getApplicationHandler,
    getApplicationsByUserHandler,
    getApplicationsHandler,
    getMyApplicationHandler,
    getMyStudentApplicationHandler
} from './application.controller';
import { isAuthenticatedMiddleware } from '../../middlewares/is-authenticated.middleware';
import { isAbleToEditApplication } from '../../middlewares/is-able-to-edit-application.middleware';

export const applicationRouter = Router();
applicationRouter.route('/')
    .get(isAuthenticatedMiddleware, getApplicationsHandler)
    .post(isAuthenticatedMiddleware, createApplicationHandler)
;
applicationRouter.route('/user/:id')
    .get(isAuthenticatedMiddleware, getApplicationsByUserHandler)
;

applicationRouter.route('/my')
    .get(isAuthenticatedMiddleware, getMyApplicationHandler)
// .patch(isAuthenticatedMiddleware, editApplicationStatusHandler)
;

applicationRouter.route('/my/:id')
    .get(isAuthenticatedMiddleware, getMyStudentApplicationHandler)

applicationRouter.route('/:id')
  .get(isAuthenticatedMiddleware, getApplicationHandler)
  .patch(isAuthenticatedMiddleware, isAbleToEditApplication, editApplicationHandler)
  .delete(isAuthenticatedMiddleware, deleteApplicationHandler)
;






