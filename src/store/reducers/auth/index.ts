import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { AsyncStatus } from '@/types';
import { ErrorDataTypes } from '@/utils/formHandlerHeplers.ts';
import { UserInfo } from '@/features/auth/api/types.ts';
import extraReducers from '@/store/reducers/auth/extraReducers.ts';
import { PutUser } from '@/features/auth/api/putEditUser.ts';

export interface FormSignUpProps {
  username: string;
  email: string;
  password: string;
  confirm: string;
  personal: boolean;
}

export interface FormSignInProps {
  email: string;
  password: string;
}

export type FormEditUserProps = Partial<PutUser>;

interface FormInfo {
  error: ErrorDataTypes;
  status: AsyncStatus;
}

export interface AuthState {
  isLoading: boolean;
  isAuth: boolean;
  form: FormInfo;
  user: UserInfo | null;
}

const initialState: AuthState = {
  isLoading: true,
  isAuth: false,
  user: null,
  form: {
    error: {},
    status: 'idle',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setFirstLoading: (
      state,
      action: PayloadAction<{
        isLoading: boolean;
        user: UserInfo | null;
        isAuth: boolean;
      }>
    ) => {
      state.isAuth = action.payload.isAuth;
      state.isLoading = action.payload.isLoading;
      state.user = action.payload.user;
    },
    clearForm: (state) => {
      state.form.status = 'idle';
      state.form.error = {};
    },
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
    },
  },
  extraReducers,
});

export const selectAuth = (state: RootState) => state.auth;

export const actionsAuth = authSlice.actions;

export default authSlice.reducer;
