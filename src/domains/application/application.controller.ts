import { Request, Response } from 'express';

export async function getApplicationHandler(req: Request, res: Response) {
  let { id } = req.params
  return res.send(200);
}

export async function getApplicationsHandler(req: Request, res: Response) {
  return res.send(200);
}

export async function createApplicationHandler(req: Request, res: Response) {
  return res.send(200);
}

export async function editApplicationHandler(req: Request, res: Response) {
  return res.send(200);
}

export async function deleteApplicationHandler(req: Request, res: Response) {
  const { id } = req.params
  return res.send(200);
}
