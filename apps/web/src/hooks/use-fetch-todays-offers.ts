import type { ErrorResponse, SuccessResponse } from "@fetcher-web/lib";
import { fetchApi } from "@fetcher-web/lib";
import { useMutation } from "@tanstack/react-query";

type JobOffer = {
  title: string;
  requiredSkills: string;
  createdAt: string;
  url: string;
  fromPln: number;
  toPln: number;
};

type JobOffers = JobOffer[];

export const useFetchTodaysNewOffers = () =>
  useMutation<SuccessResponse<JobOffers>, ErrorResponse, string[]>({
    mutationKey: ["get-todays-offers"],
    mutationFn: async body => {
      return await fetchApi<JobOffers>("/api/offers/today", {
        method: "POST",
        body: JSON.stringify(body),
      });
    },
  });
