import { Button, Icons, Input, Label } from "@fetcher-web/components";
import { useLogin, useRegister } from "@fetcher-web/hooks";
import { cn } from "@fetcher-web/lib/utils";
import type * as React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  formType: "login" | "signup";
}

type Inputs = {
  email: string;
  password: string;
};

export const AuthForm: React.FC<AuthFormProps> = ({
  className,
  formType,
  ...props
}) => {
  const {
    mutate: loginMutation,
    data: loginData,
    isPending: loginPending,
  } = useLogin();
  const {
    mutate: registerMutation,
    isPending: registerPending,
    data: registerData,
  } = useRegister();

  const isPending = formType === "login" ? loginPending : registerPending;

  const error = formType === "login" ? loginData?.error : registerData?.error;

  const submitText = formType === "login" ? "Login" : "Sign Up";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    if (formType === "login") {
      await loginMutation(data);
    } else {
      await registerMutation(data);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isPending}
                {...register("email", {
                  required: true,
                  pattern:
                    formType === "signup"
                      ? {
                          value: /\S+@\S+\.\S+/,
                          message: "Please enter a valid email address",
                        }
                      : undefined,
                })}
              />
            </div>
            <p className="text-destructive text-xs">{errors.email?.message}</p>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoCorrect="off"
                disabled={isPending}
                {...register("password", {
                  required: true,
                  minLength:
                    formType === "signup"
                      ? {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        }
                      : 0,
                })}
              />
            </div>
            <p className="text-destructive text-xs">
              {errors.password?.message}
            </p>
            {error && (
              <p className="text-destructive text-xs">{error.message}</p>
            )}
          </div>
          <Button disabled={isPending}>
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {submitText}
          </Button>
        </div>
      </form>
    </div>
  );
};
