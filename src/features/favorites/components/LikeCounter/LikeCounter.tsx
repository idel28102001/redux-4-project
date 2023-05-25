import React, { useCallback } from 'react';
import LikeButton from '@/components/Elements/Buttons/LikeButton';
import styles from './LikeCounter.module.scss';
import { ActionFunctionArgs, redirect, useFetcher } from 'react-router-dom';
import { updateFavorite } from '@/features/favorites/api/updateFavorite.ts';

interface LikeCounter
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  amount: number;
  isFavorited: boolean;
  slug: string;
}

export function action(author: null | string) {
  return async function action({ params, request }: ActionFunctionArgs) {
    if (!author) return redirect('/sign-in');
    const slug = params.slug || '';
    const method = request.method.toLowerCase() as 'post' | 'delete';
    return updateFavorite(slug, method);
  };
}

const LikeCounter = ({ slug, amount, isFavorited, ...rest }: LikeCounter) => {
  const fetcher = useFetcher();

  let isLiked = isFavorited;
  if (fetcher.state === 'submitting') {
    isLiked = !isFavorited;
  }
  console.log(fetcher);

  const url = `/articles/${slug}/favorite`;
  const onClick = useCallback(
    () =>
      fetcher.submit(null, {
        method: !isFavorited ? 'post' : 'delete',
        action: url,
      }),
    [isFavorited]
  );
  return (
    <div className={styles.root}>
      <LikeButton disabled={fetcher.state === 'submitting'} isLiked={isLiked} onClick={onClick} {...rest} />
      <span className={styles.amount}>{amount}</span>
    </div>
  );
};

export default LikeCounter;
