import { Handler } from 'hono';
import prisma from '../db-client';
import {
  ConfigPayload,
  ConfigPayloadSchema,
} from '../validators/config-validator';
import { z } from 'zod';

export const getConfigController: Handler = async c => {
  const config = await getConfigFromDB();
  return c.json(config);
};

export const createConfigController: Handler = async c => {
  const body = await c.req.json();
  if (!body) {
    return c.body('No body provided', 400);
  }
  console.log(body);
  try {
    ConfigPayloadSchema.parse(body);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return c.body(err.message, 400);
    }
  }

  const config = await prisma.config.create({
    data: {
      value: JSON.stringify(body),
    },
  });
  return c.json(config.value);
};

export const getConfigFromDB = async () => {
  const rawConfig = await prisma.config.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return JSON.parse(rawConfig.value as string) as ConfigPayload;
};
