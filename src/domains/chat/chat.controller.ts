import { Request, Response } from 'express';

export async function getChatMessagesHandler(req: Request, res: Response) {
  let { id } = req.params
  return res.send(200);
}
