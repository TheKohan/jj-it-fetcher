import { Application, Router } from 'oak';
import { load } from 'dotenv';
import { errorHandler } from './middlewares/index.ts';
import { scrapeJJIt } from './scraper-modules/jj-it/index.ts';

import { type PrismaClient } from './generated/client/index.d.ts';
import { createRequire } from 'node:module';
import { scrapeNoFluffJobs } from './scraper-modules/index.ts';
const require = createRequire(import.meta.url);
const Prisma = require('./generated/client/index.js');
import { WebhookClient } from 'discord.js';
import { DiscordLogger } from './discord-logger/index.ts';

const { PORT, DATABASE_URL, DISCORD_WEBHOOK_URL } = await load();

/**
 * Initialize.
 */

const prisma: PrismaClient = new Prisma.PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
});

const webhookClient = new WebhookClient({ url: DISCORD_WEBHOOK_URL });
const discordLogger = new DiscordLogger(webhookClient);

const app = new Application();
const router = new Router();

/**
 * Setup routes.
 */

router.get('/scrape-jj-it', async ({ response }) => {
  const data = await scrapeJJIt(prisma);
  response.body = data;
});
router.get('/scrape-no-fluff-jobs', async ({ response }) => {
  const data = await scrapeNoFluffJobs(prisma);
  response.body = data;
});

/**
 * Setup middleware.
 */

app.use(router.routes());
app.use(router.allowedMethods());
app.use(errorHandler);

/**
 * Setup Cron Jobs.
 */

Deno.cron('JJ-IT-CRON-JOB', '0 1 * * *', async () => {
  const offers = await scrapeJJIt(prisma);
  if (offers.data.length) {
    await discordLogger.sendInfoMessage({
      message: embed =>
        embed
          .setDescription('Just Join IT Api has been scraped:')
          .addFields([
            { name: 'Offers Scraped', value: offers.data.length + '' },
          ]),
    });
  } else {
    await discordLogger.sendWarningMessage({
      message: embed =>
        embed.setDescription(
          'Just Join IT Api has been scraped and no data has been returned'
        ),
    });
  }
});

Deno.cron('NO-FLUFF-JOBS-CRON-JOB', '05 1 * * *', async () => {
  const offers = await scrapeNoFluffJobs(prisma);
  if (offers.data.length) {
    await discordLogger.sendInfoMessage({
      message: embed =>
        embed
          .setDescription('Just Join IT Api has been scraped:')
          .addFields([
            { name: 'Offers Scraped', value: offers.data.length + '' },
          ]),
    });
  } else {
    await discordLogger.sendWarningMessage({
      message: embed =>
        embed.setDescription(
          'Just Join IT Api has been scraped and no data has been returned'
        ),
    });
  }
});

/**
 * Lifecycle Listeners.
 */

app.addEventListener('listen', () =>
  console.log(`Server listening on ${PORT}`)
);

app.addEventListener('error', async e => {
  console.log(`Caught error: ${e.message}`);
  try {
    await discordLogger.sendErrorMessage({
      message: embed =>
        embed.setDescription(
          'JJ-IT-FETCHER has crashed unexpected: ' + e.message
        ),
    });
  } catch (e) {
    console.log(e);
  }
});

/**
 * Start server.
 */

await app.listen({ port: +PORT });
