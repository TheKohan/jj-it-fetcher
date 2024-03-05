import { getSession } from "./utils";

const apiUrl = "http://localhost:8000";

export type SuccessResponse<T> = {
  data: T;
};

export type ErrorResponse = {
  error: string;
  status: number;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export const fetchApi: <T>(
  url: string,
  options: RequestInit
) => Promise<SuccessResponse<T>> = async (url, options: RequestInit) => {
  const session = getSession();

  const baseHeaders = new Headers({});

  if (session) {
    baseHeaders.append("Authorization", `Bearer ${session.access_token}`);
  }

  const baseBody = {
    "Content-Type": "application/json",
    headers: baseHeaders,
  };

  const response = await fetch(`${apiUrl}${url}`, {
    ...baseBody,
    ...options,
  });
  const data = await response.json();
  if (!response.ok) {
    return Promise.reject(data);
  }
  return data;
};
