import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage, LoginPage, SignUpPage } from "@fetcher-web/routes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./globals.css";

const router = createBrowserRouter([
	{
		element: <HomePage />,
		path: "/",
	},
	{
		element: <LoginPage />,
		path: "/login",
	},
	{
		element: <SignUpPage />,
		path: "/register",
	},
]);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
};
