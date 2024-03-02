import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage, LoginPage, SignUpPage } from "@fetcher-web/routes";

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

export const App = () => {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};
