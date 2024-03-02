const apiUrl = "http://localhost:8000";

export type SuccessResponse<T> = {
	ok: true;
	data: T;
	error: null;
};

export type ErrorResponse = {
	ok: false;
	data: null;
	error: string;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export const fetchApi: <T>(
	url: string,
	options: RequestInit,
) => Promise<ApiResponse<T>> = async (url, options: RequestInit) => {
	const baseBody = {
		"Content-Type": "application/json",
	};
	const response = await fetch(`${apiUrl}${url}`, { ...baseBody, ...options });
	const data = await response.json();
	if (!response.ok) {
		return Promise.reject(data);
	}
	return await data;
};
