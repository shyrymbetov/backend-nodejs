import { getTokenPayload } from '../domains/auth/auth.service';
import { Unauthorized, BadRequest } from 'http-errors';

export function isAuthenticated(token: string| undefined) {
  if (!token) throw new Unauthorized();
  try {
    const { user } = getTokenPayload(token);
    console.log(user)
    return user['id'];
  } catch (err) {
    console.error(err);
    throw new BadRequest('Invalid authorization token');
  }
}
