import {Router} from "express";
import {isAuthenticatedMiddleware} from "../../middlewares/is-authenticated.middleware";
import {
    createStudentHandler,
    editStudentExpertHandler,
    editStudentHandler, editStudentOrientatorHandler,
    getStudentHandler,
    getStudentsHandler
} from "./student.controller";
import {hasRoleMiddleware} from "../../middlewares/has-role.middleware";
import {UserRoleEnum} from "../user/types/user-role.enum";

export const studentRouter = Router();
studentRouter.route('/')
    .get(isAuthenticatedMiddleware, getStudentsHandler)
    .post(isAuthenticatedMiddleware, createStudentHandler)
;

studentRouter.route('edit-orientator')
    .patch(isAuthenticatedMiddleware, hasRoleMiddleware(UserRoleEnum.MasterExpert), editStudentOrientatorHandler);

studentRouter.route('edit-expert')
    .patch(isAuthenticatedMiddleware, hasRoleMiddleware(UserRoleEnum.MasterExpert), editStudentExpertHandler);

//TODO add middleware for expert orientator master-expert
studentRouter.route('/:id')
    .get(isAuthenticatedMiddleware, getStudentHandler)
    .patch(isAuthenticatedMiddleware, editStudentHandler)
;


