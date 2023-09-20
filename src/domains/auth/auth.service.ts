import * as jwt from 'jsonwebtoken';
import {config} from '../../config';
import {
    createUser,
    existUserByEmail,
    getMasterExpert,
    getRoleByType,
    getUserByEmailWithPassword,
    getUserById,
    updateUserPassword
} from '../user/user.service';
import {RegisterUserDto} from './dtos/register-user.dto';
import * as crypto from 'node:crypto';
import {LoginUserDto} from './dtos/login-user.dto';
import {TokenPayloadSchema} from './schemas/token-payload.schema';
import {TokenPayloadType} from './types/token-payload.type';
import {UserRoleEnum} from '../user/types/user-role.enum';
import {BadRequest, Forbidden} from "http-errors";
import {deactivatePasswordChangeLink} from "./user-action-link.service";
import {RegisterUserType} from "./types/register-user.type";
import {VerifyOrChangePwdDto} from "./dtos/verify-change.dto";


export async function changeUserPasswordByLink(pwdChangeId: string, userDto: VerifyOrChangePwdDto) {
    const userId = await deactivatePasswordChangeLink(pwdChangeId)
    let updated

    if (userId) {
        const hashedPassword = hashPwd(userDto.password);
        updated = await updateUserPassword({
            userId: userId,
            hashedPassword: hashedPassword,
        });
    }

    return updated;
}

export async function register(userDto: RegisterUserType | RegisterUserDto) {
    const hashedPassword = hashPwd(userDto.password);
    const masterId = await getMasterExpert();
    const role: UserRoleEnum = getRoleByType(userDto.type)


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
        masterId: userDto['masterId'] ? userDto['masterId'] : masterId,
        orientatorId: userDto['orientatorId'] ?? null,
        hashedPassword: hashedPassword,
        role: role,
    }

    return await createUser(user);
}

export async function registerWithReferralLink(userId: string, userDto: RegisterUserDto) {
    const user = await getUserById(userId)
    let newUser = { ...userDto }
    if (!user) {
        return;
    }
    if (user?.role == UserRoleEnum.Orientator) {
        newUser['orientatorId'] = user.id
    }
    if (user?.role == UserRoleEnum.Expert
        || user?.role == UserRoleEnum.MasterExpert) {
        newUser['masterId'] = user.id
    }

    return register({...userDto});
}

export async function emailCheck(email: string) {
    return await existUserByEmail(email);
}

export async function login(userDto: LoginUserDto) {
    const user = await getUserByEmailWithPassword(userDto.email);

    if (!user || !validatePassword(userDto.password, user.hashedPassword)) {
        throw new BadRequest('Wrong credentials');
    }
    else if (!user.verified) {
        throw new Forbidden('Email not verified');
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
