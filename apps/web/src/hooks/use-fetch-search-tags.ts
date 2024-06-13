import type { ErrorResponse } from "@fetcher-web/lib";
import { fetchApi } from "@fetcher-web/lib";
import { useQuery } from "@tanstack/react-query";

type SearchTagsResponse = {
  data: string[];
};

export const GET_SEARCH_TAGS_QUERY_KEY = "get-search-tags";

export const useFetchSearchTags = () =>
  useQuery<SearchTagsResponse, ErrorResponse>({
    queryKey: [GET_SEARCH_TAGS_QUERY_KEY],
    queryFn: async () => {
      console.log("fetching search tags");
      return (await fetchApi("/api/offers/tags", {
        method: "GET",
      })) as unknown as SearchTagsResponse;
    },
    staleTime: 1000 * 60 * 60 * 1, //1 hour
  });
