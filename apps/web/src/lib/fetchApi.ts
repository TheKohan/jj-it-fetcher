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

export const isApiErrorResponse = (
  response: ApiResponse<unknown>
): response is ErrorResponse => {
  return (response as ErrorResponse).error !== undefined;
};

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

  let data = undefined;

  if (response.ok) {
    try {
      data = await response.json();
    } catch (e) {
      console.log(e);
    }
  } else {
    return Promise.reject(data);
  }

  return data;
};
