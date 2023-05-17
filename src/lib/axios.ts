import Axios, { InternalAxiosRequestConfig } from 'axios';
import { API_URL } from '@/config';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token: string | undefined = undefined;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.Accept = '';
  return config;
}

export const axios = Axios.create({ baseURL: API_URL });
axios.interceptors.request.use(authRequestInterceptor);
