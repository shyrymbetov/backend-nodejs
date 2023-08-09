import {Router} from 'express';
import {
    createWorksheetHandler,
    deleteWorksheetHandler,
    editWorksheetHandler,
    getWorksheetHandler
} from './worksheet.controller';
import {isAuthenticatedMiddleware} from '../../middlewares/is-authenticated.middleware';
import {isAdminMiddleware} from '../../middlewares/is-admin.middleware';


export const worksheetRouter = Router();
worksheetRouter.route('/').post(isAuthenticatedMiddleware, isAdminMiddleware, createWorksheetHandler);

worksheetRouter.route('/:id')
  .get(isAuthenticatedMiddleware, getWorksheetHandler)
  .patch(isAuthenticatedMiddleware, isAdminMiddleware, editWorksheetHandler)
  .delete(isAuthenticatedMiddleware, isAdminMiddleware, deleteWorksheetHandler)
;


