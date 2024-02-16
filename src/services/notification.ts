import { EmbedBuilder } from 'discord.js';
import { DateTime } from 'luxon';
import { discordLogger } from '../logger';
import { offersService } from './offers';

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

const sendTodayNewOffers = async (offers: Offer[]) => {
  const offerEmbeds = getEmbeds(offers);
  if (offerEmbeds.length > 0) {
    discordLogger.sendCustomMessage({
      ...notificationMessageBase,
      content: `New offers today! (${DateTime.now().toISODate()})`,
    });
    offerEmbeds.forEach((embed, i) => {
      discordLogger.sendCustomMessage({
        ...notificationMessageBase,
        content: `(Part ${i + 1} of ${offerEmbeds.length})`,
        embeds: [embed],
      });
    });
  } else {
    discordLogger.sendInfoMessage({ message: 'No new offers today!' });
  }
};

export const notificationService = {
  sendTodayNewOffers,
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
