import {
  Button,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  TagInput,
  Label,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  type Tag,
  Input,
} from "@fetcher-web/components";
import { useToast } from "@fetcher-web/components/ui/use-toast";
import { useAddNotification } from "@fetcher-web/hooks";
import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

type NotificationType = "discord" | "email";

type Inputs = {
  notificationType: NotificationType;
  uri: string;
  tags: Tag[];
};

export const AddNotification = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const { mutate: addNotification } = useAddNotification({
    onSuccess: () => {
      toast({
        title: "Notification Factor Added",
        description:
          "You will now receive notifications for the tags you added",
        type: "foreground",
      });
    },
    onError: error => {
      toast({
        title: "Failed to add notification factor",
        description: error.error,
        variant: "destructive",
      });
    }
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      tags: [],
      notificationType: "discord",
    },
  });

  const notificationTypeWatch = watch("notificationType");

  const onSubmit: SubmitHandler<Inputs> = data => {
    addNotification({
      type: data.notificationType,
      tags: data.tags.map(t => t.text),
      uri: data.uri,
    });
  };

  const resetForm = () => {
    reset();
    setTags([]);
  };

  const handleOpen = (open: boolean) => {
    setOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const errorMessages = Array.from(Object.values(errors)).map(
    ({ message }) => message
  );

  return (
    <form noValidate>
      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogTrigger asChild>
          <Button type="button" variant="default">
            Add Notification Factor
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Notification Factor</DialogTitle>
            <DialogDescription>
              Add a new notification factor to your account. Pick the keywords
              you want the job offer to contain, they are additive, the more you
              add, the more offers you will receive.
              <li>After each tag, click enter to confirm selection.</li>
              <li>
                For Discord Notification, you need to provide a webhook URI. Go
                to the Integrations page on your Discord server settings and
                click Create Webhook
              </li>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Factor
              </Label>
              <Controller
                name="notificationType"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => {
                  const { ref, onChange, ...restFields } = field;
                  return (
                    <Select onValueChange={onChange} {...restFields}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Choose notification factor" />
                      </SelectTrigger>
                      <SelectContent defaultValue={"discord"}>
                        <SelectItem value="discord">
                          Discord Notification
                        </SelectItem>
                        <SelectItem disabled value="email">
                          Email - coming soon...
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Tags
              </Label>
              <div className="col-span-3">
                <Controller
                  name="tags"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Provide at least one tag",
                    },
                  }}
                  render={({ field }) => {
                    const { ref, onChange, ...restFields } = field;

                    return (
                      <TagInput
                        tags={tags}
                        setTags={tags => {
                          onChange(tags);
                          setTags(tags);
                        }}
                        {...restFields}
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                {notificationTypeWatch === "discord" ? "Webhook URI" : "Email"}
              </Label>
              <Input
                className="col-span-3"
                {...register("uri", {
                  required: {
                    value: true,
                    message: "Please provide webhook URI",
                  },
                  pattern:
                    notificationTypeWatch === "discord"
                      ? {
                          value: /https:\/\/discord\.com\/api\/webhooks\/[^/]+/,
                          message: "Please enter a valid Discord Webhook URI",
                        }
                      : {
                          value: /\S+@\S+\.\S+/,
                          message: "Please enter a valid email address",
                        },
                })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              {errorMessages.map(message => (
                <p
                  key={message}
                  className="col-span-3 col-start-2 text-destructive text-xs"
                >
                  * {message}
                </p>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit(onSubmit)} type="button">
              Add Factor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
};
