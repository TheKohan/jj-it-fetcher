import { notificationController } from '@jjitfetcher/controllers';
import { Hono } from 'hono';

const api = new Hono();

const {
  deleteAllNotificationsController,
  getAllUserNotificationsController,
  sendUserDiscordNotificationController,
  sendUserEmailNotificationController,
  setUserDiscordNotificationController,
  setUserEmailNotificationController,
} = notificationController;

api
  .post('/')
  .get(getAllUserNotificationsController)
  .delete(deleteAllNotificationsController);
api.post('/email', setUserEmailNotificationController);
api.get('/email/send', sendUserEmailNotificationController);
api.post('/discord', setUserDiscordNotificationController);
api.get('/discord/send', sendUserDiscordNotificationController);

export const notificationsRouter = api;