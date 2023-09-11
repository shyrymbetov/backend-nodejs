import './process';
import * as dotenv from 'dotenv';

dotenv.config();

import * as express from 'express';
import * as cors from 'cors';
import { addRoutes } from './routes';
import { config } from './config';
import { connectToDatabase } from './database';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware';
import * as http from "http";
import {WebSocket} from 'ws';
import * as websocket from './sockets/websocket.service';
import {Request} from "express";
import {isAuthenticatedMiddleware} from "./middlewares/is-authenticated.middleware";
import {isAuthenticated} from "./middlewares/is-authenticated";

const app = express();


app.use(express.json());
app.use(cors(config.api.cors));

addRoutes(app);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = config.api.socket_port || 3333;
server.listen(PORT, () => {
  console.log(`⚡️[ws]: Socket Server is running on port ${PORT}`);
});

wss.on('connection', (ws) => {
  console.log('WebSocket connection established');

  websocket.addUserOnline(ws);
});

app.use(errorHandlerMiddleware);

app.listen(config.api.port, async () => {
  console.log(`⚡️[server]: Server listening on port ${config.api.port}`);
  await connectToDatabase();
});

