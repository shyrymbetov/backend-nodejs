import { Request, Response } from 'express';
import {CreateCountrySchema} from "./schemas/create-country.schema";
import {CreateStateSchema} from "./schemas/create-state.schema";
import {
  createUniversitiesCountry,
  createUniversitiesState, deleteUniversitiesCountry, deleteUniversitiesState,
  getUniversitiesCountry, getUniversitiesFaculty, getUniversitiesSpecialities,
  getUniversitiesState
} from "./university-data.service";
import {GetUniversityCountryFilterSchema} from "./schemas/get-university-country.schema";

export async function getUniversitiesCountryHandler(req: Request, res: Response) {
  const {query} = GetUniversityCountryFilterSchema.parse(req);
  return res.send(await getUniversitiesCountry(query));
}

export async function createUniversitiesCountryHandler(req: Request, res: Response) {
  const { body } = CreateCountrySchema.parse(req);
  return res.send(await createUniversitiesCountry(body));
}
export async function deleteUniversitiesCountryHandler(req: Request, res: Response) {
  const {id} = req.params
  return res.send(await deleteUniversitiesCountry(id));
}

export async function getUniversitiesStateHandler(req: Request, res: Response) {
  const {query} = GetUniversityCountryFilterSchema.parse(req);
  return res.send(await getUniversitiesState(query));
}

export async function createUniversitiesStateHandler(req: Request, res: Response) {
  const { body } = CreateStateSchema.parse(req);
  return res.send(await createUniversitiesState(body));
}

export async function deleteUniversitiesStateHandler(req: Request, res: Response) {
  const {id} = req.params
  return res.send(await deleteUniversitiesState(id));
}

export async function getUniversitiesFacultyHandler(req: Request, res: Response) {
  const {query} = GetUniversityCountryFilterSchema.parse(req);
  return res.send(await getUniversitiesFaculty(query));
}

export async function getUniversitiesSpecialitiesHandler(req: Request, res: Response) {
  const {query} = GetUniversityCountryFilterSchema.parse(req);
  return res.send(await getUniversitiesSpecialities(query));
}


