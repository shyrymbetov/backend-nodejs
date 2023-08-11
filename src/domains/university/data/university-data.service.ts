import {dataSource} from "../../../database";
import {UniversityCountryEntity} from "./model/university-country.entity";
import {UniversityFacultyEntity} from "./model/university-faculty.entity";
import {CreateCountryDto} from "./dtos/create-country.dto";
import {UniversitySpecialityEntity} from "./model/university-speciality.entity";
import {UniversityEntity} from "../model/university.entity";

const universityRepository = dataSource.getRepository(UniversityEntity);
const universityCountryRepository = dataSource.getRepository(UniversityCountryEntity);
const universityFacultyRepository = dataSource.getRepository(UniversityFacultyEntity);
const universitySpecialityRepository = dataSource.getRepository(UniversitySpecialityEntity);

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
