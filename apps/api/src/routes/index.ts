import { Hono } from "hono";
import { notificationsRouter } from "./notifications";
import { scrapeRouter } from "./scrape";
import { offersRouter } from "./offers";
import { usersApi } from "./users";

const api = new Hono();

api.route("/notifications", notificationsRouter);
api.route("/scraping", scrapeRouter);
api.route("/offers", offersRouter);
api.route("/users", usersApi);

export const apiRouter = api;
