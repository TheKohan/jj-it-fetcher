import { buttonVariants } from "@fetcher-web/components/ui/button";
import { cn } from "@fetcher-web/lib/utils";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { AuthForm } from "../components/auth-form";

export const SignUpPage: FC = () => {
  return (
    <>
      <div className="container relative h-screen flex items-center justify-center">
        <Link
          to="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="font-extrabold text-4xl pb-12 m-auto tracking-tighter">
            <span className=" text-blue-500">jj-it-</span>Fetcher
          </div>
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <AuthForm formType={"signup"} />
        </div>
      </div>
    </>
  );
};
