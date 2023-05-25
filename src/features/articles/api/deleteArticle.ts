import { axios } from '@/lib/axios';

export const deleteArticle = (slug: string, signal?: AbortSignal) => {
  const url = `articles/${slug}`;
  return axios.delete(url, {
    signal,
  });
};
