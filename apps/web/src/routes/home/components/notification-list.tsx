import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  Icons,
  Badge,
  Skeleton,
} from "@fetcher-web/components";
import { useFetchNotifications } from "@fetcher-web/hooks";

export const NotificationList = () => {
  const { data: notificationData } = useFetchNotifications();

  return (
    <Card>
      <CardHeader>
        <CardTitle> Notifications</CardTitle>
        <CardDescription>
          The list of currently quequed notifications
        </CardDescription>
        <div className="grid gap-4">
          {notificationData ? (
            <>
              {[...notificationData.discordNotification].map(notification => (
                <div className="rounded-lg border bg-secondary text-card-foreground shadow-sm px-4 py-2">
                  <Icons.discord className="h-6 w-6 inline mr-4 text-purple-400" />
                  {notification.tags.map(tag => (
                    <Badge className="mr-2">{tag.name}</Badge>
                  ))}
                </div>
              ))}
              {[...notificationData.emailNotification].map(notification => (
                <div className="rounded-lg border bg-secondary text-card-foreground shadow-sm px-4 py-2">
                  <Icons.email className="h-6 w-6 inline mr-4" />
                  {notification.tags.map(tag => (
                    <Badge className="mr-2">{tag.name}</Badge>
                  ))}
                </div>
              ))}
            </>
          ) : (
            <>
              <Skeleton className="w-full h-[30px] rounded-full" />
              <Skeleton className="w-full h-[30px] rounded-full" />
              <Skeleton className="w-full h-[30px] rounded-full" />
            </>
          )}
        </div>
      </CardHeader>
    </Card>
  );
};
