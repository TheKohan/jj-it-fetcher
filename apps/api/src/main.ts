import { apiRouter } from '@fetcher-api/routes';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'hono/logger';
import cron from 'node-cron';
import { z } from 'zod';
import { serviceLogger } from './logger';
import { authMiddleware } from './middlewares';
import { authRouter } from './routes/auth';
import {
  notificationService,
  offersService,
  scrapingService,
} from './services';
import { cors } from 'hono/cors';

const { PORT } = process.env;

const app = new Hono();

app.use('*', logger());
app.use(
  '*',
  cors({
    origin: '*', //todo change to production url
    allowMethods: ['POST', 'GET'],
    credentials: true,
  })
);
app.route('/auth/', authRouter);

app.use('/api/*', authMiddleware);
app.route('/api/', apiRouter);

/**
 * Setup Cron Jobs.
 */

cron.schedule(
  '0 1 * * *',
  async () => {
    try {
      await scrapingService.scrapeAll();
      await offersService.clearMoreThan7DaysOldOffers();
    } catch (e) {
      if (e instanceof Error) {
        await serviceLogger.sendErrorMessage({
          message: embed =>
            embed.setDescription(
              `JJ-IT-FETCHER has crashed unexpected: ${e.message}`
            ),
        });
      }
    }
  },
  {
    name: 'SCRAPE_CRON_JOB',
  }
);

cron.schedule(
  '0 9 * * *',
  async () => {
    try {
      await notificationService.sendAllDiscordNotifications();
    } catch (e) {
      if (e instanceof Error) {
        await serviceLogger.sendErrorMessage({
          message: embed =>
            embed.setDescription(
              `JJ-IT-FETCHER has crashed unexpected: ${e.message}`
            ),
        });
      }
    }
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
    return c.json({ error: err.message, status: err.status }, err.status);
  }

  if (err instanceof z.ZodError) {
    return c.json({ error: err.message }, 400);
  }

  if (process.env.NODE_ENV === 'production') {
    try {
      await serviceLogger.sendErrorMessage({
        message: embed =>
          embed.setDescription(
            `JJ-IT-FETCHER has crashed unexpected: ${err.message}`
          ),
      });
    } catch (e) {
      console.log(e);
    }
  }

  console.log(err.message);

  return c.json(err.message, 500);
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
