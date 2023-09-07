import {UniversityEntity} from "../university/model/university.entity";
import {CreateWorksheetDto} from "./dtos/create-worksheet.dto";
import {dataSource} from "../../database";
import {WorksheetEntity} from "./model/worksheet.entity";
import {getUniversityById} from "../university/university.service";
import {editApplicationAfterWorkSheetChange} from "../application/application.service";

const worksheetRepository = dataSource.getRepository(WorksheetEntity);


export async function getWorksheetById(id: string): Promise<WorksheetEntity | null> {
    return await worksheetRepository.findOneBy({ id: id });
}

export async function getWorksheetForLanding(id: string): Promise<WorksheetEntity | null> {
    return await worksheetRepository.createQueryBuilder('worksheet')
        .leftJoin('worksheet.university', 'university')
        .leftJoinAndSelect('worksheet.profileFields', 'profileFields')
        .leftJoinAndSelect('worksheet.contactsFields', 'contactsFields')
        .leftJoinAndSelect('worksheet.educationFields', 'educationFields')
        .leftJoinAndSelect('worksheet.languagesFields', 'languagesFields')
        .leftJoinAndSelect('worksheet.recommendationsFields', 'recommendationsFields')
        .leftJoinAndSelect('worksheet.motivationFields', 'motivationFields')
        .leftJoinAndSelect('worksheet.documentsFields', 'documentsFields')
        .leftJoinAndSelect('worksheet.otherFields', 'otherFields')
        .where('worksheet.id = :id AND university.canApply', { id })
        .getOne();
}

export async function createWorksheet(universityDto: CreateWorksheetDto) {
    return await worksheetRepository.save(universityDto);
}

export async function editWorksheet(id: string, universityDto: CreateWorksheetDto) {
    universityDto.id = id
    // await editApplicationAfterWorkSheetChange(universityDto.universityId, universityDto)
    return await worksheetRepository.save(universityDto);
}

export async function duplicateWorksheet(id: string, universityId: string) {
    const duplicateWorksheet = await getWorksheetById(id)
    if (!duplicateWorksheet) {
        throw new DOMException("Worksheet not exists")
    }
    // @ts-ignore
    delete duplicateWorksheet['id']
    duplicateWorksheet.universityId = universityId

    const savedWorksheet = await worksheetRepository.save(duplicateWorksheet);
    return await worksheetRepository.save(savedWorksheet);
}

export async function deleteWorksheet(id: string) {
    return await worksheetRepository.delete(id);
}
