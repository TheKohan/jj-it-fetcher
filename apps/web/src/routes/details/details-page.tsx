import { Skeleton } from "@fetcher-web/components";
import { useFetchNewNewOffers } from "@fetcher-web/hooks";
import type { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { OffersTable } from "./components";

export const DetailsPage: FC = () => {
  const [params] = useSearchParams();

  // @TODO can implement a high level wrapper for routing,
  // params and parsing query strings of different types
  const { data, isLoading } = useFetchNewNewOffers(
    params.get("tags")?.split(",")
  );

  const offers = data?.data;

  return (
    <div className="space-y-4">
      <h1 className="scroll-m-20 text-2xl font-bold  lg:text-3xl">
        New offers for: {params.get("tags")?.split(",").join(", ")}
      </h1>
      {isLoading ? (
        <>
          <Skeleton className="w-[100px] ml-auto h-[40px]" />
          <Skeleton className="w-full h-[40px]" />
          <Skeleton className="w-full h-[50px]" />
          <Skeleton className="w-full h-[50px]" />
          <Skeleton className="w-full h-[50px]" />
          <Skeleton className="w-full h-[50px]" />
          <Skeleton className="w-full h-[50px]" />
          <Skeleton className="w-full h-[40px]" />
          <Skeleton className="w-full h-[50px]" />
          <Skeleton className="w-full h-[50px]" />
          <Skeleton className="w-full h-[50px]" />
        </>
      ) : (
        <OffersTable offers={offers ?? []} />
      )}
    </div>
  );
};
