import type { ErrorResponse, SuccessResponse } from "@fetcher-web/lib";
import { fetchApi } from "@fetcher-web/lib";
import { useQuery } from "@tanstack/react-query";

export type JobOffer = {
  title: string;
  requiredSkills: string;
  createdAt: string;
  url: string;
  fromPln: number;
  toPln: number;
  publishedAt: string;
};

type JobOffers = JobOffer[];

export const useFetchTodaysNewOffers = (tags: string[] | undefined) =>
  useQuery<SuccessResponse<JobOffers>, ErrorResponse>({
    queryKey: [`get-todays-new-offers:${tags}`],
    queryFn: async () => {
      const encodedTags = encodeURIComponent(JSON.stringify(tags));
      return await fetchApi<JobOffers>(
        `/api/offers/today?tags=${encodedTags}`,
        {
          method: "GET",
        }
      );
    },
    enabled: !!tags,
    staleTime: 1000 * 60 * 60 * 24, //24 hours
  });
