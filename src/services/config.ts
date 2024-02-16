import { configModel } from '../models/config';

const { createConfigInDB, getConfigFromDB } = configModel;

const getConfig = getConfigFromDB;
const createConfig = createConfigInDB;

export const configService = {
  getConfig,
  createConfig,
};
