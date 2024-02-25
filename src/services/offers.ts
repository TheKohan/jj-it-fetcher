import { offersModel } from '@jjitfetcher/models';

const { getTodayNewOffersFromDB, clearMoreThan7DaysOldOffersFromDB } =
  offersModel;

const getTodayNewOffers = getTodayNewOffersFromDB;
const clearMoreThan7DaysOldOffers = clearMoreThan7DaysOldOffersFromDB;

export const offersService = {
  getTodayNewOffers,
  clearMoreThan7DaysOldOffers,
};
