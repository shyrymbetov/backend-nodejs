import { Request, Response } from 'express';
import {getFileById, uploadFile, uploadFiles} from "./file.service";
import {BadRequest} from "http-errors";
import {FileUploadSchema} from "./schemas/file-upload.schema";
import {FilesUploadSchema} from "./schemas/files-upload.schema";
const fileSystem = require('fs'), path = require('path');


export async function getFileHandler(req: Request, res: Response) {
    let { id } = req.params
    const file = await getFileById(id)

    if (!file) {
        throw BadRequest("File not exists");
    }

    const filePath = path.join(file.fullPath);
    const stat = fileSystem.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': file.mime,
        'Content-Length': stat.size,
        'Filename': file.fileName
    });

    const readStream = fileSystem.createReadStream(filePath);
    readStream.pipe(res);
}

export async function uploadFilesHandler(req: Request, res: Response) {
    const {files} = FilesUploadSchema.parse(req);
    res.send(await uploadFiles(files));
}

export async function uploadFileHandler(req: Request, res: Response) {
    const {file} = FileUploadSchema.parse(req);
    res.send(await uploadFile(file));
}
