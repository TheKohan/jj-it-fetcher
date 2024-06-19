import { apiRouter } from "@fetcher-api/routes";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import cron from "node-cron";
import { z } from "zod";
import { serviceLogger } from "./logger";
import { authMiddleware } from "./middlewares";
import { authRouter } from "./routes/auth";
import { serveStatic } from "hono/bun";

import {
  notificationService,
  offersService,
  scrapingService,
  userService,
} from "./services";
import { Prisma } from "@prisma-client";
import { readFileSync } from "fs";
import path from "path";

const { PORT } = process.env;

const app = new Hono();

app.use("*", logger());

app.use(
  "*",
  cors({
    origin: "*", //todo change to production url
    allowMethods: ["POST", "GET", "DELETE"],
    credentials: true,
  })
);
app.route("/auth", authRouter);

const html = readFileSync(path.join(__dirname, "../dist/index.html"), "utf-8");

app.use(
  "/assets/*",
  serveStatic({
    root: "dist/", // this must be relative to bun execution directory
    onNotFound: (path, c) => {
      console.log(`${path} is not found, you access ${c.req.path}`);
    },
  })
); // path must end with '/'
app.get("/app/*", c => c.html(html)); // path must end with '/'

// app.use("/api/*", authMiddleware);
app.route("/api", apiRouter);

/**
 * Setup Cron Jobs.
 */

cron.schedule(
  "0 1 * * *",
  async () => {
    try {
      /**
       * Recurring Jobs, like scraping, clearing old offers and aligning users between supabase auth and database.
       */
      await scrapingService.scrapeAll();
      await offersService.clearMoreThan7DaysOldOffers();
      await userService.alignUsersWithSupabase();
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
    name: "SCRAPE_CRON_JOB",
  }
);

cron.schedule(
  "0 9 * * *",
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
    name: "NEW_OFFER_NOTIFICATION_JOB",
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
    return c.json({ error: err.message, status: 400 }, 400);
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    let status = 400;
    if (c.req.method === "GET") status = 404;

    // Could be handled by checking for each prisma code and adjust
    // the response https://www.prisma.io/docs/orm/reference/error-reference

    const error = err.meta.cause || err.message;

    return c.json({ error, status }, status);
  }

  if (process.env.NODE_ENV === "production") {
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

  return c.json({ error: err.message, status: 500 }, 500);
});

app.notFound(c => {
  console.log(c.req.url);
  return c.json({ error: "Page not found", status: 404 }, 404);
});

/**
 * Start server.
 */

console.log("Server starting on port: ", PORT);

export default {
  port: +PORT,
  fetch: app.fetch,
};
