import { NextFunction, Request, Response } from 'express';
import { getUserById } from '../domains/user/user.service';
import { UserRoleEnum } from '../domains/user/types/user-role.enum';
import { Unauthorized, NotFound, Forbidden } from 'http-errors';

export function hasRoleMiddleware(role: UserRoleEnum) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.id) {
      throw new Unauthorized('User not logged in');
    }

    const user = await getUserById(req.user.id);

    if (!user) {
      throw new NotFound('No such user exists');
    }
    if (role !== user?.role) {
      throw new Forbidden(`User must have ${role} role`);
    }

    return next();
  };
}
