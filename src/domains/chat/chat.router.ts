import {Router} from 'express';
import {
    getChatMessagesHandler
} from './chat.controller';
import {isAuthenticatedMiddleware} from '../../middlewares/is-authenticated.middleware';

export const chatRouter = Router();

chatRouter.route('/:id')
  .get(isAuthenticatedMiddleware, getChatMessagesHandler)
  // .post(isAuthenticatedMiddleware, sendMessageToChatHandler)
;


