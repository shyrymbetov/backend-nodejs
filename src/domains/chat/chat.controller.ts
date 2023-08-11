import { Request, Response } from 'express';

export async function getChatMessagesHandler(req: Request, res: Response) {
  let { id } = req.params
  return res.send(200);
}

export async function sendMessageToChatHandler(req: Request, res: Response) {
  return res.send(200);
}

export async function deleteApplicationHandler(req: Request, res: Response) {
  const { id } = req.params
  return res.send(200);
}
