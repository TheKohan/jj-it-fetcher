import { Application, Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { load } from 'dotenv';
import { errorHandler } from './middlewares/index.ts';
import { scrapeJJIt } from './scraper-modules/jj-it/index.ts';

import { type PrismaClient } from './generated/client/index.d.ts';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const Prisma = require('./generated/client/index.js');

const { PORT, DATABASE_URL } = await load();

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

const app = new Application();
const router = new Router();

/**
 * Setup routes.
 */

router.get('/', async ({ response }) => {
  const data = await scrapeJJIt(prisma);
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

Deno.cron('JJ-IT-CON-JOB', '0 1 * * *', async () => {
  await scrapeJJIt(prisma);
});

/**
 * Lifecycle Listeners.
 */

app.addEventListener('error', e => console.log(`Caught error: ${e.message}`));
app.addEventListener('listen', () =>
  console.log(`Server listening on ${PORT}`)
);

/**
 * Start server.
 */

await app.listen({ port: +PORT });
