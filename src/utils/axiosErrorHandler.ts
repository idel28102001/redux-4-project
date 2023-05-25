import { AxiosError } from 'axios';

export interface ErrorBody {
  message: string;
  status: 'error';
}

export async function axiosErrorHandler<T extends () => Promise<D>, D>(cb: T): Promise<D | ErrorBody> {
  try {
    return await cb();
  } catch (e) {
    const isAxiosError = e instanceof AxiosError;
    if (!isAxiosError) throw e;
    return { message: e.message, status: 'error' };
  }
}
