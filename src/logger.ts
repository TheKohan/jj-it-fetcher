import { WebhookClient } from 'discord.js';
import { DiscordLogger } from './discord-logger';

const { DISCORD_WEBHOOK_URL } = process.env;

export const webhookClient = new WebhookClient({ url: DISCORD_WEBHOOK_URL });
export const discordLogger = new DiscordLogger(webhookClient);
