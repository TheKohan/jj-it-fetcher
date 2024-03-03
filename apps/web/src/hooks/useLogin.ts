import type { ErrorResponse } from "@fetcher-web/lib";
import { supabase } from "@fetcher-web/lib/supabase";
import type { AuthTokenResponsePassword } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";

type UseLoginProps = {
  email: string;
  password: string;
};

export const useLogin = () =>
  useMutation<AuthTokenResponsePassword, ErrorResponse, UseLoginProps>({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }) => {
      return await supabase.auth.signInWithPassword({ email, password });
    },
  });
