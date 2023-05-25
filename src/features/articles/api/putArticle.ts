import { axios } from '@/lib/axios';
import { Article, ArticleItem } from '@/features/articles/api/types.ts';
import { AxiosResponse } from 'axios';

interface PutArticle {
  article: ArticleItem;
}

interface PutArticleBody {
  article: Article;
}

export interface PutArticleInfo {
  method: 'put';
  body: PutArticleBody;
  response: PutArticle;
}

export const putArticle = (slug: string, body: PutArticleBody, signal?: AbortSignal) => {
  const url = `articles/${slug}`;
  return axios.put<PutArticle, AxiosResponse<PutArticle>, PutArticleBody>(url, body, {
    signal,
  });
};
