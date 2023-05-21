import { axios } from '@/lib/axios.ts';
import { AxiosResponse } from 'axios';
import { ResponseUser } from '@/features/auth/api/types.ts';

export interface User {
  email: string;
  password: string;
}

interface PostSignUpBody {
  user: User;
}

export const postSignIn = (body: PostSignUpBody, signal?: AbortSignal) => {
  const url = `users/login`;
  return axios.post<ResponseUser, AxiosResponse<ResponseUser>, PostSignUpBody>(url, body, {
    signal,
  });
};
