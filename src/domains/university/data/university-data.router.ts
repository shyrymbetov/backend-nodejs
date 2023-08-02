import {Router} from 'express';
import {
    createUniversitiesCountryHandler,
    createUniversitiesStateHandler, deleteUniversitiesCountryHandler, deleteUniversitiesStateHandler,
    getUniversitiesCountryHandler,
    getUniversitiesFacultyHandler,
    getUniversitiesSpecialitiesHandler,
    getUniversitiesStateHandler,
} from './university-data.controller';
import {isAuthenticatedMiddleware} from "../../../middlewares/is-authenticated.middleware";
import {isAdminMiddleware} from "../../../middlewares/is-admin.middleware";

export const universityDataRouter = Router()
universityDataRouter.route('/country')
    .get(getUniversitiesCountryHandler)
    .post(isAuthenticatedMiddleware, isAdminMiddleware, createUniversitiesCountryHandler)
;

universityDataRouter.route('/country/:id')
    .delete(isAuthenticatedMiddleware, isAdminMiddleware, deleteUniversitiesCountryHandler);

universityDataRouter.route('/state')
    .get(getUniversitiesStateHandler)
    .post(isAuthenticatedMiddleware, isAdminMiddleware, createUniversitiesStateHandler)
;
universityDataRouter.route('/state/:id')
    .delete(isAuthenticatedMiddleware, isAdminMiddleware, deleteUniversitiesStateHandler)
;
universityDataRouter.route('/faculty').get(getUniversitiesFacultyHandler);
universityDataRouter.route('/specialities').get(getUniversitiesSpecialitiesHandler);


