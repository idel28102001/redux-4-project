import { axios } from '@/lib/axios.ts';
import { AxiosResponse } from 'axios';
import { ResponseUser } from '@/features/auth/api/types.ts';

export interface User {
  username: string;
  email: string;
  password: string;
}

interface PostSignUpBody {
  user: User;
}

export const postSignUp = (body: PostSignUpBody, signal?: AbortSignal) => {
  const url = `users`;
  return axios.post<ResponseUser, AxiosResponse<ResponseUser>, PostSignUpBody>(url, body, {
    signal,
  });
};
