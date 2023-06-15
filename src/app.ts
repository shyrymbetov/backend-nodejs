import * as dotenv from 'dotenv';
dotenv.config();

import * as express from 'express';
import { config } from './config';
import { connectToDatabase } from './database';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware';
import { addRoutes } from './routes';

const app = express();

app.use(express.json());

addRoutes(app);

app.use(errorHandlerMiddleware);

app.listen(config.api.server.port, async () => {
  console.log(
    `⚡️[server]: Server listening on port ${config.api.server.port}`
  );
  connectToDatabase();
});
