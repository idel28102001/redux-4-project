import { bindActionCreators } from '@reduxjs/toolkit';
import { actionsArticles, selectArticles } from '@/store/reducers/articles';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks.ts';

export const useArticlesPagination = () => {
  const { setPage } = bindActionCreators(actionsArticles, useAppDispatch());
  const { page, total } = useAppSelector(selectArticles);
  return { setPage, page, total };
};
