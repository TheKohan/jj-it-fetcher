import { scrapingModel } from "../models/scraping";

const { scrapeAllToDB, scrapeJJitToDB, scrapeNoFluffJobsToDB } = scrapingModel;

const scrapeJJit = scrapeJJitToDB;
const scrapeNoFluffJobs = scrapeNoFluffJobsToDB;
const scrapeAll = scrapeAllToDB;


/**
 * @TODO: Offload this crap to worker_thread to stop scraping from blocking API requests  */
export const scrapingService = {
  scrapeJJit,
  scrapeNoFluffJobs,
  scrapeAll,
};
