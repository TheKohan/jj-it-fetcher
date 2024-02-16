import { DateTime } from 'luxon';
import prisma from '../db-client';

const getTodayNewOffersFromDB = async (techs: string[]) => {
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

  const pastFewDaysOffers = await prisma.b2BOffer.findMany({
    where: {
      createdAt: {
        gte: today.minus({ days: 7 }).toJSDate(),
        lt: today.toJSDate(),
      },
      AND: {
        OR: techs.map(tech => ({
          requiredSkills: { contains: tech },
        })),
      },
    },
    select: fieldsToSelect,
  });

  const todayOffers = await prisma.b2BOffer.findMany({
    where: {
      createdAt: {
        gte: today.toJSDate(),
        lt: today.plus({ day: 1 }).toJSDate(),
      },
      AND: {
        OR: techs.map(tech => ({
          requiredSkills: { contains: tech },
        })),
      },
    },
    select: fieldsToSelect,
  });

  const newOffers = todayOffers.filter(
    offer => !pastFewDaysOffers.find(yOffer => yOffer.url === offer.url)
  );

  return newOffers;
};

export const offersModel = {
  getTodayNewOffersFromDB,
};
