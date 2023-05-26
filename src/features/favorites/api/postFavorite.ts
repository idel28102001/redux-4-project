import { axios } from '@/lib/axios';
import { ArticleItem } from '@/features/articles/api/types.ts';

interface PostFavoriteResponse {
  article: ArticleItem;
}

export const postFavorite = (slug: string, signal?: AbortSignal) => {
  const url = `articles/${slug}/favorite`;
  return axios.post<PostFavoriteResponse>(url, {
    signal,
  });
};
