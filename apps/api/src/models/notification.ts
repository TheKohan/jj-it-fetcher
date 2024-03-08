import prisma from "../db-client";

type ISetEmailNotificationProps = {
  userId: string;
  email: string;
  tags: string[];
};

type ISetUserDiscordNotificationProps = {
  userId: string;
  webhookId: string;
  tags: string[];
};

const getAllUserNotificationsFromDB = (userId: string) => {
  return prisma.notification.findFirst({
    where: {
      userId,
    },
    include: {
      discordNotification: {
        select: {
          id: true,
          tags: true,
        },
      },
      emailNotification: {
        select: {
          id: true,
          email: true,
          tags: true,
        },
      },
    },
  });
};

const getUserDiscordNotificationsFromDB = (userId: string) => {
  return prisma.discordNotification.findMany({
    where: {
      Notification: {
        userId,
      },
    },
    include: {
      tags: true,
    },
  });
};

const getAllDiscordNotificationsFromDB = async () => {
  return await prisma.discordNotification.findMany({ include: { tags: true } });
};

const getUserEmailNotificationsFromDB = async (userId: string) => {
  return await prisma.emailNotification.findMany({
    where: {
      Notification: {
        userId,
      },
    },
    include: {
      tags: true,
    },
  });
};

const getAllEmailNotificationsFromDB = async () => {
  return await prisma.emailNotification.findMany({ include: { tags: true } });
};

const setUserDiscordNotificationToDB = async ({
  userId,
  webhookId,
  tags,
}: ISetUserDiscordNotificationProps) => {
  return await prisma.discordNotification.create({
    data: {
      webhookId,
      Notification: {
        connectOrCreate: {
          where: {
            userId,
          },
          create: {
            userId,
          },
        },
      },
      tags: {
        connectOrCreate: tags.map(tag => ({
          where: {
            name: tag,
          },
          create: {
            name: tag,
          },
        })),
      },
    },
  });
};

const setUserEmailNotificationToDB = async ({
  userId,
  email,
  tags,
}: ISetEmailNotificationProps) => {
  return await prisma.emailNotification.create({
    data: {
      email,
      Notification: {
        connectOrCreate: {
          where: {
            userId,
          },
          create: {
            userId,
          },
        },
      },
      tags: {
        connectOrCreate: tags.map(tag => ({
          where: {
            name: tag,
          },
          create: {
            name: tag,
          },
        })),
      },
    },
  });
};

const deleteAllNotificationsFromDB = async (userId: string) => {
  await prisma.discordNotification.deleteMany({
    where: {
      Notification: {
        userId,
      },
    },
  });
  await prisma.emailNotification.deleteMany({
    where: {
      Notification: {
        userId,
      },
    },
  });
};

export const notificationModel = {
  getAllUserNotificationsFromDB,
  setUserDiscordNotificationToDB,
  setUserEmailNotificationToDB,
  getUserDiscordNotificationsFromDB,
  getUserEmailNotificationsFromDB,
  deleteAllNotificationsFromDB,
  getAllDiscordNotificationsFromDB,
  getAllEmailNotificationsFromDB,
};
