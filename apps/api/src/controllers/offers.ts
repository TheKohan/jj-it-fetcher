export * from "./scraping";
export * from "./notification";
import { offersService } from "@fetcher-api/services";
import type { Handler } from "hono";

const { getNewOffers } = offersService;

const getNewOffersController: Handler = async c => {
  const { tags } = c.req.query();

  const response = await getNewOffers(JSON.parse(tags) as string[]);

  return c.json({ data: response });
};

export const offersController = { getNewOffersController };
