import {Router} from 'express';
import {
    getChatMessagesHandler,
} from './chat.controller';
import {isAuthenticatedMiddleware} from '../../middlewares/is-authenticated.middleware';
import path from "path";

export const chatRouter = Router();

chatRouter.route('/:id')
  .get(isAuthenticatedMiddleware, getChatMessagesHandler)
;





