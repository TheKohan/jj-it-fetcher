import { Hono } from "hono";
import { notificationsRouter } from "./notifications";
import { scrapeRouter } from "./scrape";
import { offersRouter } from "./offers";

const api = new Hono();

api.route("/notifications", notificationsRouter);
api.route("/scraping", scrapeRouter);
api.route("/offers", offersRouter);

export const apiRouter = api;
