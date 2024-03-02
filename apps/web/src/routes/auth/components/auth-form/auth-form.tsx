import { Button } from "@fetcher-web/components/ui/button";
import { Icons } from "@fetcher-web/components/ui/icons";
import { Input } from "@fetcher-web/components/ui/input";
import { Label } from "@fetcher-web/components/ui/label";
import { useLogin } from "@fetcher-web/hooks/useLogin";
import { cn } from "@fetcher-web/lib/utils";
import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
	formType: "login" | "signup";
}

type Inputs = {
	email: string;
	password: string;
};

export const AuthForm: React.FC<AuthFormProps> = ({
	className,
	formType,
	...props
}) => {
	const loginMutation = useLogin();
	const submitText = formType === "login" ? "Login" : "Sign Up";

	const {
		register,
		handleSubmit,
		formState: { errors, isLoading },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) =>
		await loginMutation.mutate(data);

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
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
								{...register("email", {
									required: true,
									pattern:
										formType === "signup"
											? {
													value: /\S+@\S+\.\S+/,
													message: "Please enter a valid email address",
											  }
											: undefined,
								})}
							/>
						</div>
						<p className="text-destructive text-xs">{errors.email?.message}</p>
						<div>
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								autoCorrect="off"
								disabled={isLoading}
								{...register("password", {
									required: true,
									minLength:
										formType === "signup"
											? {
													value: 8,
													message: "Password must be at least 8 characters",
											  }
											: 0,
								})}
							/>
						</div>
						<p className="text-destructive text-xs">
							{errors.password?.message}
						</p>
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
