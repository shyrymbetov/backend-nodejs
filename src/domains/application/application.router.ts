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
    getMyStudentApplicationByIdHandler,
    getMyStudentsApplicationsHandler
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
;

applicationRouter.route('/my-students')
    .get(isAuthenticatedMiddleware, getMyStudentsApplicationsHandler)

applicationRouter.route('/my-students/:id')
    .get(isAuthenticatedMiddleware, getMyStudentApplicationByIdHandler)

applicationRouter.route('/:id')
  .get(isAuthenticatedMiddleware, getApplicationHandler)
  .patch(isAuthenticatedMiddleware, isAbleToEditApplication, editApplicationHandler)
  .delete(isAuthenticatedMiddleware, deleteApplicationHandler)
;








