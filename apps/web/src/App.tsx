import { RouterProvider } from "react-router-dom";

import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import "./globals.css";
import { AuthProvider } from "./context";
import { isApiErrorResponse } from "./lib";
import { router } from "./router";

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error: any) => {
      if (isApiErrorResponse(error)) {
        const status = error.status;
        if (status === 401 || status === 403) {
          window.location.href = "/login";
          return;
        }
        if (status === 404) {
          window.location.href = "/404";
          return;
        }
        if (status.toString().startsWith("5")) {
          /**  @TODO Implement some kind of global error page  */
          window.location.href = "/500";
          return;
        }
      }
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
};
