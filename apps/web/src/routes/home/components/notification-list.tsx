import {
  Badge,
  CardDescription,
  CardHeader,
  CardTitle,
  Icons,
  Skeleton,
} from "@fetcher-web/components";
import {
  useDeleteNotification,
  useFetchNotifications,
} from "@fetcher-web/hooks";
import { AddNotification } from "./add-notification";
import { NotificationListDropdownMenu } from "./notification-list-dropdown-menu";

export const NotificationList = () => {
  const { data: notificationData, isLoading } = useFetchNotifications();
  const { mutate: deleteNotification } = useDeleteNotification();

  return (
    <CardHeader>
      <CardTitle>
        <div className="flex justify-between">
          <div>Notifications</div>
          <div>
            <AddNotification />
          </div>
        </div>
      </CardTitle>
      <CardDescription>
        The list of currently quequed notifications (all will be fired at 9.00
        AM UTC)
      </CardDescription>
      <div className="grid gap-4 divide-x-4 pt-2">
        {isLoading ? (
          <>
            <Skeleton className="w-full h-[50px]" />
            <Skeleton className="w-full h-[50px]" />
            <Skeleton className="w-full h-[50px]" />
          </>
        ) : (
          <>
            {notificationData ? (
              <>
                {[...notificationData.discordNotification].map(notification => (
                  <div
                    key={notification.id}
                    className="rounded-l items-center flex text-card-foreground shadow-sm px-4 py-2 border"
                  >
                    <Icons.discord className="h-6 w-6 mr-4 flex-shrink-0 text-purple-400" />
                    <div className="m-1">
                      {notification.tags.map(tag => (
                        <Badge className="m-1" key={tag.name}>
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                    <div className="ml-auto">
                      <NotificationListDropdownMenu
                        notification={notification}
                        onDelete={() =>
                          deleteNotification({
                            id: notification.id,
                            type: "discord",
                          })
                        }
                      />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </CardHeader>
  );
};
