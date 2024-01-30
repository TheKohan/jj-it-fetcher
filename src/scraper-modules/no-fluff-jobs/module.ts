import { scrapeNoFluffJobs } from './no-fluff-jobs-scraper';
import { Module } from '../module.config';

export const noFluffJobsModule: Module = {
  name: 'No Fluff Job',
  slug: 'no-fluff-job',
  scrape: async prisma => await scrapeNoFluffJobs(prisma),

  withLogging: true,
};
