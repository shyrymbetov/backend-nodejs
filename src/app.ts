import * as dotenv from 'dotenv';

dotenv.config();

import * as express from 'express';
import * as cors from 'cors';
import { addRoutes } from './routes';
import { config } from './config';
import { connectToDatabase } from './database';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware';
import { env } from './env';

const app = express();

app.use(express.json());
app.use(cors(config.api.cors))
addRoutes(app);

app.use(errorHandlerMiddleware);

app.listen(config.api.server.port, async () => {
  console.log(
    `⚡️[server]: Server listening on port ${config.api.server.port}`
  );
  await connectToDatabase();
});
