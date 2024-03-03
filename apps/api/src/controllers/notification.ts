import { notificationService } from "@fetcher-api/services";
import { getUserCtx } from "@fetcher-api/utils";
import {
  assertSetDiscordNotificationPayload,
  assertSetEmailNotificationPayload,
} from "@fetcher-api/validators";
import type { Handler } from "hono";

const {
  getAllUserNotifications,
  sendUserDiscordNotification,
  sendUserEmailNotification,
  setUserDiscordNotification,
  setUserEmailNotification,
  deleteAllNotifications,
} = notificationService;

const sendUserDiscordNotificationController: Handler = async c => {
  const user = getUserCtx(c);

  await sendUserDiscordNotification({ userId: user.id });

  return c.json({ message: "Notification sent to discord!" });
};

const sendUserEmailNotificationController: Handler = async c => {
  const user = getUserCtx(c);

  await sendUserEmailNotification({ userId: user.id });

  return c.json({ message: "Notification sent to email!" });
};

const setUserDiscordNotificationController: Handler = async c => {
  const user = getUserCtx(c);
  const body = await c.req.json();

  assertSetDiscordNotificationPayload(body);

  await setUserDiscordNotification({
    userId: user.id,
    webhookId: body.webhookId,
    tags: body.tags,
  });

  return c.json({ message: "Discord notification set!" });
};

const setUserEmailNotificationController: Handler = async c => {
  const user = getUserCtx(c);
  const body = await c.req.json();

  assertSetEmailNotificationPayload(body); //TODO: solve this with zValidator fn from HONO, search for every assert occurence

  await setUserEmailNotification({
    userId: user.id,
    email: body.email,
    tags: body.tags,
  });
  return c.json({ message: "Email notification set!" });
};

const getAllUserNotificationsController: Handler = async c => {
  const user = getUserCtx(c);
  const notifications = await getAllUserNotifications(user.id);

  return c.json(notifications);
};

const deleteAllNotificationsController: Handler = async c => {
  const user = getUserCtx(c);
  await deleteAllNotifications(user.id);

  return c.json({ message: "All notifications deleted!" });
};

export const notificationController = {
  sendUserDiscordNotificationController,
  sendUserEmailNotificationController,
  setUserDiscordNotificationController,
  setUserEmailNotificationController,
  getAllUserNotificationsController,
  deleteAllNotificationsController,
};
