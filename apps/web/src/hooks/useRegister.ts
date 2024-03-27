import { supabase } from "@fetcher-web/lib";
import type { AuthError, AuthResponse } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";

type UseRegisterProps = {
  email: string;
  password: string;
};

export const useRegister = () =>
  useMutation<AuthResponse, { error: AuthError }, UseRegisterProps>({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }) => {
      return await supabase.auth.signUp({
        email,
        password,
      });
    },
  });
