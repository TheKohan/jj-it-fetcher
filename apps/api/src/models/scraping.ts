import {
  justJoinItModule,
  noFluffJobsModule,
  scraperModules,
} from "@fetcher-api/modules";
import { baseMessageEmbeds } from "@fetcher-api/utils";
import prisma from "../db-client";
import { serviceLogger } from "../logger";

const scrapeJJitToDB = () => justJoinItModule.scrape(prisma);
const scrapeNoFluffJobsToDB = () => noFluffJobsModule.scrape(prisma);
const scrapeAllToDB = async () => {
  const infoEmbed = baseMessageEmbeds
    .info()
    .setDescription("Scrapped services: ");

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

  await serviceLogger.sendInfoMessage({ message: () => infoEmbed });
};

export const scrapingModel = {
  scrapeJJitToDB,
  scrapeNoFluffJobsToDB,
  scrapeAllToDB,
};
