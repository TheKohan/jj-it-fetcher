import type { ConfigPayload } from '@jjitfetcher/validators';
import prisma from '../db-client';

const createConfigInDB = async (payload: ConfigPayload) => {
  const config = await prisma.config.create({
    data: {
      value: JSON.stringify(payload),
    },
  });

  return config;
};

const getConfigFromDB = async () => {
  const rawConfig = await prisma.config.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return rawConfig?.value
    ? (JSON.parse(rawConfig.value as string) as ConfigPayload)
    : null;
};

export const configModel = {
  getConfigFromDB,
  createConfigInDB,
};
