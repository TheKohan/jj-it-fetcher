import { EmbedBuilder } from 'discord.js';
import { Handler } from 'hono';
import { DateTime } from 'luxon';
import prisma from '../db-client';
import { discordLogger } from '../logger';
import { getConfigFromDB } from '.';

type Offer = {
  createdAt: Date;
  title: string;
  url: string;
  fromPln: number;
  toPln: number;
  requiredSkills: string;
};

const OFFERS_PER_MESSAGE = 10;

const notificationMessageBase = {
  username: 'Daily Offers',
  avatarURL:
    'https://upload.wikimedia.org/wikipedia/commons/4/48/Robert_Maklowicz_2014_%28cropped%29.jpg',
};

export const getTodayNewOffersController: Handler = async c => {
  const config = await getConfigFromDB();
  const offers = await getTodayNewOffers(config.notificationQuerySkills);
  return c.json(offers);
};

export const getTodayNewOffers = async (techs: string[]) => {
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

  const offerEmbeds = getEmbeds(newOffers);

  if (offerEmbeds.length > 0) {
    discordLogger.sendCustomMessage({
      ...notificationMessageBase,
      content: `New offers today! (${DateTime.now().toISODate()})`,
    });
    offerEmbeds.forEach((embed, i) => {
      discordLogger.sendCustomMessage({
        ...notificationMessageBase,
        content: `(Part ${i} of ${offerEmbeds.length})`,
        embeds: [embed],
      });
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

const getEmbeds: (offer: Offer[]) => EmbedBuilder[] = offers => {
  //make each segment max 25 to satisfy embed max field rule
  const embeds = offers.reduce((acc, next, index) => {
    if (!acc.length || index % OFFERS_PER_MESSAGE === 0) {
      acc.push(
        new EmbedBuilder().setColor('Orange').addFields(getEmbedContent(next))
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
