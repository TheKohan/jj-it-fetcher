import type { ErrorResponse } from "@fetcher-web/lib";
import { fetchApi } from "@fetcher-web/lib";
import { useQuery } from "@tanstack/react-query";

export type JobNotification = {
  id: number;
  tags: {
    name: string;
  }[];
};

type NotificationResponse = {
  createdAt: string;
  userId: string;
  discordNotification: JobNotification[];
  emailNotification: JobNotification[];
};

export const GET_NOTIFICATIONS_QUERY_KEY = "get-notifications";

export const useFetchNotifications = () =>
  useQuery<NotificationResponse, ErrorResponse>({
    queryKey: [GET_NOTIFICATIONS_QUERY_KEY],
    queryFn: async () => {
      return (await fetchApi("/api/notifications", {
        method: "GET",
      })) as unknown as NotificationResponse;
    },
    staleTime: 1000 * 60 * 30, // 30 minutes,
  });
