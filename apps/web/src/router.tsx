import { useSession } from "@fetcher-web/context";
import type { FC, PropsWithChildren } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { Layout } from "./layouts";
import { LoginPage, SignUpPage } from "./routes/auth";
import { HomePage } from "./routes/home";
import { DetailsPage } from "./routes";

export type ProtectedRouteProps = {
  /**
   * If `true`, the protection logic will be inverted, and routes will only be accessible if the user is not authenticated.
   */
  inverted?: boolean;
} & PropsWithChildren;

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  inverted = false,
}) => {
  const { isAuth } = useSession();

  if (!inverted && !isAuth) {
    return <Navigate to="/login" />;
  }

  if (inverted && isAuth) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute inverted>
        <LoginPage />
      </ProtectedRoute>
    ),
    path: "/login",
  },
  {
    element: (
      <ProtectedRoute inverted>
        <SignUpPage />
      </ProtectedRoute>
    ),
    path: "/register",
  },
  {
    element: (
      <ProtectedRoute>
        <Layout>
          <HomePage />
        </Layout>
      </ProtectedRoute>
    ),
    path: "/",
  },
  {
    element: (
      <ProtectedRoute>
        <Layout backButtonUrl="/">
          <DetailsPage />
        </Layout>
      </ProtectedRoute>
    ),
    path: "/details",
  },
]);
