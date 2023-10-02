import { Request, Response } from 'express';
import {
  createNotification,
  deleteNotification,
  getNotificationById,
  getNotificationsByUserId,
  readNotification
} from "./notification.service";
import {GetNotificationFilterSchema} from "./schema/get-notification-filter.schema";
import {CreateNotificationSchema} from "./schema/create-notification.schema";

export async function getMyNotificationsHandler(req: Request, res: Response) {
  let id: string = req.user?.id!!
  console.log(id)
  const { query} = GetNotificationFilterSchema.parse(req)
  return res.send(await getNotificationsByUserId(id, query));
}

export async function createNotificationHandler(req: Request, res: Response) {
  let id: string = req.user?.id!!
  const { body} = CreateNotificationSchema.parse(req)
  return res.send(await createNotification(body));
}
export async function getNotificationByIdHandler(req: Request, res: Response) {
  const {id} = req.params
  return res.send(await getNotificationById(id));
}
export async function readNotificationHandler(req: Request, res: Response) {
  const userId = req.user?.id ?? ''
  return res.send(await readNotification(userId));
}
export async function  deleteNotificationHandler(req: Request, res: Response) {
  const {id} = req.params
  return res.send(await deleteNotification(id));
}
