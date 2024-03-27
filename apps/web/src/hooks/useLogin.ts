import { supabase } from "@fetcher-web/lib";
import type {
  AuthError,
  AuthTokenResponsePassword,
} from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";

type UseLoginProps = {
  email: string;
  password: string;
};

export const useLogin = () =>
  useMutation<AuthTokenResponsePassword, { error: AuthError }, UseLoginProps>({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }) => {
      return await supabase.auth.signInWithPassword({
        email,
        password,
      });
    },
  });
