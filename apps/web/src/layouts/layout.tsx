import { Header, Toaster } from "@fetcher-web/components";
import type { FC, PropsWithChildren } from "react";

type LayoutProps = {
  backButtonUrl?: string;
} & PropsWithChildren;

export const Layout: FC<LayoutProps> = ({ children, backButtonUrl }) => {
  return (
    <div className="bg-background h-screen">
      <Header backButtonUrl={backButtonUrl} />
      <div className="container mx-auto ">
        <div className="py-4">{children}</div>
      </div>
      <Toaster />
    </div>
  );
};
