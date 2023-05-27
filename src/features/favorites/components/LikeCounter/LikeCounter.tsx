import React from 'react';
import LikeButton from '@/components/Elements/Buttons/LikeButton';
import styles from './LikeCounter.module.scss';
import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { updateFavorite } from '@/features/favorites/api/updateFavorite.ts';
import { useOptimisticLikeCounter } from '@/hooks/useOptimsticLikeCounter.ts';
import { axiosErrorHandler } from '@/utils/axiosErrorHandler.ts';

interface LikeCounter
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  amount: number;
  isFavorited: boolean;
  slug: string;
}

export function action(author: null | string) {
  return async function action({ params, request }: ActionFunctionArgs) {
    if (!author) return redirect('/sign-in');
    return axiosErrorHandler(async () => {
      const slug = params.slug || '';
      const method = request.method.toLowerCase() as 'post' | 'delete';
      const result = await updateFavorite(slug, method);
      return result.data.article;
    });
  };
}

const LikeCounter = ({ slug, amount, isFavorited, ...rest }: LikeCounter) => {
  const { onClick, isSubmitting, isLiked, count } = useOptimisticLikeCounter({ amount, isFavorited, slug });
  return (
    <div className={styles.root}>
      <LikeButton disabled={isSubmitting} isLiked={isLiked} onClick={onClick} {...rest} />
      <span className={styles.amount}>{count}</span>
    </div>
  );
};

export default LikeCounter;
