import { axios } from '@/lib/axios';
import { Article, ArticleItem } from '@/features/articles/api/types.ts';
import { AxiosResponse } from 'axios';

interface PostArticle {
  article: ArticleItem;
}

interface PostArticleBody {
  article: Article;
}

export interface PostArticleInfo {
  method: 'post';
  body: PostArticleBody;
  response: PostArticle;
}

export const postArticle = (body: PostArticleBody, signal?: AbortSignal) => {
  const url = `articles`;
  return axios.post<PostArticle, AxiosResponse<PostArticle>, PostArticleBody>(url, body, {
    signal,
  });
};
