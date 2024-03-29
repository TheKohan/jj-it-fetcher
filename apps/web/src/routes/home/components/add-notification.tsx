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
} from "@fetcher-web/components";
import { useToast } from "@fetcher-web/components/ui/use-toast";
import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

type NotificationType = "discord" | "email";

type Inputs = {
  notificationType: NotificationType;
  tags: string[];
};

export const AddNotification = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      tags: [],
      notificationType: "discord",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = data => {
    //TODO: Add the notification factor
    console.log("SUBMITTED");
    toast({
      title: "Notification Factor Added",
      description: "You will now receive notifications for the tags you added",
      type: "foreground",
    });
    console.log(data);
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
              <p className="col-span-3 col-start-2 text-destructive mt-2 text-xs">
                {errors.tags?.message}
              </p>
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
