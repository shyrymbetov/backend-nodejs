import {Router} from 'express';
import {
    createNotificationHandler,
    deleteNotificationHandler,
    getMyNotificationsHandler, getNotificationByIdHandler, readNotificationHandler
} from './notification.controller';
import {isAuthenticatedMiddleware} from '../../middlewares/is-authenticated.middleware';

export const notificationRouter = Router();

notificationRouter.route('/')
  .get(isAuthenticatedMiddleware, getMyNotificationsHandler)
  .post(createNotificationHandler)
;

notificationRouter.route('/:id')
  .get(isAuthenticatedMiddleware, getNotificationByIdHandler)
  .patch(isAuthenticatedMiddleware, readNotificationHandler)
  .delete(isAuthenticatedMiddleware, deleteNotificationHandler)
;


