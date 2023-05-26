import { useFetcher } from 'react-router-dom';
import { ArticleItem } from '@/features/articles/api/types.ts';
import { useCallback } from 'react';
import { ErrorBody } from '@/utils/axiosErrorHandler.ts';

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
  const data = fetcher.data as ErrorBody<ArticleItem | undefined>;
  if (data && data.data) {
    isFavorited = data.data.favorited;
    amount = data.data.favoritesCount;
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
