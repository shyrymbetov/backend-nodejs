import {dataSource} from '../../database';
import {FileEntity} from './model/file.entity';
import {FileRequestDto} from "./dtos/file-request.dto";
const fileRepository = dataSource.getRepository(FileEntity);

export async function getFileById(id: string): Promise<FileEntity | null> {
    return await fileRepository.findOneBy({ id: id });
}

export async function uploadFiles(files: FileRequestDto[]) {
    console.log(files);
    for (const file of files) {
        const n = file.originalname.lastIndexOf('/');
        const fileFormat = file.originalname.substring(n + 1);
        await fileRepository.save({
            fileName: file.originalname,
            fileFormat: fileFormat,
            fullPath: file.path,
            mime: file.mimetype,
            size: file.size,
        });
    }
    return { message: "Successfully uploaded files" }
}


