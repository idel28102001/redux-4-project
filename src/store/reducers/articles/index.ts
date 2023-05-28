import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { GetArticles, getArticles } from '@/features/articles/api/getArticles.ts';
import { AsyncStatus } from '@/types';
import { ArticleItem } from '@/features/articles/api/types.ts';
import { asyncAction } from '@/store/reducers/actionHelpers.ts';

export const fetchArticles = asyncAction<number, GetArticles>('articles/fetchArticles', async (page, signal) => {
  return await getArticles(page, signal);
});

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
    setIsFavorited: (state, action: PayloadAction<{ slug: string; isFavorited: boolean }>) => {
      const item = state.items.find((e) => e.slug === action.payload.slug);
      if (!item) return;
      item.favorited = action.payload.isFavorited;
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
