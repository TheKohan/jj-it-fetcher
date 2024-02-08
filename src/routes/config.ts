import { Hono } from 'hono';
import {
  createConfigController,
  getConfigController,
} from '../controllers/config';

const api = new Hono();

api
  .get('/get-config', getConfigController)
  .post('/set-config', createConfigController);

export const configRouter = api;
