import { scrapeJJIt } from './jj-it-scraper';
import { Module } from '../module.config';

export const justJoinItModule: Module = {
  name: 'No Fluff Job',
  slug: 'no-fluff-job',
  scrape: async prisma => await scrapeJJIt(prisma),
  withLogging: true,
};
