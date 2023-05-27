import { NoInfer } from 'react-redux';
import { ActionReducerMapBuilder, AsyncThunk, createAsyncThunk, Draft, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, FormSignInProps, FormSignUpProps } from '@/store/reducers/auth/index.ts';
import { postSignUp } from '@/features/auth/api/postSignUp.ts';
import { postSignIn } from '@/features/auth/api/postSignIn.ts';
import { putEditUser, PutUser } from '@/features/auth/api/putEditUser.ts';
import { ErrorDataTypes, handleValidateError } from '@/utils/formHandlerHeplers.ts';
import { AxiosResponse } from 'axios';
import { ResponseUser } from '@/features/auth/api/types.ts';

function extraReduceWrapper<R, S extends AuthState, T extends AsyncThunk<R, any, any>>(
  builder: ActionReducerMapBuilder<NoInfer<S>>,
  thunkCB: T & AsyncThunk<R, any, any>,
  fulfilledCB: (state: Draft<S>, action: PayloadAction<R>) => void
) {
  return builder
    .addCase(thunkCB.fulfilled, fulfilledCB)
    .addCase(thunkCB.rejected, (state, action: any) => {
      const typedAction = action as never as PayloadAction<ErrorDataTypes>;

      state.form.status = 'failed';
      state.form.errors = typedAction.payload;
    })
    .addCase(thunkCB.pending, (state) => {
      state.form.status = 'loading';
      state.form.errors = {};
    });
}

export const asyncAction = <
  D,
  R,
  F extends (args: D) => Promise<AxiosResponse<R, any>> = (args: D) => Promise<AxiosResponse<R, any>>
>(
  prefix: string,
  cb: F,
  obj: { successMessage: string; errorMessage: string } = { successMessage: 'Success', errorMessage: 'Error' }
) => {
  return createAsyncThunk(prefix, async (data: D, thunkAPI) => {
    try {
      const result = await cb(data);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return thunkAPI.fulfillWithValue(result.data, { message: obj.successMessage });
    } catch (e) {
      const payload = handleValidateError(e);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return thunkAPI.rejectWithValue(payload, { message: obj.errorMessage });
    }
  });
};

export const signUpAction = asyncAction<FormSignUpProps, ResponseUser>(
  'auth/sign-up',
  async (user) => {
    return await postSignUp({ user });
  },
  { successMessage: 'You signed up successfully', errorMessage: 'Something went wrong' }
);

export const signInAction = asyncAction<FormSignInProps, ResponseUser>(
  'auth/sign-in',
  async (user) => {
    return await postSignIn({ user });
  },
  { successMessage: 'You logged in successfully', errorMessage: 'Something went wrong' }
);

export const putEditUserAction = asyncAction<Partial<PutUser>, ResponseUser>(
  'auth/put-edit-user',
  async (user) => {
    return await putEditUser({ user });
  },
  { successMessage: 'Edit was success', errorMessage: 'Something went wrong' }
);

export default function (builder: ActionReducerMapBuilder<NoInfer<AuthState>>) {
  const builder1 = extraReduceWrapper(builder, signUpAction, (state, action) => {
    state.form.status = 'succeeded';
    state.isAuth = true;
    state.user = action.payload.user;
  });
  const builder2 = extraReduceWrapper(builder1, signInAction, (state, action) => {
    state.form.status = 'succeeded';
    state.isAuth = true;
    state.user = action.payload.user;
  });
  const builder3 = extraReduceWrapper(builder2, putEditUserAction, (state, action) => {
    state.form.status = 'succeeded';
    state.user = action.payload.user;
  });
  return builder3;
}
