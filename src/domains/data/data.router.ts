import { Router } from 'express';
import {getLocalHandler, getRegionsHandler, getSchoolHandler} from './data.controller';

export const dataRouter = Router();

dataRouter.route('/region').get(getRegionsHandler);
dataRouter.route('/local/:regionId').get(getLocalHandler);
dataRouter.route('/school/:localId').get(getSchoolHandler);


