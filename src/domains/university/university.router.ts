import {Router} from 'express';
import {
    getUniversityHandler,
    getUniversitiesHandler,
    createUniversityHandler,
    editUniversityHandler,
    deleteUniversityHandler,
    editUniversityActionsHandler,
    getUniversitiesToLandingHandler, getUniversityShortDataHandler, duplicateUniversityHandler
} from './university.controller';
import {isAuthenticatedMiddleware} from '../../middlewares/is-authenticated.middleware';
import {isAdminMiddleware} from '../../middlewares/is-admin.middleware';
import {universityDataRouter} from "./data/university-data.router";


export const universityRouter = Router();
universityRouter.route('/')
    .get(isAuthenticatedMiddleware, getUniversitiesHandler)
    .post(isAuthenticatedMiddleware, isAdminMiddleware, createUniversityHandler)
;

universityRouter.route('/landing')
    .get(getUniversitiesToLandingHandler)
;

universityRouter.route('/:id')
  .get(getUniversityHandler) // make obratno isauth and is admin
  .patch(isAuthenticatedMiddleware, isAdminMiddleware, editUniversityHandler)
  .delete(isAuthenticatedMiddleware, isAdminMiddleware, deleteUniversityHandler)
;
universityRouter.route('/duplicate/:id')
  .put(isAuthenticatedMiddleware, isAdminMiddleware, duplicateUniversityHandler)
;
universityRouter.route('/short/:id')
  .get(getUniversityShortDataHandler) // make obratno isauth and is admin
;

universityRouter.route('/actions/:id')
  .patch(isAuthenticatedMiddleware, isAdminMiddleware, editUniversityActionsHandler)
;

universityRouter.use('/data', universityDataRouter);


