import { PayloadAction } from '@reduxjs/toolkit';

export type ActionResponse<T> =
  | PayloadAction<T, string, { arg: number; requestId: string; requestStatus: 'fulfilled'; message?: string }, never>
  | PayloadAction<
      unknown,
      string,
      {
        arg: number;
        requestId: string;
        requestStatus: 'rejected';
        aborted: boolean;
        condition: boolean;
        message?: string;
      }
    >;
