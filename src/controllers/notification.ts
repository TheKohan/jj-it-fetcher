import {
  configService,
  notificationService,
  offersService,
} from '@jjitfetcher/services';
import type { Handler } from 'hono';

const getTodayNewOffersController: Handler = async c => {
  const config = await configService.getConfig();
  const todayNewOffers = await offersService.getTodayNewOffers(
    config.notificationQuerySkills
  );
  await notificationService.sendTodayNewOffers(todayNewOffers);

  return c.json({
    data: todayNewOffers,
    todayCount: todayNewOffers.length,
  });
};

export const notificationController = {
  getTodayNewOffersController,
};
