import { NoInfer } from 'react-redux';
import { ActionReducerMapBuilder, AsyncThunk, Draft, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, FormSignInProps, FormSignUpProps } from '@/store/reducers/auth/index.ts';
import { postSignUp } from '@/features/auth/api/postSignUp.ts';
import { postSignIn } from '@/features/auth/api/postSignIn.ts';
import { putEditUser, PutUser } from '@/features/auth/api/putEditUser.ts';
import { ErrorDataTypes, handleValidateError } from '@/utils/formHandlerHeplers.ts';
import { ResponseUser } from '@/features/auth/api/types.ts';
import { asyncAction } from '@/store/reducers/actionHelpers.ts';

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

const authAction = <R, F, P extends Parameters<typeof asyncAction<R, F>> = Parameters<typeof asyncAction<R, F>>>(
  prefix: P[0],
  cb: P[1],
  success: string
) => {
  return asyncAction<R, F>(`auth/${prefix}`, cb, handleValidateError, {
    successMessage: success,
    errorMessage: 'Something went wrong',
  });
};

export const signUpAction = authAction<FormSignUpProps, ResponseUser>(
  'sign-up',
  async (user) => {
    return await postSignUp({ user });
  },
  'You signed up successfully'
);

export const signInAction = authAction<FormSignInProps, ResponseUser>(
  'sign-in',
  async (user) => {
    return await postSignIn({ user });
  },
  'You logged in successfully'
);

export const putEditUserAction = authAction<Partial<PutUser>, ResponseUser>(
  'put-edit-user',
  async (user) => {
    return await putEditUser({ user });
  },
  'Edit was success'
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
