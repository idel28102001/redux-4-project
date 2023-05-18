import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { AsyncStatus } from '@/types';

interface SignUp {
  error: Array<string>;
  status: AsyncStatus;
}

interface State {
  isAuth: boolean;
  signUp: SignUp;
}

const initialState: State = {
  isAuth: false,
  signUp: {
    error: [],
    status: 'idle',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const actionsAuth = authSlice.actions;

export default authSlice.reducer;
