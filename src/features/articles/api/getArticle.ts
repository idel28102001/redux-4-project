import { axios } from '@/lib/axios';
import { ArticleItem } from '@/features/articles/api/types.ts';

interface GetArticle {
  article: ArticleItem;
}

export const getArticle = (slug: string, signal?: AbortSignal) => {
  const url = `articles/${slug}`;
  return axios.get<GetArticle>(url, {
    signal,
  });
};
