import { Router } from 'express';
import {
    getLocalHandler,
    getRegionsHandler,
    getSchoolHandler,
    getSchoolByIdHandler,
    getRegionByIdHandler, getLocalByIdHandler
} from './data.controller';

export const dataRouter = Router();

dataRouter.route('/region').get(getRegionsHandler);
dataRouter.route('/local/:regionId').get(getLocalHandler);
dataRouter.route('/school/:localId').get(getSchoolHandler);
dataRouter.route('/region/find/:id').get(getRegionByIdHandler);
dataRouter.route('/local/find/:id').get(getLocalByIdHandler);
dataRouter.route('/school/find/:id').get(getSchoolByIdHandler);


