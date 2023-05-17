import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';

interface State {
  isAuth: boolean;
}

const initialState: State = {
  isAuth: false,
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
