import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ContentLayout from '@/components/Layout/ContentLayout';
import lazyArticles from '@/features/articles/components/ArticlesPage';
import ErrorPage from '@/features/error/components/ErrorPage';
import NotFoundPage from '@/features/error/components/NotFoundPage';
import FormLayout from '@/components/Layout/FormLayout';
import lazyArticle from '@/features/articles/components/ArticlePage';
import PageLoader from '@/components/Elements/Loaders/PageLoader/PageLoader.tsx';
import { useMemo } from 'react';
import { selectAuth } from '@/store/reducers/auth';
import { useAppSelector } from '@/hooks/useStoreHooks.ts';
import { useAuthorization } from '@/hooks/useAuthorization.ts';
import { privateRoutes } from '@/routes/privateRoutes.tsx';
import { publicRoutes } from '@/routes/publicRoutes.tsx';
import { action as likeCounterAction } from '@/features/favorites/components/LikeCounter/LikeCounter.tsx';
import lazyMessageMainLayout from '@/features/pop-messages/components/MessageMainLayout';

export const AppRoutes = () => {
  const { isLoading, user } = useAppSelector(selectAuth);
  const author = user?.username;
  useAuthorization();

  const router = useMemo(() => {
    const isAuth = !!author;
    const privateR = privateRoutes(isAuth, author);
    const publicR = publicRoutes(isAuth);
    return createBrowserRouter([
      {
        path: '/',
        lazy: lazyMessageMainLayout,
        errorElement: <ErrorPage />,
        children: [
          {
            element: <ContentLayout isForm={false} />,
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                lazy: lazyArticles,
              },
              { path: 'articles', lazy: lazyArticles },
              {
                path: 'articles/:slug',
                lazy: lazyArticle,
              },
              {
                action: likeCounterAction(author || null),
                path: 'articles/:slug/favorite',
                element: <Navigate to=".." relative="path" />,
              },
              ...privateR.articles,
              ...publicR.articles,
            ],
          },
          {
            element: <ContentLayout isForm={true} />,
            errorElement: <ErrorPage />,
            children: [
              {
                element: <FormLayout />,
                errorElement: <ErrorPage />,
                children: [
                  ...privateR.auth,
                  ...publicR.auth,
                  {
                    path: '/*',
                    element: <Navigate to="/" />,
                  },
                ],
              },
            ],
          },
          {
            path: '*',
            element: <NotFoundPage />,
          },
        ],
      },
    ]);
  }, [author]);
  if (isLoading) return <PageLoader />;
  return <RouterProvider router={router} fallbackElement={<PageLoader />} />;
};
