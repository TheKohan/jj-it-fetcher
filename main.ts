import { PrismaClient } from './generated/client/deno/edge.ts';
import { Application, Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { load } from 'https://deno.land/std@0.211.0/dotenv/mod.ts';
import { errorHandler } from './middlewares/index.ts';
import { createMockContext } from 'https://deno.land/x/oak@v11.1.0/testing.ts';
import { scrapeJJIt } from './scraper-modules/jj-it/index.ts';

const port = 8000;
const envVars = await load();

/**
 * Initialize.
 */

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: envVars.DATABASE_URL,
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

Deno.cron('JJItCronJob', '* * * * *', () => {
  console.log('CRONJOB FIRED');
});

/**
 * Lifecycle Listeners.
 */

app.addEventListener('error', e => console.log(`Caught error: ${e.message}`));
app.addEventListener('listen', () =>
  console.log(`Server listening on ${port}`)
);

/**
 * Start server.
 */

await app.listen({ port });
