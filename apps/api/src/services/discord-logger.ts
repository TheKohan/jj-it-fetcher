import {
  type MessageBuilder,
  type MessageType,
  getMessage,
} from "@fetcher-api/utils";
import type { WebhookClient, WebhookMessageCreateOptions } from "discord.js";

type MessageProps = { message: string | MessageBuilder };
type _MessageProps = MessageProps & { type: MessageType };

export class DiscordLoggerService {
  webhookClient: WebhookClient;

  constructor(webhookClient: WebhookClient) {
    this.webhookClient = webhookClient;
  }

  private async sendMessage(props: _MessageProps) {
    const message = getMessage(props.type, props.message);
    await this.webhookClient.send(message);
  }

  async sendErrorMessage({ message }: MessageProps) {
    await this.sendMessage({ type: "error", message });
  }
  async sendSuccessMessage({ message }: MessageProps) {
    await this.sendMessage({ type: "success", message });
  }
  async sendWarningMessage({ message }: MessageProps) {
    await this.sendMessage({ type: "warning", message });
  }
  async sendInfoMessage({ message }: MessageProps) {
    await this.sendMessage({ type: "info", message });
  }
  async sendCustomMessage(message: WebhookMessageCreateOptions) {
    await this.webhookClient.send(message);
  }
}
