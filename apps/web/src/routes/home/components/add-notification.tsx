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
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  notificationType: "discord" | "email";
  tags: string[];
};

export const AddNotification = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async data => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Notification Factor</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Notification Factor</DialogTitle>
          <DialogDescription>
            Add a new notification factor to your account. Pick the keywords you
            want the job offer to contain, they are additive, the more you add,
            the more offers you will receive.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Factor
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discord">Discord Notification</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Tags
              </Label>
              <div className="col-span-3">
                <TagInput
                  tags={tags}
                  setTags={setTags}
                  {...register("tags", {
                    required: true,
                  })}
                />
              </div>
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button type="submit">Add Factor</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
