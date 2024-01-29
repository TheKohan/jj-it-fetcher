import { EmbedBuilder, WebhookMessageCreateOptions } from 'discord.js';

export type MessageBuilder = (builder: EmbedBuilder) => EmbedBuilder;

const messageEmbeds = {
  error: () =>
    new EmbedBuilder()
      .setTitle('API ERROR:')
      .setColor('Red')
      .setTimestamp(Date.now()),
  info: () =>
    new EmbedBuilder()
      .setTitle('API INFO:')
      .setColor('Blue')
      .setTimestamp(Date.now()),
  warning: () =>
    new EmbedBuilder()
      .setTitle('API WARNING:')
      .setColor('Orange')
      .setTimestamp(Date.now()),
  success: () =>
    new EmbedBuilder()
      .setTitle('API SUCCESS:')
      .setColor('Green')
      .setTimestamp(Date.now()),
} as const;

export type MessageType = keyof typeof messageEmbeds;

type MessageCreatorFun = (
  messageType: MessageType,
  message: string | MessageBuilder
) => WebhookMessageCreateOptions;

export const getMessage: MessageCreatorFun = (messageType, message) => {
  const embed =
    typeof message === 'string'
      ? messageEmbeds[messageType]()
      : message(messageEmbeds[messageType]());
  const errorMessage: WebhookMessageCreateOptions = {
    embeds: [embed],
  };
  return errorMessage;
};
