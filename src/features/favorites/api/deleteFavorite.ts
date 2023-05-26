import { axios } from '@/lib/axios';
import { ArticleItem } from '@/features/articles/api/types.ts';

interface DeleteFavoriteResponse {
  article: ArticleItem;
}

export const deleteFavorite = (slug: string, signal?: AbortSignal) => {
  const url = `articles/${slug}/favorite`;
  return axios.delete<DeleteFavoriteResponse>(url, {
    signal,
  });
};
