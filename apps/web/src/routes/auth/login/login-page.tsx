import { buttonVariants } from "@fetcher-web/components";
import { cn } from "@fetcher-web/lib/utils";
import { Link } from "react-router-dom";
import { AuthForm } from "../components";
import type { FC } from "react";

export const LoginPage: FC = () => {
  return (
    <>
      <div className="container relative h-screen flex items-center justify-center">
        <Link
          to="/register"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Sign Up
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Login to your account
            </h1>
          </div>
          <AuthForm formType={"login"} />
        </div>
      </div>
    </>
  );
};
