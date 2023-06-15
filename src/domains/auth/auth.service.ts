import * as jwt from 'jsonwebtoken';
import { config } from '../../config';
import { createUser, getUserByEmail } from '../user/user.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import * as crypto from 'node:crypto';
import { LoginUserDto } from './dtos/login-user.dto';
import { TokenPayloadSchema } from './schemas/token-payload.schema';
import { TokenPayloadType } from './types/token-payload.type';
import { BadRequest } from 'http-errors';

export async function register(userDto: RegisterUserDto) {
  const hashedPassword = hashPwd(userDto.password);

  const user = await createUser({
    email: userDto.email,
    firstName: userDto.firstName,
    lastName: userDto.lastName,
    hashedPassword,
  });

  return user;
}

export async function login(userDto: LoginUserDto) {
  const user = await getUserByEmail(userDto.email);

  if (!user || !validatePassword(userDto.password, user.hashedPassword)) {
    throw new BadRequest('Wrong credentials');
  }

  return generateAccessToken(user.id);
}

export function getTokenPayload(token: string): TokenPayloadType {
  const { user } = TokenPayloadSchema.parse(
    jwt.verify(token, config.jwt.secret)
  );

  return { user };
}

function generateAccessToken(userId: number): { token: string } {
  const tokenPayload: TokenPayloadType = {
    user: {
      id: userId,
    },
  };

  const token = jwt.sign(tokenPayload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });

  return { token };
}

function validatePassword(password: string, comparedHashedPwd: string) {
  const hashedPwd = hashPwd(password);
  return comparedHashedPwd === hashedPwd;
}

function hashPwd(pwd: string) {
  return crypto
    .pbkdf2Sync(pwd, config.pwd.salt, 100, 64, 'sha256')
    .toString(`hex`);
}
