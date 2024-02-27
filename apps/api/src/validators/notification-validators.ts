import { z } from 'zod';

export const SetUserDiscordNotificationSchema = z.object({
  webhookId: z.string(),
  tags: z.array(z.string()),
});

export type SetDiscordNotificationPayload = z.infer<
  typeof SetUserDiscordNotificationSchema
>;

type IAssertSetDiscordNotificationPayload = (
  payload: unknown
) => asserts payload is SetDiscordNotificationPayload;

export const assertSetDiscordNotificationPayload: IAssertSetDiscordNotificationPayload =
  payload => {
    try {
      SetUserDiscordNotificationSchema.parse(payload);
    } catch (err) {
      if (err instanceof z.ZodError) {
        throw new Error(err.message);
      }
    }
  };

export const SetUserEmailNotificationSchema = z.object({
  email: z.string().email(),
  tags: z.array(z.string()),
});

export type SetEmailNotificationPayload = z.infer<
  typeof SetUserEmailNotificationSchema
>;

type IAssertSetEmailNotificationPayload = (
  payload: unknown
) => asserts payload is SetEmailNotificationPayload;

export const assertSetEmailNotificationPayload: IAssertSetEmailNotificationPayload =
  payload => {
    try {
      SetUserEmailNotificationSchema.parse(payload);
    } catch (err) {
      if (err instanceof z.ZodError) {
        throw new Error(err.message);
      }
    }
  };
