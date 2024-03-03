import { WebhookClient, type WebhookMessageCreateOptions } from "discord.js";

type ISetUserDiscordNotificationProps = {
  webhookUrl: string;
  message: WebhookMessageCreateOptions;
};

export const sendDiscordWebhookMessage = async ({
  webhookUrl,
  message,
}: ISetUserDiscordNotificationProps) => {
  const webhookClient = new WebhookClient({ url: webhookUrl });
  await webhookClient.send(message);
};
