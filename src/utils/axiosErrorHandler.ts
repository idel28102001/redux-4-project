import { AxiosError } from 'axios';

export type MessageInfo = {
  message: string;
  status: 'error' | 'success';
};

export async function axiosErrorHandler<R, T extends () => Promise<MessageInfo | Response | R>>(
  cb: T
): Promise<MessageInfo | Response | R> {
  try {
    return await cb();
  } catch (e) {
    const isAxiosError = e instanceof AxiosError;
    if (!isAxiosError) throw e;
    return { message: e.message, status: 'error' };
  }
}
