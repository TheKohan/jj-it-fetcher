import { Hono } from "hono";
import { notificationsRouter } from "./notifications";
import { scrapeRouter } from "./scrape";
import { offersRouter } from "./offers";
import { userApi } from "./user";

const api = new Hono();

api.route("/notifications", notificationsRouter);
api.route("/scraping", scrapeRouter);
api.route("/offers", offersRouter);
api.route("/users", userApi);

export const apiRouter = api;
