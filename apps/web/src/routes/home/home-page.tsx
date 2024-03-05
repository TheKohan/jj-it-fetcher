import { fetchApi } from "@fetcher-web/lib";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";

export const HomePage: FC = () => {
  const { data } = useQuery({
    queryKey: ["le"],
    queryFn: () => {
      return fetchApi("/api/notifications/", { method: "GET" });
    },
  });
  return (
    <div>
      <h1>HomePage</h1>
      {data && <div>{data}</div>}
    </div>
  );
};
