import { DateTime } from "luxon";
import prisma from "../db-client";

const getNewOffersFromDB = async (tags: string[]) => {
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
    publishedAt: true,
  };

  const newOffers = await prisma.b2BOffer.findMany({
    where: {
      publishedAt: {
        gte: today.minus({ day: 1 }).toJSDate(),
        lt: today.plus({ day: 1 }).toJSDate(),
      },
      AND: {
        OR: tags.map(tech => ({
          requiredSkills: { contains: `${tech},`, mode: "insensitive" },
        })),
      },
    },
    select: fieldsToSelect,
  });

  return newOffers;
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
  getNewOffersFromDB,
  clearMoreThan7DaysOldOffersFromDB,
};
