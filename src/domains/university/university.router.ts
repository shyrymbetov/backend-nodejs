import {Router} from 'express';
import {
    getUniversityHandler,
    getUniversitiesHandler,
    createUniversityHandler,
    editUniversityHandler,
    deleteUniversityHandler, editUniversityVisibleHandler, editUniversityActionsHandler
} from './university.controller';
import {isAuthenticatedMiddleware} from '../../middlewares/is-authenticated.middleware';
import {isAdminMiddleware} from '../../middlewares/is-admin.middleware';
import {authRouter} from "../auth/auth.router";
import {universityDataRouter} from "./data/university-data.router";

authRouter.use('/data', universityDataRouter);

export const universityRouter = Router();
universityRouter.route('/')
    .get(isAuthenticatedMiddleware, isAdminMiddleware, getUniversitiesHandler)
    .post(isAuthenticatedMiddleware, isAdminMiddleware, createUniversityHandler)
;

universityRouter.route('/:id')
  .get(isAuthenticatedMiddleware, isAdminMiddleware, getUniversityHandler)
  .patch(isAuthenticatedMiddleware, isAdminMiddleware, editUniversityHandler)
  .delete(isAuthenticatedMiddleware, isAdminMiddleware, deleteUniversityHandler)
;

universityRouter.route('/actions/:id')
  .patch(isAuthenticatedMiddleware, isAdminMiddleware, editUniversityActionsHandler)
;


