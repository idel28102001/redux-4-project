import { useFetcher } from 'react-router-dom';
import { ArticleItem } from '@/features/articles/api/types.ts';
import { useCallback } from 'react';

export function useOptimisticLikeCounter({
  amount,
  isFavorited,
  slug,
}: {
  slug: string;
  isFavorited: boolean;
  amount: number;
}) {
  const fetcher = useFetcher();
  const data = fetcher.data as ArticleItem | undefined;
  if (data) {
    isFavorited = data.favorited;
    amount = data.favoritesCount;
  }
  const isSubmitting = fetcher.state === 'submitting';
  isFavorited = isSubmitting ? !isFavorited : isFavorited;

  const onClick = useCallback(() => {
    const url = `/articles/${slug}/favorite`;
    const method = !isFavorited ? 'post' : 'delete';
    return fetcher.submit(null, {
      method,
      action: url,
    });
  }, [isFavorited]);
  return { onClick, count: amount, isLiked: isFavorited, isSubmitting, data };
}
