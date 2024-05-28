import { supabase } from "@fetcher-web/lib";
import type {
  AuthError,
  AuthTokenResponsePassword,
} from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_SYNC_USER_QUERY_KEY } from "./use-sync-user";

type UseLoginProps = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AuthTokenResponsePassword,
    { error: AuthError },
    UseLoginProps
  >({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }) => {
      return await supabase.auth.signInWithPassword({
        email,
        password,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_SYNC_USER_QUERY_KEY],
      });
    },
  });
};
