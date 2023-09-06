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

        if (applicationStatus == "DRAFT"){
            if (role == "orientator"){
                return next()
            }
            else if (["student", "schoolboy"].includes(role)){
                if (user.id == application.studentId){
                    return next()
                } else {
                    return res.status(405).send('Method Not Allowed');
                }
            } else {
                return res.status(405).send('Method Not Allowed');
            }
        } else {
            if (["admin", "expert", "master-expert"].includes(role)) {
                return next()
            } else {
                res.status(405).send('Method Not Allowed');
            }
        }

        console.log(applicationStatus)

    } catch (err) {
        console.error(err);

        throw new BadRequest('something get wrong');
    }

    return next();
}
