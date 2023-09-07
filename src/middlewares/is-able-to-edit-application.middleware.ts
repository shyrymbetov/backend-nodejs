import { NextFunction, Request, Response } from 'express';
import { Unauthorized, BadRequest } from 'http-errors';
import {getUserById} from "../domains/user/user.service";
import {getApplicationById} from "../domains/application/application.service";


export async function isAbleToEditApplication(
    req: Request,
    res: Response,
    next: NextFunction
) {

    var role;
    var applicationStatus;
    var application;
    var user;

    try {
        user = await getUserById(req.user!.id)
        role = user.role
        application = await getApplicationById(req.params.id)
        applicationStatus = application.applicationStatus

        if (applicationStatus != "DRAFT" && ["admin", "expert", "master-expert"].includes(role)){
            return next()
        } else if (role == "orientator"){
            return next()
        } else if (["student", "schoolboy"].includes(role) && user.id == application.studentId){
            return next()
        }

        return res.status(405).send('Method Not Allowed');
    } catch (err) {
        console.error(err);

        throw new BadRequest('something get wrong');
    }

    return next();
}
