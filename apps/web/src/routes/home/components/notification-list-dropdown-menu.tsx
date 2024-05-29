import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icons,
} from "@fetcher-web/components";
import {
  useFetchTodaysNewOffers,
  type JobNotification,
} from "@fetcher-web/hooks";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";

type NotificationListDropdownMenuProps = {
  onDelete: () => void;
  notification: JobNotification;
};

export const NotificationListDropdownMenu: FC<
  NotificationListDropdownMenuProps
> = ({ onDelete, notification }) => {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Icons.menu className="h6 w6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            navigate({
              pathname: "/details",
              search: `?tags=${notification.tags
                .map(tag => tag.name)
                .join(",")}`,
            })
          }
        >
          Inspect Offers
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
