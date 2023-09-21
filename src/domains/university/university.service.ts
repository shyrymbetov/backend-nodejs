import {dataSource} from '../../database';
import {UniversityEntity} from './model/university.entity';
import {CreateUniversityDto} from "./dtos/create-university.dto";
import {GetUniversitiesFilterDto} from "./dtos/get-univerties-params.dto";
import {UniversityActionsDto} from "./dtos/university-actions.dto";
import {duplicateWorksheet} from "../worksheet/worksheet.service";
import {Column, OneToMany, OneToOne} from "typeorm";
import {UniversityImportantDatesEntity} from "./model/university-important-dates.entity";
import {ScholarshipEnum} from "./types/scholarship.enum";
import {StudyLanguageEnum} from "./types/study-language.enum";
import {UniversityDegreeEntity} from "./model/university-degree.entity";
import {UniversityAdmissionEntity} from "./model/university-admission.entity";
import {UniversityTuitionCostEntity} from "./model/university-tuition-cost.entity";
import {UniversityCampusInformationEntity} from "./model/university-campus-information.entity";
import {UniversityDiscountScholarshipsEntity} from "./model/university-discount-scholarships.entity";

const universityRepository = dataSource.getRepository(UniversityEntity);

export async function getUniversities(filter: any): Promise<any> {

    const {conditionString, conditionParameters} = generateConditionsForGetUniversities(filter)

    const data = await universityRepository.createQueryBuilder('university')
        .leftJoinAndSelect('university.tuitionCost', 'tuition')
        .leftJoinAndSelect('university.worksheet', 'worksheet')
        .select([
            'university.id as id',
            'university.logo as logo',
            'university.universityName as universityName',
            'tuition.tuitionCost as tuitionCost',
            'university.isVisible as isVisible',
            'university.canApply as canApply',
            'worksheet.id as worksheetId',
        ])
        .where(conditionString, conditionParameters)
        .skip((filter.page - 1) * filter.size)
        .take(filter.size)
        .getRawMany();

    const totalCount = await universityRepository
        .createQueryBuilder('university')
        .where(conditionString, conditionParameters)
        .getCount();

    return {
        data: data,
        totalCount: totalCount
    }
}

export async function getUniversitiesToLanding(filter: any): Promise<any> {
    const {conditionString, conditionParameters} = generateConditionsForGetUniversities(filter, true)

    const data = universityRepository.createQueryBuilder('university')
        .leftJoinAndSelect('university.country', 'country')
        .leftJoinAndSelect('university.eduDegrees', 'eduDegrees')
        .leftJoinAndSelect('eduDegrees.faculties', 'faculties')
        .leftJoinAndSelect('university.tuitionCost', 'tuitionCost')
        .leftJoinAndSelect('university.worksheet', 'worksheet')
        .select([
            'university.id as id',
            'university.isVisible as "isVisible"',
            'university.canApply as "canApply"',
            'university.universityName as universityName',
            'country.name as "universityCountry"',
            'university.state as "universityState"',
            'university.city as "universityCity"',
            'university.logo as logo',
            'university.color as color',
            'university.ratingInformation as "ratingInformation"',
            'university.topRating as topRating',
            'tuitionCost.tuitionCost as cost',
            'worksheet.id as "worksheetId"',
        ])
        .where(conditionString, conditionParameters)
        .groupBy("university.id, country.name, tuitionCost.tuitionCost, worksheet.id")
        .skip((filter.page - 1) * filter.size)
        .take(filter.size)
        .getRawMany();
    // there
    const totalCount = 0 // there Total count

    return data;

}


function generateConditionsForGetUniversities(filter: GetUniversitiesFilterDto, landing = false) {
    let conditionString = 'true '
    let conditionParameters = {}
    if (filter.country) {
        conditionString += 'and university.country = :country '
        conditionParameters['country'] = filter.country
    }
    if (landing) {
        conditionString += 'and university.isVisible '
    }

    if (filter.universityName) {
        conditionString += 'and LOWER(university.universityName) like LOWER(:universityName) '
        conditionParameters['universityName'] = `%${filter.universityName}%`
    }

    if (filter.faculty) {
        conditionString += 'and LOWER(faculties.name) like LOWER(:facultyName) '
        conditionParameters['facultyName'] = `%${filter.faculty}%`
    }

    if (filter.degree) {
        conditionString += 'and eduDegrees.degree = :degree '
        conditionParameters['degree'] = filter.degree
    }
    if (filter.scholarshipType) {
        conditionString += 'and university.scholarshipType = :scholarshipType '
        conditionParameters['scholarshipType'] = filter.scholarshipType
    }
    if (filter.rating) {
        conditionString += 'and university.topRating = :rating '
        conditionParameters['rating'] = filter.rating
    }
    if (filter.minFee) {
        conditionString += 'and tuitionCost.tuitionCost >= :minFee '
        conditionParameters['minFee'] = filter.minFee
    }
    if (filter.maxFee) {
        conditionString += 'and tuitionCost.tuitionCost <= :maxFee '
        conditionParameters['maxFee'] = filter.maxFee
    }

    if (filter.search) {
        conditionString += ' AND (' + // Start of the AND clause
            'country.name ILIKE :search OR ' +
            'CAST(eduDegrees.degree AS TEXT) ILIKE :search OR ' +
            'faculties.name ILIKE :search ' +
            ')'; // End of the AND clause

        conditionParameters['search'] = filter.search;
    }

    return {
        conditionString: conditionString,
        conditionParameters: conditionParameters,
    };
}

