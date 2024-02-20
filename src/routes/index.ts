import { Hono } from 'hono';
import { notificationsRouter } from './notifications';
import { scrapeRouter } from './scrape';

const api = new Hono();

api.route('/notifications/', notificationsRouter);
api.route('/scraping/', scrapeRouter);

export const apiRouter = api;
