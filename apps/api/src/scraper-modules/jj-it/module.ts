import type { ScraperModuleModule } from '../module.config';
import { scrapeJJIt } from './jj-it-scraper';

export const justJoinItModule: ScraperModuleModule = {
  name: 'Just Join It',
  slug: 'just-join-it',
  scrape: async prisma => await scrapeJJIt(prisma),
  withLogging: true,
};
