import { getSession } from "./utils";

const apiUrl = "http://localhost:8000";

export type SuccessResponse<T> = {
  data: T;
};

export type ErrorResponse = {
  message: string;
  status: number;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export class ResponseError extends Error {
  status: string;

  constructor(message: string, status: string) {
    super(message);
    this.status = status;
  }
}

export const isApiErrorResponse = (
  response: ApiResponse<unknown>
): response is ErrorResponse => {
  return (response as ErrorResponse).message !== undefined;
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

  try {
    data = await response.json();
  } catch (e) {
    console.log(e);
  }

  if (!response.ok) {
    throw new ResponseError(data.error, data.status);
  }

  return data;
};
