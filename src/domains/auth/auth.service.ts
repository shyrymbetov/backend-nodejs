import * as jwt from 'jsonwebtoken';
import {config} from '../../config';
import {
    createUser,
    existUserByEmail,
    getMasterExpert,
    getRoleByType,
    getUserByEmail,
    updateUserPassword
} from '../user/user.service';
import {RegisterUserDto} from './dtos/register-user.dto';
import * as crypto from 'node:crypto';
import {LoginUserDto} from './dtos/login-user.dto';
import {TokenPayloadSchema} from './schemas/token-payload.schema';
import {TokenPayloadType} from './types/token-payload.type';
import {UserRoleEnum} from '../user/types/user-role.enum';
import {BadRequest} from "http-errors";

export async function register(userDto: RegisterUserDto) {
    const hashedPassword = hashPwd(userDto.password);
    const masterId = await getMasterExpert();
    const role: UserRoleEnum = getRoleByType(userDto.type)

    console.log(role)
    console.log(userDto.type)
    let user = {
        email: userDto.email,
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        birthDate: new Date(Date.parse(userDto.birthDate)),
        regionId: userDto.regionId,
        phone: userDto.phone,
        localId: userDto.localId,
        school: userDto.school ?? null,
        class: userDto.class ?? null,
        masterId: masterId,
        hashedPassword: hashedPassword,
        role: role,
    }

    return await createUser(user);
}

export async function registerWithReferralLink(referralLink: string, userDto: LoginUserDto) {
    const hashedPassword = hashPwd(userDto.password);

    const updated = await updateUserPassword({
        email: userDto.email,
        password: hashedPassword,
    });
    return updated ? updated : null;
}

export async function emailCheck(email: string) {
    return await existUserByEmail(email);
}

export async function login(userDto: LoginUserDto) {
    const user = await getUserByEmail(userDto.email);

    if (!user || !validatePassword(userDto.password, user.hashedPassword)) {
        throw new BadRequest('Wrong credentials');
    }

    return generateAccessToken(user.id);
}

export function getTokenPayload(token: string): TokenPayloadType {
    const {user} = TokenPayloadSchema.parse(
        jwt.verify(token, config.jwt.secret)
    );

    return {user};
}

function generateAccessToken(userId: string): { token: string } {
    const tokenPayload: TokenPayloadType = {
        user: {
            id: userId,
        },
    };

    const token = jwt.sign(tokenPayload, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
    });

    return {token};
}

function validatePassword(password: string, comparedHashedPwd: string | null) {
    const hashedPwd = hashPwd(password);
    return comparedHashedPwd && comparedHashedPwd === hashedPwd;
}

function hashPwd(pwd: string) {
    return crypto
        .pbkdf2Sync(pwd, config.pwd.salt, 100, 64, 'sha256')
        .toString(`hex`);
}
