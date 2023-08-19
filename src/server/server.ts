import express from 'express';
import './shared/services/TranslationsYup';
import { routes } from './router/routes';
import 'dotenv/config';

const server = express();

server.use(express.json());
server.use(routes);

export { server };
