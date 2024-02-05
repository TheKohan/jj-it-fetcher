import { ScraperModuleModule } from '../module.config';
import { scrapeNoFluffJobs } from './no-fluff-jobs-scraper';

export const noFluffJobsModule: ScraperModuleModule = {
  name: 'No Fluff Job',
  slug: 'no-fluff-job',
  scrape: async prisma => await scrapeNoFluffJobs(prisma),

  withLogging: true,
};
