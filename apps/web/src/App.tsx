import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage, LoginPage } from "@fetcher-web/routes";

const router = createBrowserRouter([
	{
		element: <HomePage />,
		path: "/",
	},
	{
		element: <LoginPage />,
		path: "/login",
	},
]);

export const App = () => {
	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
};
