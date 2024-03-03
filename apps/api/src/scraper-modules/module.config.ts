import type { Prisma, PrismaClient } from "@prisma-client";
import { justJoinItModule } from ".";
import { noFluffJobsModule } from "./no-fluff-jobs/module";

export type ScraperModuleModule = {
  name: string;
  slug: string;
  scrape: (
    prismaClient: PrismaClient
  ) => Promise<Prisma.B2BOfferCreateManyInput[]>;
  withLogging: boolean;
};

export const scraperModules = [justJoinItModule, noFluffJobsModule] as const;
