import { offersModel } from "@fetcher-api/models";

const { getNewOffersFromDB, clearMoreThan7DaysOldOffersFromDB } = offersModel;

const getNewOffers = getNewOffersFromDB;
const clearMoreThan7DaysOldOffers = clearMoreThan7DaysOldOffersFromDB;

export const offersService = {
  getNewOffers,
  clearMoreThan7DaysOldOffers,
};
