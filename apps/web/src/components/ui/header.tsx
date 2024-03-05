import type { FC } from "react";
import { Button } from "./button";
import { useLogout } from "@fetcher-web/hooks";

interface HeaderProps {
  name: string;
}

export const Header: FC<HeaderProps> = ({ name }) => {
  const { mutate: mutateLogout } = useLogout();
  return (
    <div className="flex items-center justify-between bg-primary p-2">
      <div className="text-muted text-lg px-2">{name}</div>
      <Button variant="default" onClick={() => mutateLogout()}>
        Logout
      </Button>
    </div>
  );
};
