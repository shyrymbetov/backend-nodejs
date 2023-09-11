import {Router} from 'express';
import {
    deleteNotificationHandler,
    getMyNotificationsHandler, getNotificationByIdHandler, readNotificationHandler
} from './notification.controller';
import {isAuthenticatedMiddleware} from '../../middlewares/is-authenticated.middleware';

export const notificationRouter = Router();

notificationRouter.route('/')
  .get(isAuthenticatedMiddleware, getMyNotificationsHandler)
;

notificationRouter.route('/:id')
  .patch(isAuthenticatedMiddleware, getNotificationByIdHandler)
  .patch(isAuthenticatedMiddleware, readNotificationHandler)
  .delete(isAuthenticatedMiddleware, deleteNotificationHandler)
;


