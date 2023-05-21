import { axios } from '@/lib/axios.ts';
import { AxiosResponse } from 'axios';
import { ResponseUser } from '@/features/auth/api/types.ts';

export interface PutUser {
  email: string;
  password: string;
  username: string;
  bio: string;
  image: string;
}

export interface PutEditUser {
  user: Partial<PutUser>;
}

export const putEditUser = (body: PutEditUser, signal?: AbortSignal) => {
  const url = `user`;
  return axios.put<ResponseUser, AxiosResponse<ResponseUser>, PutEditUser>(url, body, {
    signal,
  });
};
