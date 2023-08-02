import { Request, Response } from 'express';

export async function getWorksheetHandler(req: Request, res: Response) {
    return res.send(await getUniversities({}));
}

export async function createWorksheetHandler(req: Request, res: Response) {
    return res.send(await getUniversities({}));
}

export async function editWorksheetHandler(req: Request, res: Response) {
    return res.send(await getUniversities({}));
}

export async function deleteWorksheetHandler(req: Request, res: Response) {
    return res.send(await getUniversities({}));
}
