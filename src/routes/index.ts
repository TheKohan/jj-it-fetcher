import { Hono } from 'hono';
import { configRouter } from './config';
import { notificationsRouter } from './notifications';
import { scrapeRouter } from './scrape';

const api = new Hono().basePath('/api');

api.route('/notifications/', notificationsRouter);
api.route('/scraping/', scrapeRouter);
api.route('/config/', configRouter);

export const apiRouter = api;
