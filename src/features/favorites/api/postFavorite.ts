import { axios } from '@/lib/axios';

export const postFavorite = (slug: string, signal?: AbortSignal) => {
  const url = `articles/${slug}/favorite`;
  return axios.post(url, {
    signal,
  });
};
