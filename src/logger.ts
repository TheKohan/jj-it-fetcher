import { WebhookClient } from 'discord.js';
import { DiscordLoggerService } from './services/discord-logger';

const { DISCORD_WEBHOOK_URL } = process.env;

export const webhookClient = new WebhookClient({ url: DISCORD_WEBHOOK_URL });
export const discordLogger = new DiscordLoggerService(webhookClient);
