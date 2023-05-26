import { AxiosError } from 'axios';

export type ErrorBody<D = unknown> = {
  message?: string;
  status: 'error' | 'success';
  data?: D | null;
};

export async function axiosErrorHandler<R, T extends () => Promise<ErrorBody<R> | Response>>(
  cb: T
): Promise<ErrorBody<R> | Response> {
  try {
    return await cb();
  } catch (e) {
    const isAxiosError = e instanceof AxiosError;
    if (!isAxiosError) throw e;
    return { message: e.message, status: 'error', data: undefined };
  }
}
