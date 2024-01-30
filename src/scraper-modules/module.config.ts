import { PrismaClient, Prisma } from '@prisma/client';
import { noFluffJobsModule } from './no-fluff-jobs/module';
import { justJoinItModule } from '.';

export type Module = {
  name: string;
  slug: string;
  scrape: (
    prismaClient: PrismaClient
  ) => Promise<Prisma.B2BOfferCreateManyInput[]>;
  withLogging: boolean;
};

export const modules = [justJoinItModule, noFluffJobsModule] as const;
