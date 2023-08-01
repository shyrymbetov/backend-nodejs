import { Router } from 'express';
import { isAuthenticatedMiddleware } from '../../middlewares/is-authenticated.middleware';
import {getFileHandler, uploadFilesHandler} from "./file.controller";
const multer = require("multer");
const upload = multer({ dest: "uploads" });


export const fileRouter = Router();
fileRouter.route('/').post(isAuthenticatedMiddleware, upload.single("file"), uploadFilesHandler);
fileRouter.route('/:id').get(isAuthenticatedMiddleware, getFileHandler);
