import { offersModel } from "@fetcher-api/models";

const {
  getNewOffersFromDB,
  clearMoreThan7DaysOldOffersFromDB,
  getAllSearchTagsFromDB,
} = offersModel;

const getNewOffers = getNewOffersFromDB;
const clearMoreThan7DaysOldOffers = clearMoreThan7DaysOldOffersFromDB;
const getAllSearchTags = getAllSearchTagsFromDB;

export const offersService = {
  getNewOffers,
  getAllSearchTags,
  clearMoreThan7DaysOldOffers,
};
