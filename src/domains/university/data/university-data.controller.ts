import { Request, Response } from 'express';
import {CreateCountrySchema} from "./schemas/create-country.schema";
import {
  createUniversitiesCountry,
  deleteUniversitiesCountry,
  getUniversitiesCountry,
  getUniversitiesFaculty,
  getUniversitiesSpecialities,
  getUniversitiesState,
  getEduDegreeById,
  getFacultyById,
  getImportantDayById,
  getSpecialityById
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

export async function getUniversitiesFacultyHandler(req: Request, res: Response) {
  const {query} = GetUniversityCountryFilterSchema.parse(req);
  return res.send(await getUniversitiesFaculty(query));
}

export async function getUniversitiesSpecialitiesHandler(req: Request, res: Response) {
  const {query} = GetUniversityCountryFilterSchema.parse(req);
  return res.send(await getUniversitiesSpecialities(query));
}

export async function getEduDegreeByIdHandler(req: Request, res: Response) {
  const id = req.params.id
  return res.send(await getEduDegreeById(id))
}

export async function getFacultyByIdHandler(req: Request, res: Response) {
  const id = req.params.id
  return res.send(await getFacultyById(id))
}

export async function getImportantDayByIdHandler(req: Request, res: Response) {
  const id = req.params.id
  return res.send(await getImportantDayById(id))
}

export async function getSpecialityByIdHandler(req: Request, res: Response) {
  const id = req.params.id
  return res.send(await getSpecialityById(id))
}






