import React from 'react';
import LikeButton from '@/components/Elements/Buttons/LikeButton';
import styles from './LikeCounter.module.scss';
import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { updateFavorite } from '@/features/favorites/api/updateFavorite.ts';
import { useOptimisticLikeCounter } from '@/hooks/useOptimsticLikeCounter.ts';
import { axiosErrorHandler, ErrorBody } from '@/utils/axiosErrorHandler.ts';
import { ArticleItem } from '@/features/articles/api/types.ts';
import MessageHOC from '@/hoc/MessageHOC';

interface LikeCounter
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  amount: number;
  isFavorited: boolean;
  slug: string;
}

export function action(author: null | string) {
  return async function action({ params, request }: ActionFunctionArgs): Promise<ErrorBody<ArticleItem> | any> {
    if (!author) return redirect('/sign-in');
    return axiosErrorHandler(async () => {
      const slug = params.slug || '';
      const method = request.method.toLowerCase() as 'post' | 'delete';
      const result = await updateFavorite(slug, method);
      return { status: 'success', data: result.data.article } as ErrorBody<ArticleItem>;
    });
  };
}

const LikeCounter = ({ slug, amount, isFavorited, ...rest }: LikeCounter) => {
  const { onClick, isSubmitting, isLiked, count, data } = useOptimisticLikeCounter({ amount, isFavorited, slug });
  return (
    <MessageHOC data={data}>
      <div className={styles.root}>
        <LikeButton disabled={isSubmitting} isLiked={isLiked} onClick={onClick} {...rest} />
        <span className={styles.amount}>{count}</span>
      </div>
    </MessageHOC>
  );
};

export default LikeCounter;
