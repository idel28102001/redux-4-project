import lazyProfile from '@/features/auth/components/ProfilePage';
import lazyBlankArticle from '@/features/articles/components/ArticleBlankPage';
import { deleteAction } from '@/features/articles/components/ArticlePage/ArticlePage.tsx';
import { Navigate } from 'react-router-dom';

export const privateRoutes = (isAuth: boolean, author: string | null = null) => {
  if (!isAuth) return { auth: [], articles: [] };
  return {
    articles: [
      { path: 'new-article', lazy: lazyBlankArticle(false, author) },
      {
        path: 'articles/:slug/delete',
        action: deleteAction,
        element: <Navigate to="/" />,
      },
      {
        lazy: lazyBlankArticle(true, author),
        path: 'articles/:slug/edit',
      },
    ],
    auth: [
      {
        path: 'profile',
        lazy: lazyProfile,
      },
    ],
  };
};
