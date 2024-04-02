import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  Icons,
  Badge,
  Skeleton,
  Button,
} from "@fetcher-web/components";
import {
  useDeleteNotification,
  useFetchNotifications,
} from "@fetcher-web/hooks";

export const NotificationList = () => {
  const { data: notificationData, isLoading } = useFetchNotifications();
  const { mutate: deleteNotification } = useDeleteNotification();

  return (
    <Card>
      <CardHeader>
        <CardTitle> Notifications</CardTitle>
        <CardDescription>
          The list of currently quequed notifications
        </CardDescription>
        <div className="grid gap-4 divide-x-4">
          {isLoading ? (
            <>
              <Skeleton className="w-full h-[30px] rounded-full" />
              <Skeleton className="w-full h-[30px] rounded-full" />
              <Skeleton className="w-full h-[30px] rounded-full" />
            </>
          ) : (
            <>
              {notificationData ? (
                <>
                  {[...notificationData.discordNotification].map(
                    notification => (
                      <div
                        key={notification.id}
                        className="rounded-l items-center flex text-card-foreground shadow-sm px-4 py-2"
                      >
                        <Icons.discord className="h-6 w-6 mr-4 flex-shrink-0 text-purple-400" />
                        <div>
                          {notification.tags.map(tag => (
                            <Badge key={tag.name} className="mr-2">
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                        <Button
                          onClick={() =>
                            deleteNotification({
                              id: notification.id,
                              type: "discord",
                            })
                          }
                          variant="ghost"
                          className="ml-auto"
                        >
                          <Icons.delete className="h-6 w-6 inline text-red-400" />
                        </Button>
                      </div>
                    )
                  )}
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
                <></>
              )}
            </>
          )}
        </div>
      </CardHeader>
    </Card>
  );
};
