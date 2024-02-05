import { Handler } from 'hono';
import prisma from '../db-client';
import { DateTime } from 'luxon';

export const getTodayNewOffersController: Handler = async c => {
  const offers = await getTodayNewOffers();
  return c.json(offers);
};

export const getTodayNewOffers = async () => {
  const technologies = [
    'React Native',
    'React',
    'Javascript',
    'TypeScript',
    'Fullstack',
  ];
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
        OR: technologies.map(tech => ({ requiredSkills: { contains: tech } })),
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
        OR: technologies.map(tech => ({ requiredSkills: { contains: tech } })),
      },
    },
    select: fieldsToSelect,
  });

  const newOffers = todayOffers.filter(
    offer => !pastFewDaysOffers.find(yOffer => yOffer.url === offer.url)
  );

  return {
    data: {
      pastFewDaysOffers: pastFewDaysOffers,
      today: todayOffers,
      newOffers: newOffers,
    },
    todayCount: todayOffers.length,
    pastFewDaysOffers: pastFewDaysOffers.length,
    newOffersCount: newOffers.length,
  };
};
