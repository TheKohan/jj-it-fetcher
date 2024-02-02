import { Handler } from 'hono';
import prisma from '../db-client';
import { baseMessageEmbeds } from '@jjitfetcher/discord-logger';
import {
  justJoinItModule,
  noFluffJobsModule,
  scraperModules,
} from '@jjitfetcher/modules';
import { discordLogger } from '../logger';

export const scrapeJustJoinItController: Handler = async c => {
  await justJoinItModule.scrape(prisma);
  return c.text('Scraped JJIT Successfully');
};

export const scrapeNoFluffJobsController: Handler = async c => {
  await noFluffJobsModule.scrape(prisma);
  return c.text('Scraped No fluff Jobs Successfully');
};
export const scrapeAllController: Handler = async c => {
  await scrapeAll();
  return c.text('Scraped all modules successfully');
};

export const scrapeAll = async () => {
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
          value: offers.length + '',
        },
      ]);
    }
  }

  await discordLogger.sendInfoMessage({ message: () => infoEmbed });
};
