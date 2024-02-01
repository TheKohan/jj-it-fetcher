import { PrismaClient, Prisma } from '@prisma-client';
import { noFluffJobsModule } from './no-fluff-jobs/module';
import { justJoinItModule } from '.';

export type ScraperModuleModule = {
  name: string;
  slug: string;
  scrape: (
    prismaClient: PrismaClient
  ) => Promise<Prisma.B2BOfferCreateManyInput[]>;
  withLogging: boolean;
};

export const scraperModules = [justJoinItModule, noFluffJobsModule] as const;
