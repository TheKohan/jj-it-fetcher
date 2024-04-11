import type { FC } from "react";
import { Button } from "./button";
import { useLogout } from "@fetcher-web/hooks";

export const Header: FC = () => {
  const { mutate: mutateLogout } = useLogout();
  return (
    <div className="container flex items-center justify-between py-4">
      <div className="text-primary text-lg px-2"> </div>
      <Button variant="ghost" onClick={() => mutateLogout()}>
        Logout
      </Button>
    </div>
  );
};
