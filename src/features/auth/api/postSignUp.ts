import { axios } from '@/lib/axios.ts';

interface PostSignUp {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

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
  return axios.post<never, PostSignUp, PostSignUpBody>(url, body, {
    signal,
  });
};
