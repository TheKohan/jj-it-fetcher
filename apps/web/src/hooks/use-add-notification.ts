import {
  type ErrorResponse,
  type SuccessResponse,
  fetchApi,
} from "@fetcher-web/lib";
import {
  type UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { GET_NOTIFICATIONS_QUERY_KEY } from "./use-fetch-notification";

type UseAddNotificationProps = {
  type: "email" | "discord";
  uri: string;
  tags: string[];
};

export const useAddNotification = (
  props: Omit<
    UseMutationOptions<
      SuccessResponse<string>,
      ErrorResponse,
      UseAddNotificationProps
    >,
    "mutationKey" | "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  return useMutation<
    SuccessResponse<string>,
    ErrorResponse,
    UseAddNotificationProps
  >({
    mutationKey: ["add-notifications"],
    mutationFn: async ({ type, tags, uri }) => {
      const uriPropertyObj =
        type === "discord" ? { webhookId: uri } : { email: uri };

      return await fetchApi(`/api/notifications/${type}`, {
        method: "POST",
        body: JSON.stringify({ tags, ...uriPropertyObj }),
      });
    },
    ...props,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: [GET_NOTIFICATIONS_QUERY_KEY],
      });
      props.onSuccess?.(data, variables, context);
    },
  });
};
