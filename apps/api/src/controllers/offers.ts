export * from "./scraping";
export * from "./notification";
import { offersService } from "@fetcher-api/services";
import type { Handler } from "hono";

const { getNewOffers, getAllSearchTags } = offersService;

const getNewOffersController: Handler = async c => {
  const { tags } = c.req.query();

  console.log(tags);

  const response = await getNewOffers(JSON.parse(tags) as string[]);

  return c.json({ data: response });
};

const getAllSearchTagsController: Handler = async c => {
  const response = await getAllSearchTags();

  return c.json({ data: response.map(tag => tag.name) });
};

export const offersController = {
  getNewOffersController,
  getAllSearchTagsController,
};
