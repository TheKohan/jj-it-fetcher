export * from "./scraping";
export * from "./notification";
import { offersService } from "@fetcher-api/services";
import type { Handler } from "hono";

const { getTodayNewOffers } = offersService;

const getTodayNewOffersController: Handler = async c => {
  const tags = (await c.req.json()) as string[];

  const response = await getTodayNewOffers(tags);

  return c.json({ data: response });
};

export const offersController = { getTodayNewOffersController };
