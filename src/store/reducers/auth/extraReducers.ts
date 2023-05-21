import { NoInfer } from 'react-redux';
import { ActionReducerMapBuilder, AsyncThunk, createAsyncThunk, Draft, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, FormSignInProps, FormSignUpProps } from '@/store/reducers/auth/index.ts';
import { postSignUp } from '@/features/auth/api/postSignUp.ts';
import { HandleValidateError } from '@/utils/formHandlerHeplers.ts';
import { postSignIn } from '@/features/auth/api/postSignIn.ts';
import { getUser } from '@/features/auth/api/getUser.ts';
import { putEditUser, PutUser } from '@/features/auth/api/putEditUser.ts';

function extraReduceWrapper<R, S extends AuthState, T extends AsyncThunk<R, any, any>>(
  builder: ActionReducerMapBuilder<NoInfer<S>>,
  thunkCB: T & AsyncThunk<R, any, any>,
  fulfilledCB: (state: Draft<S>, action: PayloadAction<R>) => void
) {
  return builder
    .addCase(thunkCB.fulfilled, fulfilledCB)
    .addCase(thunkCB.rejected, (state, action: any) => {
      state.form.status = 'failed';
      state.form.error = action.payload;
    })
    .addCase(thunkCB.pending, (state) => {
      state.form.status = 'loading';
      state.form.error = {};
    });
}

export const signUpAction = createAsyncThunk('auth/sign-up', async (user: FormSignUpProps, thunkAPI) => {
  try {
    const result = await postSignUp({ user });
    return result.data;
  } catch (e) {
    const payload = HandleValidateError(e);
    return thunkAPI.rejectWithValue(payload);
  }
});

export const getUserAction = createAsyncThunk('auth/get-user', async (arg, thunkAPI) => {
  try {
    const result = await getUser();
    return result.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Ошибка');
  }
});

export const putEditUserAction = createAsyncThunk('auth/put-edit-user', async (user: Partial<PutUser>, thunkAPI) => {
  try {
    const result = await putEditUser({ user });
    return result.data;
  } catch (e) {
    const payload = HandleValidateError(e);
    return thunkAPI.rejectWithValue(payload);
  }
});

export const signInAction = createAsyncThunk('auth/sign-in', async (user: FormSignInProps, thunkAPI) => {
  try {
    const result = await postSignIn({ user });
    return result.data;
  } catch (e) {
    const payload = HandleValidateError(e);
    return thunkAPI.rejectWithValue(payload);
  }
});
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
  builder3.addCase(getUserAction.fulfilled, (state, action) => {
    state.user = action.payload.user;
    state.isAuth = true;
  });
  return builder3;
}
