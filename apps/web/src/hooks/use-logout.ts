import type { ErrorResponse } from "@fetcher-web/lib";
import { supabase } from "@fetcher-web/lib";
import type { AuthError } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () =>
  useMutation<{ error: AuthError | null }, ErrorResponse>({
    mutationKey: ["logout"],
    mutationFn: async () => {
      return await supabase.auth.signOut();
    },
  });
