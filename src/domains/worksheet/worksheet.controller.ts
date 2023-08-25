import { Request, Response } from 'express';
import {CreateWorksheetSchema} from "./schemas/create-worksheet.schema";
import {
    createWorksheet,
    deleteWorksheet,
    editWorksheet,
    getWorksheetById,
    getWorksheetForLanding
} from "./worksheet.service";

export async function getWorksheetHandler(req: Request, res: Response) {
    let { id } = req.params
    return res.send(await getWorksheetById(id));
}

export async function getWorksheetForLandingHandler(req: Request, res: Response) {
    let { id } = req.params
    return res.send(await getWorksheetForLanding(id));
}

export async function createWorksheetHandler(req: Request, res: Response) {
    const { body } = CreateWorksheetSchema.parse(req);
    return res.send(await createWorksheet(body));
}

export async function editWorksheetHandler(req: Request, res: Response) {
    let { id } = req.params
    const { body } = CreateWorksheetSchema.parse(req);
    return res.send(await editWorksheet(id, body));
}

export async function deleteWorksheetHandler(req: Request, res: Response) {
    let { id } = req.params
    return res.send(await deleteWorksheet(id));
}
