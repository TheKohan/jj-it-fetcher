import { Header, Toaster } from "@fetcher-web/components";
import type { FC, PropsWithChildren } from "react";

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
