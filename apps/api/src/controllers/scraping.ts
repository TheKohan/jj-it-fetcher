import type { Handler } from "hono";
import { scrapingService } from "../services/scraping";

const { scrapeAll, scrapeJJit, scrapeNoFluffJobs } = scrapingService;

const scrapeJustJoinItController: Handler = async c => {
  await scrapeJJit();
  return c.json({ data: { message: "Scraped JJIT Successfully" } });
};

const scrapeNoFluffJobsController: Handler = async c => {
  await scrapeNoFluffJobs();
  return c.json({ data: { message: "Scraped No fluff Jobs Successfully" } });
};
const scrapeAllController: Handler = async c => {
  await scrapeAll();
  return c.json({ data: { message: "Scraped all modules successfully" } });
};

export const scrapingController = {
  scrapeJustJoinItController,
  scrapeNoFluffJobsController,
  scrapeAllController,
};
