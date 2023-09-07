import {dataSource} from "../../../database";
import {UniversityCountryEntity} from "./model/university-country.entity";
import {UniversityFacultyEntity} from "./model/university-faculty.entity";
import {CreateCountryDto} from "./dtos/create-country.dto";
import {UniversitySpecialityEntity} from "./model/university-speciality.entity";
import {UniversityEntity} from "../model/university.entity";
import {UniversityDegreeEntity} from "../model/university-degree.entity";
import {UniversityImportantDatesEntity} from "../model/university-important-dates.entity";

const universityRepository = dataSource.getRepository(UniversityEntity);
const universityCountryRepository = dataSource.getRepository(UniversityCountryEntity);
const universityFacultyRepository = dataSource.getRepository(UniversityFacultyEntity);
const universitySpecialityRepository = dataSource.getRepository(UniversitySpecialityEntity);
const universityEduDegreeRepository = dataSource.getRepository(UniversityDegreeEntity);
const universityImportantDayRepository = dataSource.getRepository(UniversityImportantDatesEntity);

export async function getUniversitiesCountry(filter: any): Promise<any> {
    // const { conditionString, conditionParameters } = generateConditionsForGetUniversities(filter)
    return  await universityCountryRepository.find()
}
export async function createUniversitiesCountry(countryDto: CreateCountryDto): Promise<any> {
    return await universityCountryRepository.save(countryDto);
}
export async function deleteUniversitiesCountry(countryId: string): Promise<any> {
    return await universityCountryRepository.delete(countryId);
}
export async function getUniversitiesState(filter: any): Promise<any> {
    return await universityRepository
        .createQueryBuilder('university')
        .select('DISTINCT(university.state)', 'state')
        .getRawMany()
}

export async function getUniversitiesFaculty(filter: any): Promise<any> {
    // const { conditionString, conditionParameters } = generateConditionsForGetUniversities(filter)
    return await universityFacultyRepository
        .createQueryBuilder('faculty')
        .select('DISTINCT(faculty.name)', 'name')
        .getRawMany()
}
export async function getUniversitiesSpecialities(filter: any): Promise<any> {

    // const { conditionString, conditionParameters } = generateConditionsForGetUniversities(filter)

    return await universitySpecialityRepository
        .createQueryBuilder('speciality')
        .select('DISTINCT(speciality.name)', 'name')
        .getRawMany()
}

export async function getEduDegreeById(id: string): Promise<any> {
    return await universityEduDegreeRepository.findOneBy({ id: id });
}

export async function getFacultyById(id: string): Promise<any> {
    return await universityFacultyRepository.findOneBy({ id: id });
}

export async function getImportantDayById(id: string): Promise<any> {
    return await universityImportantDayRepository.findOneBy({ id: id });
}

export async function getSpecialityById(id: string): Promise<any> {
    return await universitySpecialityRepository.findOneBy({ id: id });
}

