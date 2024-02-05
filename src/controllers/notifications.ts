import { Handler } from 'hono';
import prisma from '../db-client';
import { DateTime } from 'luxon';
import { baseMessageEmbeds } from '@jjitfetcher/discord-logger';
import { discordLogger } from '../logger';
import { ActionRowBuilder, EmbedBuilder } from 'discord.js';

const TECHNOLOGIES_TAGS = [
  'React Native',
  'React',
  'Javascript',
  'TypeScript',
  'Fullstack',
];

export const getTodayNewOffersController: Handler = async c => {
  const offers = await getTodayNewOffers();
  return c.json(offers);
};

export const getTodayNewOffers = async () => {
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
        OR: TECHNOLOGIES_TAGS.map(tech => ({
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
        OR: TECHNOLOGIES_TAGS.map(tech => ({
          requiredSkills: { contains: tech },
        })),
      },
    },
    select: fieldsToSelect,
  });

  const newOffers = todayOffers.filter(
    offer => !pastFewDaysOffers.find(yOffer => yOffer.url === offer.url)
  );

  if (newOffers.length > 0) {
    discordLogger.sendCustomMessage({
      username: 'Daily Offers',
      content: `New offers today: ${newOffers.length}!`,
      avatarURL:
        'https://upload.wikimedia.org/wikipedia/commons/4/48/Robert_Maklowicz_2014_%28cropped%29.jpg',
      embeds: getEmbeddedOffers(newOffers),
    });
  } else {
    discordLogger.sendInfoMessage({ message: 'No new offers today!' });
  }

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

const getEmbeddedOffers: (
  offer: {
    createdAt: Date;
    title: string;
    url: string;
    fromPln: number;
    toPln: number;
    requiredSkills: string;
  }[]
) => EmbedBuilder[] = offers => {
  return offers.map(offer =>
    new EmbedBuilder()
      .setTitle(`${offer.title}`)
      .setColor('Orange')
      .setFooter({ text: offer.requiredSkills })
      .setTimestamp(Date.now())
      .setURL(offer.url)
      .addFields([
        {
          name: 'Salary: ',
          value: `From: ${offer.fromPln} PLN, To: ${offer.toPln} PLN`,
        },
      ])
  );
};
