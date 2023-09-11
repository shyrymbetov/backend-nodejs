import { Request, Response } from 'express';
import {
  deleteNotification,
  getNotificationById,
  getNotificationsByUserId,
  readNotification
} from "./notification.service";
import {GetNotificationFilterSchema} from "./schema/get-notification-filter.schema";

export async function getMyNotificationsHandler(req: Request, res: Response) {
  let id: string = req.user?.id!!
  const { query} = GetNotificationFilterSchema.parse(req)
  return res.send(await getNotificationsByUserId(id, query));
}
export async function getNotificationByIdHandler(req: Request, res: Response) {
  const {id} = req.params
  return res.send(await getNotificationById(id));
}
export async function readNotificationHandler(req: Request, res: Response) {
  const {id} = req.params
  return res.send(await readNotification(id));
}
export async function  deleteNotificationHandler(req: Request, res: Response) {
  const {id} = req.params
  return res.send(await deleteNotification(id));
}
