import { Request, Response } from 'express';
import {getChatMessages, createSeenMessage, getUnseenMessageCount} from "./chat.service";
import {CreateSeenMessageSchema} from "./schemas/create-seen-message.schema";

export async function getChatMessagesHandler(req: Request, res: Response) {
  let { id } = req.params
  const userId = req.user?.id ?? ''
  return res.send(await getChatMessages(id, userId));
}

export async function createSeenMessageHandler(req: Request, res: Response) {
  const id = req.user?.id ?? ''
  let { body } = CreateSeenMessageSchema.parse(req)
  return res.send(await createSeenMessage({userId: id, chatMessageIds: body.chatMessageIds, chatId: body.chatId}));
}

export async function getUnseenMessageCountHandler(req: Request, res: Response) {
  const userId = req.user?.id ?? ''
  const chatId = req.query.chatId as string
  return res.send(await getUnseenMessageCount(userId, chatId));
}
