import {dataSource} from "../../../database";
import {UniversityCountryEntity} from "./model/university-country.entity";
import {UniversityStateEntity} from "./model/university-state.entity";
import {UniversityFacultyEntity} from "./model/university-faculty.entity";
import {CreateCountryDto} from "./dtos/create-country.dto";
import {CreatStateDto} from "./dtos/create-state.dto";
import {UniversitySpecialityEntity} from "./model/university-speciality.entity";

const universityCountryRepository = dataSource.getRepository(UniversityCountryEntity);
const universityStateRepository = dataSource.getRepository(UniversityStateEntity);
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
    return  await universityStateRepository.find()
}
export async function createUniversitiesState(stateDto: CreatStateDto): Promise<any> {
    return await universityStateRepository.save(stateDto);
}
export async function deleteUniversitiesState(stateId: string): Promise<any> {
    return await universityStateRepository.delete(stateId);
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
