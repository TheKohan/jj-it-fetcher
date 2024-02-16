import {
  justJoinItModule,
  noFluffJobsModule,
  scraperModules,
} from '@jjitfetcher/modules';
import { baseMessageEmbeds } from '@jjitfetcher/utils';
import prisma from '../db-client';
import { discordLogger } from '../logger';

const scrapeJJitToDB = () => justJoinItModule.scrape(prisma);
const scrapeNoFluffJobsToDB = () => noFluffJobsModule.scrape(prisma);
const scrapeAllToDB = async () => {
  const infoEmbed = baseMessageEmbeds
    .info()
    .setDescription('Scrapped services: ');

  for (const module of scraperModules) {
    const offers = await module.scrape(prisma);
    console.log(`${module.name} scrapped with:  ${offers.length} offers`);
    if (module.withLogging) {
      infoEmbed.addFields([
        {
          name: `${module.name} scrapped offers:`,
          value: `${offers.length}`,
        },
      ]);
    }
  }

  await discordLogger.sendInfoMessage({ message: () => infoEmbed });
};

export const scrapingModel = {
  scrapeJJitToDB,
  scrapeNoFluffJobsToDB,
  scrapeAllToDB,
};
