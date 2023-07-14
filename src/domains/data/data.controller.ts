import { Request, Response } from 'express';
import {getLocals, getRegions, getSchools} from "./data.service";

export async function getRegionsHandler(req: Request, res: Response) {
  return res.send(await getRegions());
}

export async function getLocalHandler(req: Request, res: Response) {
  const {regionId} = req.params
  return res.send(await getLocals(regionId));
}

export async function getSchoolHandler(req: Request, res: Response) {
  const {localId} = req.params
  return res.send(await getSchools(localId));
}

