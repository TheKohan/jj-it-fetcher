import type { ErrorResponse } from "@fetcher-web/lib";
import { fetchApi } from "@fetcher-web/lib";
import { useQuery } from "@tanstack/react-query";

type Notification = {
  id: number;
  tags: {
    name: string;
  }[];
};

type NotificationResponse = {
  createdAt: string;
  userId: string;
  discordNotification: Notification[];
  emailNotification: Notification[];
};

export const useFetchNotifications = () =>
  useQuery<NotificationResponse, ErrorResponse>({
    queryKey: ["get-notifications"],
    queryFn: async () => {
      return (await fetchApi("/api/notifications", {
        method: "GET",
      })) as unknown as NotificationResponse;
    },
  });
