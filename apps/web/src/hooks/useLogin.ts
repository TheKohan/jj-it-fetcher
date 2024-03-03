import { type ErrorResponse, fetchApi } from "@fetcher-web/lib";
import { type UserResponse, createClient } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";

type UseLoginProps = {
  email: string;
  password: string;
};

const supabase = createClient(
  "https://cjjyyixxymseeioqtpfu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqanl5aXh4eW1zZWVpb3F0cGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1ODY2NjMsImV4cCI6MjAyMzE2MjY2M30.IsXr5Cc0RwqQR-BwZw7WTeHlMCC6FDXFxZh2mI-vi9w"
);

export const useLogin = () =>
  useMutation<UserResponse, ErrorResponse, UseLoginProps>({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }) => {
      // const data = await supabase.auth.getUser();
      // console.log(data);

      // return data;
      // return await supabase.auth.signInWithPassword({ email, password });
      return await fetchApi<string>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
    },
  });
