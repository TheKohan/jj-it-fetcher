import { PrismaClient } from '@prisma/client';

import { WebhookClient } from 'discord.js';
import { DiscordLogger } from './discord-logger';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import cron from 'node-cron';
import { HTTPException } from 'hono/http-exception';
import { justJoinItModule, noFluffJobsModule } from './scraper-modules';
import { modules } from './scraper-modules/module.config';

const { PORT, DATABASE_URL, DISCORD_WEBHOOK_URL } = process.env;

/**
 * Initialize.
 */

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
});

const webhookClient = new WebhookClient({ url: DISCORD_WEBHOOK_URL });
const discordLogger = new DiscordLogger(webhookClient);

const app = new Hono();

app.use('*', logger());

/**
 * Setup routes.
 */

app.get('/scrape-jj-it', async c => {
  await justJoinItModule.scrape(prisma);
  return c.text('Scraped JJIT Successfully');
});
app.get('/scrape-no-fluff-jobs', async c => {
  await noFluffJobsModule.scrape(prisma);
  return c.text('Scraped No Fluff Job Successfully');
});

/**
 * Setup Cron Jobs.
 */

cron.schedule(
  '0 1 * * *',
  async () => {
    modules.forEach(async module => {
      const offers = await module.scrape(prisma);
      if (module.withLogging) {
        if (offers.length) {
          await discordLogger.sendInfoMessage({
            message: embed =>
              embed
                .setDescription(`${module.name} has been scraped: `)
                .addFields([
                  { name: 'Offers Scraped', value: offers.length + '' },
                ]),
          });
        } else {
          await discordLogger.sendWarningMessage({
            message: embed =>
              embed.setDescription(
                `${module.name} has been scraped and no data has been returned`
              ),
          });
        }
      }
    });
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
