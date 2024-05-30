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
  deleteDiscordNotificationController,
  deleteEmailNotificationController,
  sendSingleDiscordNotificationController,
} = notificationController;

api
  .get(getAllUserNotificationsController)
  .delete(deleteAllNotificationsController);
api.post("/email", setUserEmailNotificationController);
api.delete("/email/:id", deleteEmailNotificationController);
api.get("/email/send", sendUserEmailNotificationController);
api.delete("/discord/:id", deleteDiscordNotificationController);
api.post("/discord", setUserDiscordNotificationController);
api.get("/discord/send", sendUserDiscordNotificationController);
api.post("/discord/send/:id", sendSingleDiscordNotificationController);

export const notificationsRouter = api;
