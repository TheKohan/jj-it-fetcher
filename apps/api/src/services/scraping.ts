import { scrapingModel } from "../models/scraping";

const { scrapeAllToDB, scrapeJJitToDB, scrapeNoFluffJobsToDB } = scrapingModel;

const scrapeJJit = scrapeJJitToDB;
const scrapeNoFluffJobs = scrapeNoFluffJobsToDB;
const scrapeAll = scrapeAllToDB;

export const scrapingService = {
  scrapeJJit,
  scrapeNoFluffJobs,
  scrapeAll,
};
