import { NextFunction, Request, Response } from 'express';
import { getTokenPayload } from '../domains/auth/auth.service';
import { Unauthorized, BadRequest } from 'http-errors';

export function isAuthenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  // remove 'Bearer ' part
  const token = authHeader && authHeader.split('Bearer ')[1];

  if (!token) throw new Unauthorized();

  try {
    const { user } = getTokenPayload(token);
    req.user = user;
  } catch (err) {
    console.error(err);

    throw new BadRequest('Invalid authorization token');
  }

  return next();
}
