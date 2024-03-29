import {Router} from 'express';
import {
    createApplicationHandler,
    deleteApplicationHandler,
    editApplicationHandler,
    editApplicationStatusHandler,
    getApplicationHandler,
    getApplicationsByUserHandler,
    getMyApplicationHandler,
    getMyStudentApplicationByIdHandler,
    getMyStudentsApplicationsDraftHandler,
    getMyStudentsApplicationsHandler,
    getAvailableCountriesHandler,
    getAvailableUniversitiesHandler,
    getAvailableSemestersHandler,
    getAvailableSchoolsHandler,
    getAvailableOrientatorsHandler,
    getAvailableExpertsHandler
} from './application.controller';
import { isAuthenticatedMiddleware } from '../../middlewares/is-authenticated.middleware';
import { isAbleToEditApplication } from '../../middlewares/is-able-to-edit-application.middleware';

export const applicationRouter = Router();
applicationRouter.route('/')
    // .get(isAuthenticatedMiddleware, getApplicationsHandler)
    .post(isAuthenticatedMiddleware, createApplicationHandler)
;
applicationRouter.route('/user/:userId')
    .get(isAuthenticatedMiddleware, getApplicationsByUserHandler)
;

applicationRouter.route('/my')
    .get(isAuthenticatedMiddleware, getMyApplicationHandler)
;

applicationRouter.route('/my-students')
    .get(isAuthenticatedMiddleware, getMyStudentsApplicationsHandler)

applicationRouter.route('/my-students-draft')
    .get(isAuthenticatedMiddleware, getMyStudentsApplicationsDraftHandler)

applicationRouter.route('/available-countries')
    .get(isAuthenticatedMiddleware, getAvailableCountriesHandler)

applicationRouter.route('/available-universities')
    .get(isAuthenticatedMiddleware, getAvailableUniversitiesHandler)

applicationRouter.route('/available-semesters')
    .get(isAuthenticatedMiddleware, getAvailableSemestersHandler)

applicationRouter.route('/available-schools')
    .get(isAuthenticatedMiddleware, getAvailableSchoolsHandler)

applicationRouter.route('/available-orientators')
    .get(isAuthenticatedMiddleware, getAvailableOrientatorsHandler)

applicationRouter.route('/available-experts')
    .get(isAuthenticatedMiddleware, getAvailableExpertsHandler)

applicationRouter.route('/my-students/:id')
    .get(isAuthenticatedMiddleware, getMyStudentApplicationByIdHandler)

applicationRouter.route('/:id')
  .get(isAuthenticatedMiddleware, getApplicationHandler)
  .patch(isAuthenticatedMiddleware, isAbleToEditApplication, editApplicationHandler)
  .delete(isAuthenticatedMiddleware, deleteApplicationHandler)
;
applicationRouter.route('/status/:id')
  .patch(isAuthenticatedMiddleware, editApplicationStatusHandler)
;








