import { Request, Response } from 'express';
import {
  createUniversity,
  deleteUniversity, duplicateUniversity, editUniversity, editUniversityActions,
  getUniversities, getUniversitiesToLanding,
  getUniversityById, getUniversityShortDataById,
} from './university.service';
import {CreateUniversitySchema} from "./schemas/create-university.schema";
import {GetUniversitiesFilterSchema} from "./schemas/get-universities-filter.schema";
import {UniversityActionsSchema} from "./schemas/university-actions.schema";

export async function getUniversityHandler(req: Request, res: Response) {
  let { id } = req.params
  return res.send(await getUniversityById(id));
}

export async function getUniversityShortDataHandler(req: Request, res: Response) {
  let { id } = req.params
  return res.send(await getUniversityShortDataById(id));
}

export async function getUniversitiesHandler(req: Request, res: Response) {
  const {query} = GetUniversitiesFilterSchema.parse(req);
  return res.send(await getUniversities(query));
}

export async function getUniversitiesToLandingHandler(req: Request, res: Response) {
  const {query} = GetUniversitiesFilterSchema.parse(req);
  return res.send(await getUniversitiesToLanding(query));
}

export async function createUniversityHandler(req: Request, res: Response) {
  const { body } = CreateUniversitySchema.parse(req);
  return res.send(await createUniversity(body));
}

export async function editUniversityHandler(req: Request, res: Response) {
  const { id } = req.params
  const { body } = CreateUniversitySchema.parse(req);
  return res.send(await editUniversity(id, body));
}
export async function duplicateUniversityHandler(req: Request, res: Response) {
  const { id } = req.params
  return res.send(await duplicateUniversity(id));
}

export async function editUniversityActionsHandler(req: Request, res: Response) {
  const { id } = req.params
  const { body } = UniversityActionsSchema.parse(req);
  return res.send(await editUniversityActions(id, body));
}

export async function deleteUniversityHandler(req: Request, res: Response) {
  const { id } = req.params
  return res.send(await deleteUniversity(id));
}
