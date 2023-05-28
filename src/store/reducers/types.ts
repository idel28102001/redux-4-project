import { PayloadAction } from '@reduxjs/toolkit';

export type ActionResponse<P, A> =
  | PayloadAction<P, string, { arg: A; requestId: string; requestStatus: 'fulfilled'; message?: string }, never>
  | PayloadAction<
      unknown,
      string,
      {
        arg: A;
        requestId: string;
        requestStatus: 'rejected';
        aborted: boolean;
        condition: boolean;
        message?: string;
      }
    >;
