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

export const useFetchNewNewOffers = (tags: string[] | undefined) =>
  useQuery<SuccessResponse<JobOffers>, ErrorResponse>({
    queryKey: [`get-new-new-offers:${tags}`],
    queryFn: async () => {
      const encodedTags = encodeURIComponent(JSON.stringify(tags));
      return await fetchApi<JobOffers>(`/api/offers/new?tags=${encodedTags}`, {
        method: "GET",
      });
    },
    enabled: !!tags,
    staleTime: 1000 * 60 * 60 * 24, //24 hours
  });
