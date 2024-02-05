import { Hono } from 'hono';
import { logger } from 'hono/logger';
import cron from 'node-cron';
import { HTTPException } from 'hono/http-exception';
import { discordLogger } from './logger';
import { apiRouter } from '@jjitfetcher/routes';
import { getTodayNewOffers, scrapeAll } from './controllers';

const { PORT } = process.env;

const app = new Hono();

app.use('*', logger());
app.route('/', apiRouter);

/**
 * Setup Cron Jobs.
 */

cron.schedule('0 1 * * *', scrapeAll, { name: 'SCRAPE_CRON_JOB' });
cron.schedule('0 9 * * *', getTodayNewOffers, {
  name: 'NEW_OFFER_NOTIFICATION_JOB',
});

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

app.notFound(async c => {
  return c.text('Page not found', 404);
});

/**
 * Start server.
 */

console.log('Server starting on port: ', PORT);

export default {
  port: +PORT,
  fetch: app.fetch,
};
