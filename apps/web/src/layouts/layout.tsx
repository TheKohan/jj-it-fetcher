import type { FC, PropsWithChildren } from "react";
import { Header, Toaster } from "@fetcher-web/components";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-background h-screen">
      <Header />
      <div className="container mx-auto ">
        <div className="py-4">{children}</div>
      </div>
      <Toaster />
    </div>
  );
};
