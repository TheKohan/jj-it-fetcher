import { Hono } from 'hono';
import {
  scrapeAllController,
  scrapeJustJoinItController,
  scrapeNoFluffJobsController,
} from '@jjitfetcher/controllers';

const api = new Hono().basePath('/api');

api.get('/scrape-jj-it', scrapeJustJoinItController);
api.get('/scrape-no-fluff-jobs', scrapeNoFluffJobsController);
api.get('/scrape-all', scrapeAllController);

export const apiRouter = api;