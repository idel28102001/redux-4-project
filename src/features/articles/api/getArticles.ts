import { axios } from '@/lib/axios';
import { ArticleItem } from '@/features/articles/api/getArticle.ts';

interface GetArticles {
  articles: ArticleItem[];
  articlesCount: number;
}

export const getArticles = (page: number, signal: AbortSignal) => {
  const url = 'articles';
  return axios.get<GetArticles>(url, {
    signal,
    params: {
      limit: 20,
      offset: page * 20,
    },
  });
};
