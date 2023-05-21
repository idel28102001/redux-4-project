import { axios } from '@/lib/axios.ts';
import { AxiosResponse } from 'axios';
import { ResponseUser } from '@/features/auth/api/types.ts';

export const getUser = (signal?: AbortSignal) => {
  const url = `user`;
  return axios.get<ResponseUser, AxiosResponse<ResponseUser>>(url, {
    signal,
  });
};
