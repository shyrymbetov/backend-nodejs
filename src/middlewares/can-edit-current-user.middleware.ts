import { UserRoleEnum } from '../domains/user/types/user-role.enum';
import {NextFunction, Request, Response} from "express";
import { Forbidden, NotFound, Unauthorized} from "http-errors";
import {getUserById} from "../domains/user/user.service";

const studentManagerRoles = [UserRoleEnum.Student, UserRoleEnum.Admin, UserRoleEnum.Schoolboy]

export async function canEditCurrentUserMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.user?.id) {
        throw new Unauthorized('User not logged in');
    }

    const user = await getUserById(req.user.id);

    if (!user) {
        throw new NotFound('No such user exists');
    }
    if (!studentManagerRoles.some(role => role == user?.role)) {
        throw new Forbidden(`User must have access`);
    }

    return next();
}

