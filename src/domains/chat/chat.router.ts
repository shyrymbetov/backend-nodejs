import {Router} from 'express';
import {
    getChatMessagesHandler,
    createSeenMessageHandler,
    getUnseenMessageCountHandler, createChatMessagesHandler
} from './chat.controller';
import {isAuthenticatedMiddleware} from '../../middlewares/is-authenticated.middleware';

export const chatRouter = Router();

chatRouter.route('/seen')
    .post(isAuthenticatedMiddleware, createSeenMessageHandler)

chatRouter.route('/unseen-message-count/:applicationId')
    .get(isAuthenticatedMiddleware, getUnseenMessageCountHandler)

chatRouter.route('/:id')
  .get(isAuthenticatedMiddleware, getChatMessagesHandler)
;

chatRouter.route('/message')
  .post(isAuthenticatedMiddleware, createChatMessagesHandler)
;


