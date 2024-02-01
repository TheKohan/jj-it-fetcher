import { scrapeJJIt } from './jj-it-scraper';
import { ScraperModuleModule } from '../module.config';

export const justJoinItModule: ScraperModuleModule = {
  name: 'No Fluff Job',
  slug: 'no-fluff-job',
  scrape: async prisma => await scrapeJJIt(prisma),
  withLogging: true,
};