export async function getUniversityById(id: string): Promise<UniversityEntity | null> {
    const university = await universityRepository
        .createQueryBuilder('university')
        .leftJoinAndSelect('university.country', 'country')
        .leftJoinAndSelect('university.importantDates', 'importantDates')
        .leftJoinAndSelect('university.admission', 'admission')
        .leftJoinAndSelect('university.campusInformation', 'campusInformation')
        .leftJoinAndSelect('university.scholarships', 'scholarships')
        .leftJoinAndSelect('university.eduDegrees', 'eduDegrees')
        .leftJoinAndSelect('eduDegrees.faculties', 'faculties')
        .leftJoinAndSelect('faculties.specialities', 'specialities')
        .leftJoinAndSelect('university.tuitionCost', 'tuitionCost')
        .leftJoinAndSelect('university.worksheet', 'worksheet')
        .where('university.id = :id', {id})
        .getOne();

    return university
}
export async function getUniversityShortDataById(id: string): Promise<UniversityEntity | null> {
    return await universityRepository
        .createQueryBuilder('university')
        .leftJoinAndSelect('university.country', 'country')
        .where('university.id = :id', {id})
        .getOne()
}

export async function createUniversity(universityDto: CreateUniversityDto) {
    return await universityRepository.save(universityDto);
}

export async function editUniversity(id: string, universityDto: CreateUniversityDto) {
    universityDto.id = id
    return await universityRepository.save(universityDto);
}
export async function duplicateUniversity(id: string) {
    const duplicateUniversity = await getUniversityById(id)
    if (!duplicateUniversity) {
        throw new DOMException("University not exists")
    }
    const duplicateWorksheetId = duplicateUniversity.worksheet?.id
    // @ts-ignore
    delete duplicateUniversity['id']
    duplicateUniversity.universityName += " duplicate"
    duplicateUniversity.isVisible = false
    duplicateUniversity.canApply = false
    duplicateUniversity.worksheet = undefined

    if (duplicateUniversity.importantDates && duplicateUniversity.importantDates.length) {
        duplicateUniversity.importantDates.forEach(date => {
            // @ts-ignore
            delete date['id']
        })
    }
    if (duplicateUniversity.eduDegrees && duplicateUniversity.eduDegrees.length) {
        duplicateUniversity.eduDegrees.forEach(degree => {
            // @ts-ignore
            delete degree['id']
            degree.faculties.forEach(faculty => {
                // @ts-ignore
                delete faculty['id']
                faculty.specialities.forEach(speciality => {
                    // @ts-ignore
                    delete speciality['id']
                })
            })
        })
    }

    if (duplicateUniversity.campusInformation && duplicateUniversity.campusInformation.length) {
        duplicateUniversity.campusInformation.forEach(campus => {
            // @ts-ignore
            delete campus['id']
        })
    }
    if (duplicateUniversity.admission) {
        // @ts-ignore
        delete duplicateUniversity.admission['id']
    }

    if (duplicateUniversity.tuitionCost) {
        // @ts-ignore
        delete duplicateUniversity.tuitionCost['id']
    }
    if (duplicateUniversity.scholarships) {
        // @ts-ignore
        delete duplicateUniversity.scholarships['id']
    }

    const savedUni = await universityRepository.save(duplicateUniversity);
    if (duplicateWorksheetId && savedUni) {
        await duplicateWorksheet(duplicateWorksheetId, savedUni.id)
    }

    return savedUni
}

export async function editUniversityActions(id: string, universityDto: UniversityActionsDto) {
    return await universityRepository.update(id, {
        isVisible: universityDto.isVisible,
        canApply: universityDto.canApply
    });
}

export async function deleteUniversity(id: string) {
    const deleted = await universityRepository.update(id, {
        deactivatedAt: new Date(),
    });
    return !!deleted;
}

