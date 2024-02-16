import { offersModel } from '@jjitfetcher/models';

const { getTodayNewOffersFromDB } = offersModel;

const getTodayNewOffers = getTodayNewOffersFromDB;

export const offersService = {
  getTodayNewOffers,
};
