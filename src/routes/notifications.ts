import { notificationController } from '@jjitfetcher/controllers';
import { Hono } from 'hono';

const api = new Hono();

const { getTodayNewOffersController } = notificationController;

api.get('/todays-offers', getTodayNewOffersController);

export const notificationsRouter = api;
