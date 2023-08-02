import { Request, Response } from 'express';
import {
  createUniversity,
  deleteUniversity, editUniversity,
  getUniversities,
  getUniversityById,
} from './university.service';
import {CreateUniversitySchema} from "./schemas/create-university.schema";
import {GetUniversitiesFilterSchema} from "./schemas/get-universities-filter.schema";
import {GetUsersFilterSchema} from "../user/schemas/get-users-filter.schema";

export async function getUniversityHandler(req: Request, res: Response) {
  let { id } = req.params
  return res.send(await getUniversityById(id));
}

export async function getUniversitiesHandler(req: Request, res: Response) {
  const {query} = GetUniversitiesFilterSchema.parse(req);
  return res.send(await getUniversities(query));
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

export async function deleteUniversityHandler(req: Request, res: Response) {
  const { id } = req.params
  return res.send(await deleteUniversity(id));
}
