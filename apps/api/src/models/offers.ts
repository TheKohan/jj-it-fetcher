import { DateTime } from "luxon";
import prisma from "../db-client";
import type { Prisma } from "@prisma-client";

const getNewOffersFromDB = async (tags: string[]) => {
  const today = DateTime.now().set({
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

  const todayOffers = await prisma.b2BOffer.findMany({
    where: {
      createdAt: {
        gte: today.toJSDate(),
        lt: today.plus({ day: 1 }).toJSDate(),
      },
      AND: tags.map(tag => ({ requiredSkills: { some: { name: tag } } })),
    },
    select: fieldsToSelect,
  });

  const past7DaysOffers = await prisma.b2BOffer.findMany({
    distinct: ["slug"],
    where: {
      createdAt: {
        gte: today.minus({ days: 7 }).toJSDate(),
        lt: today.toJSDate(),
      },
      AND: tags.map(tag => ({ requiredSkills: { some: { name: tag } } })),
    },
    select: fieldsToSelect,
  });

  const newOffers = todayOffers.filter(
    offer => !past7DaysOffers.find(yOffer => yOffer.url === offer.url)
  );

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

const getAllSearchTagsFromDB = async () => {
  const tags = await prisma.searchTag.findMany({
    select: {
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return tags;
};

export type OffersWithTags = Prisma.PromiseReturnType<
  typeof getNewOffersFromDB
>;

export const offersModel = {
  getNewOffersFromDB,
  clearMoreThan7DaysOldOffersFromDB,
  getAllSearchTagsFromDB,
};
