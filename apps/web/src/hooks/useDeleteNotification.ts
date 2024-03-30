import {
  type SuccessResponse,
  type ErrorResponse,
  fetchApi,
} from "@fetcher-web/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_NOTIFICATIONS_QUERY_KEY } from "./useFetchNotifications";

type UseDeleteNotificationProps = {
  id: number;
  type: "email" | "discord";
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation<
    SuccessResponse<string>,
    ErrorResponse,
    UseDeleteNotificationProps
  >({
    mutationKey: ["delete-notifications"],
    mutationFn: async ({ id, type }) => {
      return await fetchApi(`/api/notifications/${type}/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [GET_NOTIFICATIONS_QUERY_KEY],
      });
    },
  });
};
