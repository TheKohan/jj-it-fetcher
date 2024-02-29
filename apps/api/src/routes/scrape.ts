import { scrapingController } from '@fetcher-api/controllers';
import { Hono } from 'hono';

const api = new Hono();

const {
  scrapeAllController,
  scrapeJustJoinItController,
  scrapeNoFluffJobsController,
} = scrapingController;

api.get('/scrape-jj-it', scrapeJustJoinItController);
api.get('/scrape-no-fluff-jobs', scrapeNoFluffJobsController);
api.get('/scrape-all', scrapeAllController);

export const scrapeRouter = api;
