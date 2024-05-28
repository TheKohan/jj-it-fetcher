import { DateTime } from "luxon";
import prisma from "../db-client";

const getTodayNewOffersFromDB = async (tags: string[]) => {
  const today = DateTime.now().minus({ day: 0 }).set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  const fieldsToSelect = {
    title: true,
    requiredSkills: true,
    createdAt: true,
    url: true,
    fromPln: true,
    toPln: true,
  };

  const todayOffers = await prisma.b2BOffer.findMany({
    where: {
      publishedAt: {
        gte: today.toJSDate(),
        lt: today.plus({ day: 1 }).toJSDate(),
      },
      AND: {
        OR: tags.map(tech => ({
          requiredSkills: { contains: tech, mode: "insensitive" },
        })),
      },
    },
    select: fieldsToSelect,
  });

  return todayOffers;
};

const clearMoreThan7DaysOldOffersFromDB = async () => {
  const today = DateTime.now().minus({ day: 0 }).set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  await prisma.b2BOffer.deleteMany({
    where: {
      createdAt: {
        lt: today.minus({ days: 7 }).toJSDate(),
      },
    },
  });
};

export const offersModel = {
  getTodayNewOffersFromDB,
  clearMoreThan7DaysOldOffersFromDB,
};
