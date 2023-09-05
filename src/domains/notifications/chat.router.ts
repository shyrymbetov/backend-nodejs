import {Router} from 'express';
import {
    getMyNotificationsHandler
} from './chat.controller';
import {isAuthenticatedMiddleware} from '../../middlewares/is-authenticated.middleware';

export const notificationRouter = Router();

notificationRouter.route('/')
  .get(isAuthenticatedMiddleware, getMyNotificationsHandler)
;


