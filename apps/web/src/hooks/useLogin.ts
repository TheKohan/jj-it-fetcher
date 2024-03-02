import { useMutation } from '@tanstack/react-query';
import { ErrorResponse, SuccessResponse, fetchApi } from '@fetcher-web/lib';

type UseLoginProps = {
  email: string;
  password: string;
};

export const useLogin = () =>
  useMutation<SuccessResponse<string>, ErrorResponse, UseLoginProps>({
    mutationKey: ['login'],
    mutationFn: async ({ email, password }) => {
      return await fetchApi<string>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    },
  });
