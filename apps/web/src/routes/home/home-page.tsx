import { useFetchTodaysNewOffers } from "@fetcher-web/hooks";
import type { FC } from "react";
import { NotificationList } from "./components";
import { useSyncUser } from "@fetcher-web/hooks/use-sync-user";

export const HomePage: FC = () => {
  const { data: offersData } = useFetchTodaysNewOffers();
  useSyncUser();

  return (
    <div className="space-y-4">
      <NotificationList />
      {offersData && (
        <div>
          {offersData.data.map(offer => (
            <div key={offer.url}>{JSON.stringify(offer)}</div>
          ))}
        </div>
      )}
    </div>
  );
};
