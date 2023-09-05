import { Router } from 'express';
import { isAuthenticatedMiddleware } from '../../middlewares/is-authenticated.middleware';
import {getFileHandler, uploadFileHandler, uploadFilesHandler} from "./file.controller";
const multer = require("multer");
const upload = multer({ dest: "uploads" });


export const fileRouter = Router();
fileRouter.route('/single').post(isAuthenticatedMiddleware, upload.single("file"), uploadFileHandler);
fileRouter.route('/multi').post(isAuthenticatedMiddleware, upload.array("files"), uploadFilesHandler);
fileRouter.route('/:id').get(getFileHandler);
