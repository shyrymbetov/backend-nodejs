import {dataSource} from '../../database';
import {UniversityEntity} from './model/university.entity';
import {CreateUniversityDto} from "./dtos/create-university.dto";
import {GetUniversitiesFilterDto} from "./dtos/get-univerties-params.dto";
import {UniversityActionsDto} from "./dtos/university-actions.dto";
import {BadGateway} from "http-errors";

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
    const {conditionString, conditionParameters} = generateConditionsForGetUniversities(filter)

    const data = universityRepository.createQueryBuilder('university')
        .leftJoinAndSelect('university.country', 'country')
        .leftJoinAndSelect('university.eduDegrees', 'eduDegrees')
        .leftJoinAndSelect('eduDegrees.faculties', 'faculties')
        .leftJoinAndSelect('university.tuitionCost', 'tuitionCost')
        .leftJoinAndSelect('university.worksheet', 'worksheet')
        .select([
            'university.id as id',
            'university.universityName as universityName',
            'country.name as universityCountry',
            'university.state as universityState',
            'university.city as universityCity',
            'university.logo as logo',
            'university.color as color',
            'university.ratingInformation as ratingInformation',
            'university.topRating as topRating',
            'tuitionCost.tuitionCost as cost',
        ])
        .where(conditionString, conditionParameters)
        .skip((filter.page - 1) * filter.size)
        .take(filter.size)
        .getRawMany();
    // there
    const totalCount = 0 // there Total count

    return data;

}


function generateConditionsForGetUniversities(filter: GetUniversitiesFilterDto) {
    let conditionString = 'true '
    let conditionParameters = {}
    if (filter.country) {
        conditionString += 'and university.country = :country '
        conditionParameters['country'] = filter.country
    }

    if (filter.universityName) {
        conditionString += 'and LOWER(university.universityName) like LOWER(:universityName) '
        conditionParameters['universityName'] = `%${filter.search}%`
    }

    if (filter.faculty) {
        conditionString += 'and LOWER(faculties.name) like LOWER(:facultyName) '
        conditionParameters['facultyName'] = `%${filter.faculty}%`
    }

    if (filter.degree) {
        conditionString += 'and LOWER(eduDegrees.degree) like LOWER(:degree) '
        conditionParameters['degree'] = `%${filter.degree}%`
    }
    if (filter.scholarshipType) {
        conditionString += 'and LOWER(university.scholarshipType) = LOWER(:scholarshipType) '
        conditionParameters['scholarshipType'] = filter.scholarshipType.toString()
    }
    if (filter.rating) {
        conditionString += 'and LOWER(university.rating) = LOWER(:facultyName) '
        conditionParameters['rating'] = filter.rating.toString()
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
        conditionString += 'and (' +
            'country.name ILIKE :search ' +
            'OR CAST(eduDegrees.degree AS TEXT) ILIKE :search' +
            'OR faculties.name ILIKE :search ) '
        conditionParameters['search'] = `%${filter.search}%`
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
        .leftJoinAndSelect('university.tuitionCost', 'tuitionCost')
        .leftJoinAndSelect('university.worksheet', 'worksheet')
        .where('university.id = :id', {id})
        .getOne();

    return university
}

export async function createUniversity(universityDto: CreateUniversityDto) {
    return await universityRepository.save(universityDto);
}

export async function editUniversity(id: string, universityDto: CreateUniversityDto) {
    universityDto.id = id
    return await universityRepository.save(universityDto);
}

export async function editUniversityActions(id: string, universityDto: UniversityActionsDto) {
    return await universityRepository.update(id, {
        isVisible: universityDto.isVisible,
        canApply: universityDto.canApply
    });
}

export async function deleteUniversity(id: string) {
    return await universityRepository.delete(id);
}

