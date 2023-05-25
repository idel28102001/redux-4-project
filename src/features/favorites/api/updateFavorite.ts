import { deleteFavorite } from '@/features/favorites/api/deleteFavorite.ts';
import { postFavorite } from '@/features/favorites/api/postFavorite.ts';

export async function updateFavorite(slug: string, method: 'delete' | 'post') {
  switch (method) {
    case 'delete': {
      return await deleteFavorite(slug);
    }
    case 'post': {
      return await postFavorite(slug);
    }
    default:
      throw new Error('Method is not defined');
  }
}
