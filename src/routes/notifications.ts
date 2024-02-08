import { getTodayNewOffersController } from '@jjitfetcher/controllers';
import { Hono } from 'hono';

const api = new Hono();

api.get('/todays-offers', getTodayNewOffersController);

export const notificationsRouter = api;
