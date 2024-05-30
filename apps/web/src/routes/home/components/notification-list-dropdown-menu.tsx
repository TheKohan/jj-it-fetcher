import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icons,
} from "@fetcher-web/components";
import { useToast } from "@fetcher-web/components/ui/use-toast";
import type { JobNotification } from "@fetcher-web/hooks";
import { useSendDiscordNotification } from "@fetcher-web/hooks/use-send-discord-notification";
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
  const { toast } = useToast();
  const { mutate: sendDiscordNotification } = useSendDiscordNotification({
    onSuccess: () => {
      toast({
        title: "Notification Sent sucessfully!",
        description:
          "You will now receive notifications for the tags you added",
        type: "foreground",
      });
    },
    onError: error => {
      toast({
        title: "Failed to send notification!",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Icons.menu className="h6 w6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => sendDiscordNotification({ id: notification.id })}
        >
          Send Notification
        </DropdownMenuItem>
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
