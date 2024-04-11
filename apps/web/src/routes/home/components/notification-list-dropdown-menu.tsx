import {
  Button,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Icons,
} from "@fetcher-web/components";
import type { FC } from "react";

type NotificationListDropdownMenuProps = {
  onDelete: () => void;
  onInspect: () => void;
};

export const NotificationListDropdownMenu: FC<
  NotificationListDropdownMenuProps
> = ({ onDelete, onInspect }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Icons.menu className="h6 w6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onInspect}>Inspect</DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
