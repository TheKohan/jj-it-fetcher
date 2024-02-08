import { EmbedBuilder, WebhookMessageCreateOptions } from 'discord.js';

export type MessageBuilder = (builder: EmbedBuilder) => EmbedBuilder;

export const baseMessageEmbeds = {
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

export type MessageType = keyof typeof baseMessageEmbeds;

type MessageCreatorFun = (
  messageType: MessageType,
  message: string | MessageBuilder
) => WebhookMessageCreateOptions;

export const getMessage: MessageCreatorFun = (messageType, message) => {
  const embed =
    typeof message === 'string'
      ? baseMessageEmbeds[messageType]().addFields({
          name: 'Message:',
          value: message,
        })
      : message(baseMessageEmbeds[messageType]());
  const errorMessage: WebhookMessageCreateOptions = {
    embeds: [embed],
  };
  return errorMessage;
};
