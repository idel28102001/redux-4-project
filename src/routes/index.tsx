import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import ContentLayout from '@/components/Layout/ContentLayout';
import lazyArticles from '@/features/articles/components/ArticlesPage';
import ErrorPage from '@/features/error/components/ErrorPage';
import NotFoundPage from '@/features/error/components/NotFoundPage';
import lazyProfile from '@/features/auth/components/ProfilePage';
import FormLayout from '@/components/Layout/FormLayout';
import lazyArticle from '@/features/articles/components/ArticlePage';
import lazySignUp from '@/features/auth/components/SignUpPage';
import lazySignIn from '@/features/auth/components/SignInPage';
import PageLoader from '@/components/Elements/Loaders/PageLoader/PageLoader.tsx';

export const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
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
                {
                  path: 'sign-in',
                  lazy: lazySignIn,
                },

                {
                  path: 'sign-up',
                  lazy: lazySignUp,
                },
                {
                  path: 'profile',
                  lazy: lazyProfile,
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

  return <RouterProvider router={router} fallbackElement={<PageLoader />} />;
};
