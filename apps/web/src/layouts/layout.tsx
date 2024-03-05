import type { FC, PropsWithChildren } from "react";
import { Header } from "@fetcher-web/components";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header name="The-Job" />
      <div className="container mx-auto">
        <div className="py-4">{children}</div>
      </div>
    </>
  );
};
