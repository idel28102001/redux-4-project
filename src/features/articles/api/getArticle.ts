import { axios } from '@/lib/axios';

export interface Author {
  bio: null;
  username: string;
  image: string;
  following: boolean;
}

export interface ArticleItem {
  slug: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  tagList: Array<string>;
  body: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  title: string;
}

interface GetArticle {
  article: ArticleItem;
}

export const getArticle = (slug: string, signal?: AbortSignal) => {
  const url = `articles/${slug}`;
  return axios.get<GetArticle>(url, {
    signal,
  });
};
