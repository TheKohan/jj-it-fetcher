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
  deleteDiscordNotification,
  deleteEmailNotification,
} = notificationService;

const sendUserDiscordNotificationController: Handler = async c => {
  const user = getUserCtx(c);

  await sendUserDiscordNotification({ userId: user.id });

  return c.json({ data: { message: "Notification sent to discord!" } });
};

const sendUserEmailNotificationController: Handler = async c => {
  const user = getUserCtx(c);

  await sendUserEmailNotification({ userId: user.id });

  return c.json({ data: { message: "Notification sent to email!" } });
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

  return c.json({ data: { message: "Discord Notification set!" } });
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

  return c.json({ data: { message: "Email Notification set!" } });
};

const getAllUserNotificationsController: Handler = async c => {
  const user = getUserCtx(c);
  const notifications = await getAllUserNotifications(user.id);

  return c.json(notifications);
};

const deleteAllNotificationsController: Handler = async c => {
  const user = getUserCtx(c);
  await deleteAllNotifications(user.id);

  return c.json({ data: { message: "All Notifications deleted!" } });
};

const deleteDiscordNotificationController: Handler = async c => {
  /** @TODO handle case of using postman to delete other user's notifications */
  const user = getUserCtx(c);
  const { id } = c.req.param();

  await deleteDiscordNotification(+id);

  return await c.json(
    { data: { message: "Discord Notification deleted!" } },
    200
  );
};

const deleteEmailNotificationController: Handler = async c => {
  /** @TODO handle case of using postman to delete other user's notifications */
  const user = getUserCtx(c);
  const { id } = c.req.param();

  await deleteEmailNotification(+id);

  return await c.json(
    { data: { message: "Email notification deleted!" } },
    200
  );
};

export const notificationController = {
  sendUserDiscordNotificationController,
  sendUserEmailNotificationController,
  setUserDiscordNotificationController,
  setUserEmailNotificationController,
  getAllUserNotificationsController,
  deleteAllNotificationsController,
  deleteDiscordNotificationController,
  deleteEmailNotificationController,
};
