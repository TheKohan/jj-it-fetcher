import { z } from 'zod';

export const ConfigPayloadSchema = z.object({
  notificationQuerySkills: z.array(z.string()),
});

export type ConfigPayload = z.infer<typeof ConfigPayloadSchema>;
