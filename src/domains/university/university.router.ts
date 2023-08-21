import {Router} from 'express';
import {
    getUniversityHandler,
    getUniversitiesHandler,
    createUniversityHandler,
    editUniversityHandler,
    deleteUniversityHandler,
    editUniversityActionsHandler,
    getUniversitiesToLandingHandler
} from './university.controller';
import {isAuthenticatedMiddleware} from '../../middlewares/is-authenticated.middleware';
import {isAdminMiddleware} from '../../middlewares/is-admin.middleware';
import {universityDataRouter} from "./data/university-data.router";


export const universityRouter = Router();
universityRouter.route('/')
    .get(getUniversitiesHandler) // make obratno isauth and is admin
    .post(createUniversityHandler) // make obratno isauth and is admin
;

universityRouter.route('/for-landing')
    .get(getUniversitiesToLandingHandler)
;

universityRouter.route('/:id')
  .get(getUniversityHandler) // make obratno isauth and is admin
  .patch(isAuthenticatedMiddleware, isAdminMiddleware, editUniversityHandler)
  .delete(deleteUniversityHandler)
;

universityRouter.route('/actions/:id')
  .patch(isAuthenticatedMiddleware, isAdminMiddleware, editUniversityActionsHandler)
;



universityRouter.use('/data', universityDataRouter);


