import {Router} from 'express';
import {
    createUniversitiesCountryHandler,
    deleteUniversitiesCountryHandler,
    getUniversitiesCountryHandler,
    getUniversitiesFacultyHandler,
    getUniversitiesSpecialitiesHandler,
    getUniversitiesStateHandler,
    getEduDegreeByIdHandler,
    getFacultyByIdHandler,
    getImportantDayByIdHandler,
    getSpecialityByIdHandler
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

universityDataRouter.route('/state').get(getUniversitiesStateHandler);
universityDataRouter.route('/faculty').get(getUniversitiesFacultyHandler);
universityDataRouter.route('/specialities').get(getUniversitiesSpecialitiesHandler);

universityDataRouter.route('/edu-degree/:id')
    .get(isAuthenticatedMiddleware, getEduDegreeByIdHandler)

universityDataRouter.route('/faculty/:id')
    .get(isAuthenticatedMiddleware, getFacultyByIdHandler)

universityDataRouter.route('/important-day/:id')
    .get(isAuthenticatedMiddleware, getImportantDayByIdHandler)

universityDataRouter.route('/speciality/:id')
    .get(isAuthenticatedMiddleware, getSpecialityByIdHandler)
