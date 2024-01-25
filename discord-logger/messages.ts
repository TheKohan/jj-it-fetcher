import { EmbedBuilder, WebhookMessageCreateOptions } from 'discord.js';

export type MessageBuilder = (builder: EmbedBuilder) => EmbedBuilder;

const messageEmbeds = {
  error: new EmbedBuilder().setTitle('API ERROR:').setColor('Red'),
  info: new EmbedBuilder().setTitle('API INFO:').setColor('Blue'),
  warning: new EmbedBuilder().setTitle('API WARNING:').setColor('Orange'),
  success: new EmbedBuilder().setTitle('API SUCCESS:').setColor('Green'),
} as const;

export type MessageType = keyof typeof messageEmbeds;

type MessageCreatorFun = (
  messageType: MessageType,
  message: string | MessageBuilder
) => WebhookMessageCreateOptions;

export const getMessage: MessageCreatorFun = (messageType, message) => {
  const errorEmbed =
    typeof message === 'string'
      ? messageEmbeds[messageType]
      : message(messageEmbeds[messageType]);
  const errorMessage: WebhookMessageCreateOptions = {
    embeds: [errorEmbed],
  };
  return errorMessage;
};
