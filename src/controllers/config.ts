import { assertConfigPayload } from '@jjitfetcher/validators';
import { Handler } from 'hono';
import { configService } from '../services/config';

const { createConfig, getConfig } = configService;

const getConfigController: Handler = async c => {
  const config = await getConfig();
  if (!config) {
    return c.text('No config found', 404);
  }
  return c.json(config);
};

const createConfigController: Handler = async c => {
  const body = await c.req.json();
  if (!body) {
    return c.body('No body provided', 400);
  }

  assertConfigPayload(body);

  const config = await createConfig(body);
  return c.json(config.value);
};

export const configController = {
  getConfigController,
  createConfigController,
};
