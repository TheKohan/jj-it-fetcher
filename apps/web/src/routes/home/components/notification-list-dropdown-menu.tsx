import {
  Button,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Icons,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@fetcher-web/components";
import type { JobNotification } from "@fetcher-web/hooks";
import type { FC } from "react";

type NotificationListDropdownMenuProps = {
  onDelete: () => void;
  notification: JobNotification;
};

export const NotificationListDropdownMenu: FC<
  NotificationListDropdownMenuProps
> = ({ onDelete, notification }) => {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <Icons.menu className="h6 w6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem>Inspect</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Job Result Inspection</DialogTitle>
          <DialogDescription>
            <div>
              Job results for tags:{" "}
              {notification.tags.map(tag => tag.name).join(", ")}
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">sda</div>
        <DialogFooter>
          <Button onClick={() => {}} type="button">
            Add Factor
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
