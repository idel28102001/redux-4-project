import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { getArticles } from '@/features/articles/api/getArticles.ts';
import { AsyncStatus } from '@/types';
import { ArticleItem } from '@/features/articles/api/types.ts';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ page, signal }: { page: number; signal: AbortSignal }) => {
    const response = await getArticles(page, signal);
    return response.data;
  }
);

interface State {
  items: Array<ArticleItem>;
  page: number;
  total: number;
  status: AsyncStatus;
  error: string | null;
}

const initialState: State = {
  items: [],
  page: 1,
  total: 50,
  status: 'idle',
  error: null,
};

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.total = action.payload.articlesCount;
        state.items = action.payload.articles;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        if (action.error.code === 'ERR_CANCELED') return;
        state.status = 'failed';
        state.error = action.error.message || 'Что-то пошло не так';
      });
  },
});

export const selectArticles = (state: RootState) => state.articles;

export const actionsArticles = articlesSlice.actions;
export default articlesSlice.reducer;
