import {
  scrapeAllController,
  scrapeJustJoinItController,
  scrapeNoFluffJobsController,
} from '@jjitfetcher/controllers';
import { Hono } from 'hono';

const api = new Hono();

api.get('/scrape-jj-it', scrapeJustJoinItController);
api.get('/scrape-no-fluff-jobs', scrapeNoFluffJobsController);
api.get('/scrape-all', scrapeAllController);

export const scrapeRouter = api;
