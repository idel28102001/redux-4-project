import { axios } from '@/lib/axios';

export const deleteFavorite = (slug: string, signal?: AbortSignal) => {
  const url = `articles/${slug}/favorite`;
  return axios.delete(url, {
    signal,
  });
};
