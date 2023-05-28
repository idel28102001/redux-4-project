import { ActionResponse } from '@/store/reducers/types.ts';
import { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

type ActionCallback<T = unknown> = (message: string, arg: T) => void;
export const actionThen = <
  P,
  A,
  Res extends ActionCallback<P> = ActionCallback<P>,
  Rej extends ActionCallback = ActionCallback
>({
  res,
  rej,
}: {
  res?: Res;
  rej?: Rej;
}) => {
  return (e: ActionResponse<P, A>) => {
    console.log(e.payload);
    switch (e.meta.requestStatus) {
      case 'fulfilled': {
        return res && res(e.meta.message || 'Success', e.payload as P);
      }
      case 'rejected': {
        if (e.meta.aborted) return;
        return rej && rej(e.meta.message || 'Reject', e.payload);
      }
      default:
        throw new Error('The requestStatus is not recognised');
    }
  };
};

export const asyncAction = <
  D,
  R,
  Rej extends (e: unknown) => any = (e: unknown) => any,
  F extends (args: D, signal?: AbortSignal) => Promise<AxiosResponse<R, any>> = (
    args: D,
    signal?: AbortSignal
  ) => Promise<AxiosResponse<R, any>>
>(
  prefix: string,
  cb: F,
  rejectHandler?: Rej,
  obj: { successMessage: string; errorMessage: string } = { successMessage: 'Success', errorMessage: 'Error' }
) => {
  return createAsyncThunk(prefix, async (data: D, thunkAPI) => {
    try {
      const result = await cb(data, thunkAPI.signal);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return thunkAPI.fulfillWithValue(result.data, { message: obj.successMessage });
    } catch (e) {
      const payload = rejectHandler && rejectHandler(e);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return thunkAPI.rejectWithValue(payload, { message: obj.errorMessage });
    }
  });
};
