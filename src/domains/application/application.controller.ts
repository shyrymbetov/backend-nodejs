import { Request, Response } from 'express';
import {GetApplicationsFilterSchema} from "./schemas/get-applications-filter.schema";
import {
  createApplication,
  deleteApplication,
  editApplication,
  getApplication,
  getApplications,
  getStudentApllicationById,
  getStudentApplicationByIdWithPagination,
  getMyStudentsApplicationsWithPagination
} from "./application.service";
import {CreateApplicationSchema} from "./schemas/create-application.schema";

export async function getApplicationHandler(req: Request, res: Response) {
  let { id } = req.params
  return res.send(await getApplication(id));
}

export async function getApplicationsHandler(req: Request, res: Response) {
  const id = req.user?.id ?? ''
  const {query} = GetApplicationsFilterSchema.parse(req);
  return res.send(await getApplications(query));
}

export async function getApplicationsByUserHandler(req: Request, res: Response) {
  const id = req.user?.id ?? ''
  const {query} = GetApplicationsFilterSchema.parse(req);
  return res.send(await getApplications(query));
}

export async function getMyApplicationHandler(req: Request, res: Response) {
  const id = req.user?.id ?? ''
  return res.send(await getStudentApllicationById(id));
}

export async function getMyStudentApplicationByIdHandler(req: Request, res: Response) {
  const id = req.params.id
  const {query} = GetApplicationsFilterSchema.parse(req);
  return res.send(await getStudentApplicationByIdWithPagination(query, id));
}

export async function getMyStudentsApplicationsHandler(req: Request, res: Response) {
  const id = req.user?.id ?? ''
  const {query} = GetApplicationsFilterSchema.parse(req);
  return res.send(await getMyStudentsApplicationsWithPagination(query, id));
}



export async function createApplicationHandler(req: Request, res: Response) {
  const studentId = req.user?.id ?? ''
  const { body } = CreateApplicationSchema.parse(req);
  // return res.send(studentId);
  return res.send(await createApplication({...body, studentId: studentId}));
}

export async function editApplicationHandler(req: Request, res: Response) {
  let { id } = req.params
  const { body } = CreateApplicationSchema.parse(req);

  return res.send(await editApplication(id, body));
}
//
// export async function editApplicationStatusHandler(req: Request, res: Response) {
//   let { id } = req.params
//   const { body } = CreateApplicationSchema.parse(req);
//   return res.send(await editApplication(id, body));
// }

export async function deleteApplicationHandler(req: Request, res: Response) {
  let { id } = req.params
  return res.send(await deleteApplication(id));
}
