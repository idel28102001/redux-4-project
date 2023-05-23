import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import lazyMainLayout from '@/components/Layout/MainLayout';
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
import { privateRoutes } from '@/routes/privateRoutes.ts';
import { publicRoutes } from '@/routes/publicRoutes.ts';

export const AppRoutes = () => {
  const { isLoading, isAuth } = useAppSelector(selectAuth);
  useAuthorization();

  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: '/',
          lazy: lazyMainLayout,
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
                ...privateRoutes(isAuth).articles,
                {
                  path: 'articles/:slug',
                  lazy: lazyArticle,
                },
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
                    ...publicRoutes(isAuth).auth,
                    ...privateRoutes(isAuth).auth,
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
      ]),
    [isAuth]
  );
  if (isLoading) return <PageLoader />;
  return <RouterProvider router={router} fallbackElement={<PageLoader />} />;
};
