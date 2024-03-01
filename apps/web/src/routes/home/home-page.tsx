import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage: FC = () => {
	const navigate = useNavigate();

	return (
		<div>
			<h1>HomePage</h1>
			<div>
				<button type="button" onClick={() => navigate("/login")}>
					Navigate to Login Page
				</button>
			</div>
		</div>
	);
};
