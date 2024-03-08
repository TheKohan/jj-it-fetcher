import { notificationController } from "@fetcher-api/controllers";
import { Hono } from "hono";

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
  .get(getAllUserNotificationsController)
  .delete(deleteAllNotificationsController);
api.post("/email", setUserEmailNotificationController);
api.get("/email/send", sendUserEmailNotificationController);
api.post("/discord", setUserDiscordNotificationController);
api.get("/discord/send", sendUserDiscordNotificationController);

export const notificationsRouter = api;
