import { useArticlesPagination } from '@/hooks/useArticlesPagination.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks.ts';
import { fetchArticles, selectArticles } from '@/store/reducers/articles';
import { useEffect } from 'react';
import { actionThen } from '@/store/reducers/actionHelpers.ts';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionsMessage } from '@/store/reducers/message';

export const useArticlesPage = () => {
  const { page, setPage, total } = useArticlesPagination();
  const { items, status } = useAppSelector(selectArticles);
  const dispatch = useAppDispatch();
  const { setError } = bindActionCreators(actionsMessage, dispatch);
  useEffect(() => {
    const promise = dispatch(fetchArticles(page));
    promise.then(
      actionThen({
        rej: (message) => {
          setError(message);
        },
      })
    );
    return () => {
      promise.abort();
    };
  }, [page, dispatch]);
  return { page, setPage, total, items, status };
};
