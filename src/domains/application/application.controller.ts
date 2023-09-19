import {Request, Response} from 'express';
import {GetApplicationsFilterSchema} from "./schemas/get-applications-filter.schema";
import {
    createApplication,
    deleteApplication,
    editApplication,
    getApplications,
    getMyStudentsApplicationsWithPagination,
    getMyStudentsApplicationsDraft,
    editApplicationActions,
    getApplicationById,
    getStudentApplicationById,
    getAvailableCountries,
    getAvailableUniversities,
    getAvailableSemesters,
    getAvailableSchools,
    getAvailableOrientators,
    getAvailableExperts
} from "./application.service";
import {CreateApplicationSchema} from "./schemas/create-application.schema";
import {ApplicationActionsSchema} from "./schemas/application-actions.schema";
import {GetMyApplicationsFilterSchema} from "./schemas/get-my-applications-filter.schema";

export async function getApplicationHandler(req: Request, res: Response) {
    let {id} = req.params
    return res.send(await getApplicationById(id));
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
    const {query} = GetMyApplicationsFilterSchema.parse(req);
    return res.send(await getStudentApplicationById(query, id));
}

export async function getMyStudentApplicationByIdHandler(req: Request, res: Response) {
    const id = req.params.id
    const {query} = GetMyApplicationsFilterSchema.parse(req);
    return res.send(await getStudentApplicationById(query, id));
}

export async function getMyStudentsApplicationsDraftHandler(req: Request, res: Response) {
    const id = req.user?.id ?? ''
    const {query} = GetApplicationsFilterSchema.parse(req);
    return res.send(await getMyStudentsApplicationsDraft(query, id));
}

export async function getMyStudentsApplicationsHandler(req: Request, res: Response) {
    const id = req.user?.id ?? ''
    const {query} = GetApplicationsFilterSchema.parse(req);
    return res.send(await getMyStudentsApplicationsWithPagination(query, id));

}

export async function createApplicationHandler(req: Request, res: Response) {
    const studentId = req.user?.id ?? ''
    const {body} = CreateApplicationSchema.parse(req);
    body.studentId = body.studentId ?? studentId
    // return res.send(studentId);
    return res.send(await createApplication(body));
}

export async function editApplicationHandler(req: Request, res: Response) {
    let {id} = req.params
    const {body} = CreateApplicationSchema.parse(req);
    return res.send(await editApplication(id, body));
}


export async function editApplicationStatusHandler(req: Request, res: Response) {
    let {id} = req.params
    const {body} = ApplicationActionsSchema.parse(req);
    return res.send(await editApplicationActions(id, body));
}

export async function deleteApplicationHandler(req: Request, res: Response) {
    let {id} = req.params
    return res.send(await deleteApplication(id));
}

export async function getAvailableCountriesHandler(req: Request, res: Response) {
    return res.send(await getAvailableCountries());
}

export async function getAvailableUniversitiesHandler(req: Request, res: Response) {
    return res.send(await getAvailableUniversities());
}

export async function getAvailableSemestersHandler(req: Request, res: Response) {
    return res.send(await getAvailableSemesters());
}

export async function getAvailableSchoolsHandler(req: Request, res: Response) {
    return res.send(await getAvailableSchools());
}

export async function getAvailableOrientatorsHandler(req: Request, res: Response) {
    return res.send(await getAvailableOrientators());
}

export async function getAvailableExpertsHandler(req: Request, res: Response) {
    return res.send(await getAvailableExperts());
}










