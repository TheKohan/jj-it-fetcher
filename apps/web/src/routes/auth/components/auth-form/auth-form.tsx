import { Button } from "@fetcher-web/components/ui/button";
import { Icons } from "@fetcher-web/components/ui/icons";
import { Input } from "@fetcher-web/components/ui/input";
import { Label } from "@fetcher-web/components/ui/label";
import { cn } from "@fetcher-web/lib/utils";
import * as React from "react";

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
	formType: "login" | "signup";
}

export const AuthForm: React.FC<AuthFormProps> = ({
	className,
	formType,
	...props
}) => {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const submitText = formType === "login" ? "Login" : "Sign Up";

	const onSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	};

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<form onSubmit={onSubmit}>
				<div className="grid gap-2">
					<div className="grid gap-2">
						<div>
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								placeholder="name@example.com"
								type="email"
								autoCapitalize="none"
								autoComplete="email"
								autoCorrect="off"
								disabled={isLoading}
							/>
						</div>
						<div>
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								autoCorrect="off"
								disabled={isLoading}
							/>
						</div>
					</div>
					<Button disabled={isLoading}>
						{isLoading && (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						{submitText}
					</Button>
				</div>
			</form>
		</div>
	);
};
