import {Router} from 'express';
import {
    getUniversityHandler,
    getUniversitiesHandler,
    createUniversityHandler,
    editUniversityHandler,
    deleteUniversityHandler
} from './university.controller';
import {isAuthenticatedMiddleware} from '../../middlewares/is-authenticated.middleware';
import {isAdminMiddleware} from '../../middlewares/is-admin.middleware';

export const universityRouter = Router();
universityRouter.route('/')
    .get(isAuthenticatedMiddleware, getUniversitiesHandler)
    .post(isAuthenticatedMiddleware, isAdminMiddleware, createUniversityHandler)
;

universityRouter.route('/:id')
  .get(isAuthenticatedMiddleware, isAdminMiddleware, getUniversityHandler)
  .patch(isAuthenticatedMiddleware, isAdminMiddleware, editUniversityHandler)
  .delete(isAuthenticatedMiddleware, isAdminMiddleware, deleteUniversityHandler)
;
