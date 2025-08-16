import type { ErrorResponse, SuccessResponse } from "@fetcher-web/lib";
import { fetchApi } from "@fetcher-web/lib";
import { type UseMutationOptions, useMutation } from "@tanstack/react-query";

type UseSendDiscordNotificationProps = {
  id: number;
};

export const SEND_DISCORD_NOTIFICATION = "send-discord-notification";

export const useSendDiscordNotification = (
  props: Omit<
    UseMutationOptions<
      SuccessResponse<{ message: string }>,
      ErrorResponse,
      UseSendDiscordNotificationProps
    >,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation<
    SuccessResponse<{ message: string }>,
    ErrorResponse,
    UseSendDiscordNotificationProps
  >({
    mutationKey: [SEND_DISCORD_NOTIFICATION],
    mutationFn: async ({ id }) => {
      return await fetchApi(`/api/notifications/discord/send/${id}`, {
        method: "POST",
      });
    },
    ...props,
    onSuccess(data, variables, context) {
      props.onSuccess?.(data, variables, context);
    },
  });
};
