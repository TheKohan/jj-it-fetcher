import { configController } from '@jjitfetcher/controllers';
import { Hono } from 'hono';

const api = new Hono();

const { getConfigController, createConfigController } = configController;

api
  .get('/get-config', getConfigController)
  .post('/set-config', createConfigController);

export const configRouter = api;
