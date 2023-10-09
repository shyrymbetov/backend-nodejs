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
notificationRouter.route('/seen').put(isAuthenticatedMiddleware, readNotificationHandler);

notificationRouter.route('/:id')
  .get(isAuthenticatedMiddleware, getNotificationByIdHandler)
  .delete(isAuthenticatedMiddleware, deleteNotificationHandler)
;


