import { useArticlesPagination } from '@/hooks/useArticlesPagination.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks.ts';
import { fetchArticles, selectArticles } from '@/store/reducers/articles';
import { useEffect } from 'react';
import { ErrorBody } from '@/utils/axiosErrorHandler.ts';

export const useArticlesPage = () => {
  const { page, setPage, total } = useArticlesPagination();
  const { items, status } = useAppSelector(selectArticles);
  const errors: ErrorBody | undefined =
    status === 'failed'
      ? {
          status: 'error',
          message: 'Something went wrong',
        }
      : undefined;
  const dispatch = useAppDispatch();
  useEffect(() => {
    const controller = new AbortController();
    dispatch(fetchArticles({ page, signal: controller.signal }));
    return () => {
      controller.abort();
    };
  }, [page, dispatch]);
  return { page, setPage, total, items, status, errors };
};
