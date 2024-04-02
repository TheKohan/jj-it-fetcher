import type { FC } from "react";
import { Button } from "./button";
import { useLogout } from "@fetcher-web/hooks";

interface HeaderProps {
  name: string;
}

export const Header: FC<HeaderProps> = ({ name }) => {
  const { mutate: mutateLogout } = useLogout();
  return (
    <div className="container flex items-center justify-between py-4">
      <div className="text-primary text-lg px-2">{name}</div>
      <Button variant="default" onClick={() => mutateLogout()}>
        Logout
      </Button>
    </div>
  );
};
