import { Request, Response } from 'express';
import {getChatMessages} from "./chat.service";
import {GetNotificationFilterSchema} from "../notifications/schema/get-notification-filter.schema";

export async function getChatMessagesHandler(req: Request, res: Response) {
  let { id } = req.params
  const { query} = GetNotificationFilterSchema.parse(req)
  return res.send(await getChatMessages(id, query));
}
