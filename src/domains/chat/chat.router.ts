import {Router} from 'express';
import {
    getChatMessagesHandler,
    createSeenMessageHandler,
    getUnseenMessageCountHandler
} from './chat.controller';
import {isAuthenticatedMiddleware} from '../../middlewares/is-authenticated.middleware';

export const chatRouter = Router();

chatRouter.route('/seen')
    .post(isAuthenticatedMiddleware, createSeenMessageHandler)

chatRouter.route('/unseen-message-count')
    .get(isAuthenticatedMiddleware, getUnseenMessageCountHandler)

chatRouter.route('/:id')
  .get(isAuthenticatedMiddleware, getChatMessagesHandler)
;


