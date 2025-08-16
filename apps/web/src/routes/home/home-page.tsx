import { useSyncUser } from "@fetcher-web/hooks/use-sync-user";
import type { FC } from "react";
import { NotificationList } from "./components";

export const HomePage: FC = () => {
  useSyncUser();

  return (
    <div className="space-y-4">
      <NotificationList />
    </div>
  );
};
