import { useLogout } from "@fetcher-web/hooks";
import type { FC } from "react";
import { Button } from "./button";
import { Icons } from "./icons";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  backButtonUrl?: string;
};

export const Header: FC<HeaderProps> = ({ backButtonUrl }) => {
  const { mutate: mutateLogout } = useLogout();
  const navigate = useNavigate();
  return (
    <div className="container flex items-center justify-between py-4">
      {backButtonUrl && (
        <div className="text-primary text-lg px-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate(backButtonUrl)}
          >
            <Icons.backArrow className="mr-4 h-8 w-8" />
            Go Back
          </Button>
        </div>
      )}
      <div className="font-extrabold text-2xl tracking-tighter">
        <span className=" text-blue-500">jj-it-</span>Fetcher
      </div>
      <Button variant="ghost" onClick={() => mutateLogout()}>
        Logout
      </Button>
    </div>
  );
};
