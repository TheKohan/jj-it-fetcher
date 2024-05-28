import { type SuccessResponse, fetchApi } from "@fetcher-web/lib";
import type { AuthError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

type UseSyncUserResponse = {
  message: string;
};

export const GET_SYNC_USER_QUERY_KEY = "sync-user";

/**
 *  This hook synces users in Supabase Auth and Prisma user table
 */
export const useSyncUser = () =>
  useQuery<SuccessResponse<UseSyncUserResponse>, { error: AuthError }>({
    queryKey: [GET_SYNC_USER_QUERY_KEY],
    queryFn: async () => {
      return await fetchApi<UseSyncUserResponse>('/users/sync-user', {
        method: "DELETE",
      });
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
