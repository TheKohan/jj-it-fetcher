import { sendDiscordWebhookMessage } from "@fetcher-api/utils";
import { EmbedBuilder } from "discord.js";
import { DateTime } from "luxon";
import { notificationModel } from "../models/notification";
import { offersModel } from "../models/offers";

const OFFERS_PER_MESSAGE = 10;

const notificationMessageBase = {
  username: "Daily Offers",
  avatarURL:
    "https://upload.wikimedia.org/wikipedia/commons/4/48/Robert_Maklowicz_2014_%28cropped%29.jpg",
};

type Offer = {
  createdAt: Date;
  title: string;
  url: string;
  fromPln: number;
  toPln: number;
  requiredSkills: string;
};

const {
  getAllUserNotificationsFromDB,
  setUserDiscordNotificationToDB,
  setUserEmailNotificationToDB,
  getUserDiscordNotificationsFromDB,
  getUserEmailNotificationsFromDB,
  deleteAllNotificationsFromDB,
  getAllDiscordNotificationsFromDB,
  getAllEmailNotificationsFromDB,
} = notificationModel;

const { getTodayNewOffersFromDB } = offersModel;

const getAllUserNotifications = getAllUserNotificationsFromDB;
const getAllDiscordNotifications = getAllDiscordNotificationsFromDB;
const getAllEmailNotifications = getAllEmailNotificationsFromDB;
const setUserDiscordNotification = setUserDiscordNotificationToDB;
const setUserEmailNotification = setUserEmailNotificationToDB;

const sendAllDiscordNotifications = async () => {
  const notifications = await getAllDiscordNotificationsFromDB();

  for (const notification of notifications) {
    await _sendDiscordNotification(notification);
  }
};

const sendUserDiscordNotification = async ({ userId }: { userId: string }) => {
  const notifications = await getUserDiscordNotificationsFromDB(userId);

  for (const notification of notifications) {
    await _sendDiscordNotification(notification);
  }
};

const sendUserEmailNotification = async ({ userId }: { userId: string }) => {
  /** TODO */
  const notifications = await getUserEmailNotificationsFromDB(userId);
  return notifications;
};

const deleteAllNotifications = deleteAllNotificationsFromDB;

export const notificationService = {
  getAllDiscordNotifications,
  getAllEmailNotifications,
  getAllUserNotifications,
  setUserDiscordNotification,
  setUserEmailNotification,
  sendUserDiscordNotification,
  deleteAllNotifications,
  sendUserEmailNotification,
  sendAllDiscordNotifications,
};

const getEmbeds: (offer: Offer[]) => EmbedBuilder[] = offers => {
  //make each segment max 25 to satisfy embed max field rule
  const embeds = offers.reduce((acc, next, index) => {
    if (!acc.length || index % OFFERS_PER_MESSAGE === 0) {
      acc.push(
        new EmbedBuilder().setColor("Orange").addFields(getEmbedContent(next))
      );
    } else {
      acc[acc.length - 1].addFields(getEmbedContent(next));
    }
    return acc;
  }, [] as EmbedBuilder[]);

  for (const embed of embeds) {
    console.log(embed.data.fields.length);
  }

  return embeds;
};

const getEmbedContent = (offer: Offer) => ({
  name: offer.title,
  value: `Skills: ${offer.requiredSkills}\nFrom: ${offer.fromPln} PLN, To: ${offer.toPln} PLN\n[Link](${offer.url})`,
});

const _sendDiscordNotification = async (
  notification: {
    tags: {
      name: string;
    }[];
  } & {
    id: number;
    createdAt: Date;
    webhookId: string;
    userId: string;
  }
) => {
  const tags = notification.tags.map(({ name }) => name);
  const offers = await getTodayNewOffersFromDB(tags);
  const offerEmbeds = getEmbeds(offers);

  if (offerEmbeds.length > 0) {
    await sendDiscordWebhookMessage({
      message: {
        ...notificationMessageBase,
        content: `New offers today! (${DateTime.now().toISODate()})`,
      },
      webhookUrl: notification.webhookId,
    });
    let i = 0;
    for (const embed of offerEmbeds) {
      await sendDiscordWebhookMessage({
        message: {
          ...notificationMessageBase,
          content: `(Part ${i + 1} of ${offerEmbeds.length})`,
          embeds: [embed],
        },
        webhookUrl: notification.webhookId,
      });
      i++;
    }
  } else {
    sendDiscordWebhookMessage({
      message: {
        ...notificationMessageBase,
        content: `There's no new offers today :( !`,
      },
      webhookUrl: notification.webhookId,
    });
  }
};
