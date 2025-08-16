import { Hono } from "hono";
import { notificationsRouter } from "./notifications";
import { offersRouter } from "./offers";
import { scrapeRouter } from "./scrape";
import { userApi } from "./user";

const api = new Hono();

api.route("/notifications", notificationsRouter);
api.route("/scraping", scrapeRouter);
api.route("/offers", offersRouter);
api.route("/users", userApi);

export const apiRouter = api;
