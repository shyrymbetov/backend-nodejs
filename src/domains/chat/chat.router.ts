import {Router} from 'express';
import {
    getChatMessagesHandler,
    postSeenMessageHandler
} from './chat.controller';
import {isAuthenticatedMiddleware} from '../../middlewares/is-authenticated.middleware';

export const chatRouter = Router();

chatRouter.route('/:id')
  .get(isAuthenticatedMiddleware, getChatMessagesHandler)
;

chatRouter.route('/seen')
    .post(isAuthenticatedMiddleware, postSeenMessageHandler)





