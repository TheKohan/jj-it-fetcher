import { Button } from "@fetcher-web/components";
import { useFetchTodaysNewOffers } from "@fetcher-web/hooks";
import type { FC } from "react";
import { NotificationList } from "./components/notification-list";

export const HomePage: FC = () => {
  const { data: offersData, mutate } = useFetchTodaysNewOffers();

  return (
    <div className="bg-primary-foreground">
      <Button onClick={() => mutate(["react"])}>Fetch offers</Button>
      <h2 className="text-lg">Notifications</h2>
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
