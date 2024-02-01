import { scrapeJJIt } from './jj-it-scraper';
import { ScraperModuleModule } from '../module.config';

export const justJoinItModule: ScraperModuleModule = {
  name: 'Just Join It',
  slug: 'just-join-it',
  scrape: async prisma => await scrapeJJIt(prisma),
  withLogging: true,
};
