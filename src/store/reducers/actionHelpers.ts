import { ActionResponse } from '@/store/reducers/types.ts';
import { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

type ActionCallback = (message: string) => void;
export const actionThen = <
  T,
  Res extends ActionCallback = ActionCallback,
  Rej extends ActionCallback = ActionCallback
>({
  res,
  rej,
}: {
  res?: Res;
  rej?: Rej;
}) => {
  return (e: ActionResponse<T>) => {
    switch (e.meta.requestStatus) {
      case 'fulfilled': {
        return res && res(e.meta.message || 'Success');
      }
      case 'rejected': {
        if (e.meta.aborted) return;
        return rej && rej(e.meta.message || 'Reject');
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
