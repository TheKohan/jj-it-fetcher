import { baseMessageEmbeds } from './discord-logger';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import cron from 'node-cron';
import { HTTPException } from 'hono/http-exception';
import { scraperModules } from './scraper-modules/module.config';
import prisma from './db-client';
import { discordLogger } from './logger';
import { apiRouter } from '@jjitfetcher/routes';

const { PORT } = process.env;

const app = new Hono();

app.use('*', logger());
app.route('/', apiRouter);

/**
 * Setup Cron Jobs.
 */

cron.schedule(
  '0 1 * * *',
  async () => {
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
  },
  { name: 'SCRAPE_CRON_JOB' }
);

/**
 * Lifecycle Listeners.
 */

app.onError(async (err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  try {
    console.log(err);
    await discordLogger.sendErrorMessage({
      message: embed =>
        embed.setDescription(
          'JJ-IT-FETCHER has crashed unexpected: ' + err.message
        ),
    });
  } catch (e) {
    console.log(e);
  }
  return c.text('Failed', 500);
});

/**
 * Start server.
 */

console.log('Server starting on port: ', PORT);

export default {
  port: +PORT,
  fetch: app.fetch,
};
