import { z } from 'zod';

export const ConfigPayloadSchema = z.object({
  notificationQuerySkills: z.array(z.string()),
});

export type ConfigPayload = z.infer<typeof ConfigPayloadSchema>;

type IAssertConfigPayload = (
  payload: unknown
) => asserts payload is ConfigPayload;

export const assertConfigPayload: IAssertConfigPayload = payload => {
  try {
    ConfigPayloadSchema.parse(payload);
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw new Error(err.message);
    }
  }
};
