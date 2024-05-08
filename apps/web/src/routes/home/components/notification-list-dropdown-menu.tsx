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
          <DialogTitle>
            {notification.tags.map(tag => tag.name).join(", ")}
          </DialogTitle>
          <DialogDescription>
            Add a new notification factor to your account. Pick the keywords you
            want the job offer to contain, they are additive, the more you add,
            the more offers you will receive.
            <li>After each tag, click enter to confirm selection.</li>
            <li>
              For Discord Notification, you need to provide a webhook URI. Go to
              the Integrations page on your Discord server settings and click
              Create Webhook
            </li>
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
