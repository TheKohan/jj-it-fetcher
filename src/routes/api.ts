import {
  getTodayNewOffersController,
  scrapeAllController,
  scrapeJustJoinItController,
  scrapeNoFluffJobsController,
} from '@jjitfetcher/controllers';
import { Hono } from 'hono';

const api = new Hono().basePath('/api');

api.get('/scrape-jj-it', scrapeJustJoinItController);
api.get('/scrape-no-fluff-jobs', scrapeNoFluffJobsController);
api.get('/scrape-all', scrapeAllController);
api.get('/todays-offers', getTodayNewOffersController);

export const apiRouter = api;
