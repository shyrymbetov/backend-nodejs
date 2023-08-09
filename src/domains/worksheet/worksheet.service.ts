import {UniversityEntity} from "../university/model/university.entity";
import {CreateWorksheetDto} from "./dtos/create-worksheet.dto";
import {dataSource} from "../../database";

const worksheetRepository = dataSource.getRepository(UniversityEntity);


export async function getWorksheetById(id: string): Promise<UniversityEntity | null> {
    return await worksheetRepository.findOneBy({ id: id });
}

export async function createWorksheet(universityDto: CreateWorksheetDto) {
    return await worksheetRepository.save(universityDto);
}

export async function editWorksheet(id: string, universityDto: CreateWorksheetDto) {
    return await worksheetRepository.update(id, universityDto);
}

export async function deleteWorksheet(id: string) {
    return await worksheetRepository.delete(id);
}
