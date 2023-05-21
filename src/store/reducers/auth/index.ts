import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { AsyncStatus } from '@/types';
import { ErrorDataTypes } from '@/utils/formHandlerHeplers.ts';
import { UserInfo } from '@/features/auth/api/types.ts';
import extraReducers from '@/store/reducers/auth/extraReducers.ts';

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

interface FormInfo {
  error: ErrorDataTypes;
  status: AsyncStatus;
}

export interface AuthState {
  isAuth: boolean;
  form: FormInfo;
  user: UserInfo | null;
}

const initialState: AuthState = {
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
