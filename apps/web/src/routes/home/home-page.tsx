import { useFetchTodaysNewOffers } from "@fetcher-web/hooks";
import type { FC } from "react";
import { AddNotification, NotificationList } from "./components";

export const HomePage: FC = () => {
  const { data: offersData, mutate } = useFetchTodaysNewOffers();

  return (
    <div className="bg-primary-foreground">
      <h2 className="text-lg">Notifications</h2>
      <AddNotification />
      <NotificationList />
      {offersData && (
        <div>
          {offersData.data.map(offer => (
            <div>{JSON.stringify(offer)}</div>
          ))}
        </div>
      )}
    </div>
  );
};
