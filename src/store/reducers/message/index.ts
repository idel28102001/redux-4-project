import { MessageInfo } from '@/utils/axiosErrorHandler.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';

type State = {
  message: MessageInfo | null;
};

const initialState: State = {
  message: null,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<MessageInfo | null>) => {
      state.message = action.payload;
    },
    setSuccess: (state, action: PayloadAction<string>) => {
      state.message = { status: 'success', message: action.payload };
    },
    setError: (state, action: PayloadAction<string>) => {
      state.message = { status: 'error', message: action.payload };
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const selectMessage = (state: RootState) => state.message;

export const actionsMessage = messageSlice.actions;
export default messageSlice.reducer;
