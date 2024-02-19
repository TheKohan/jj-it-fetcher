import { apiRouter } from '@jjitfetcher/routes';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'hono/logger';
import cron from 'node-cron';
import { z } from 'zod';
import { discordLogger } from './logger';
import { authMiddleware } from './middlewares';
import { authRouter } from './routes/auth';
import {
  configService,
  notificationService,
  offersService,
  scrapingService,
} from './services';

const { PORT } = process.env;

const app = new Hono();

app.use('*', logger());
app.route('/auth/', authRouter);

app.use('/api/*', authMiddleware);
app.route('/api/', apiRouter);

/**
 * Setup Cron Jobs.
 */

cron.schedule('0 1 * * *', scrapingService.scrapeAll, {
  name: 'SCRAPE_CRON_JOB',
});
cron.schedule(
  '0 9 * * *',
  async () => {
    const config = await configService.getConfig();
    const newOffers = await offersService.getTodayNewOffers(
      config.notificationQuerySkills
    );
    await notificationService.sendTodayNewOffers(newOffers);
  },
  {
    name: 'NEW_OFFER_NOTIFICATION_JOB',
  }
);

/**
 * Lifecycle Listeners.
 */

app.onError(async (err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  if (err instanceof z.ZodError) {
    return c.json({ error: err.message }, 400);
  }

  try {
    await discordLogger.sendErrorMessage({
      message: embed =>
        embed.setDescription(
          `JJ-IT-FETCHER has crashed unexpected: ${err.message}`
        ),
    });
  } catch (e) {
    console.log(e);
  }

  return c.text('Failed', 500);
});

app.notFound(c => {
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
