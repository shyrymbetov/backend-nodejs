import {UniversityEntity} from "../university/model/university.entity";
import {CreateWorksheetDto} from "./dtos/create-worksheet.dto";
import {dataSource} from "../../database";
import {WorksheetEntity} from "./model/worksheet.entity";

const worksheetRepository = dataSource.getRepository(WorksheetEntity);


export async function getWorksheetById(id: string): Promise<WorksheetEntity | null> {
    return await worksheetRepository.findOneBy({ id: id });
}

export async function getWorksheetForLanding(id: string): Promise<WorksheetEntity | null> {
    return await worksheetRepository.findOne({
        where: {id: id},
        relations: ['university.canApply'],
    });
}

export async function createWorksheet(universityDto: CreateWorksheetDto) {
    return await worksheetRepository.save(universityDto);
}

export async function editWorksheet(id: string, universityDto: CreateWorksheetDto) {
    universityDto.id = id
    return await worksheetRepository.save(universityDto);
}

export async function deleteWorksheet(id: string) {
    return await worksheetRepository.delete(id);
}
