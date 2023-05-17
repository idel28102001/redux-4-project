import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import ContentLayout from '@/components/Layout/ContentLayout';
import ArticlesPage from '@/features/articles/components/ArticlesPage';
import ArticlePage, { loader as articleLoader } from '@/features/articles/components/ArticlePage/ArticlePage.tsx';
import ErrorPage from '@/features/error/components/ErrorPage';
import NotFoundPage from '@/features/error/components/NotFoundPage';
import SignInPage from '@/features/auth/components/SignInPage';
import SignUpPage from '@/features/auth/components/SignUpPage';
import ProfilePage from '@/features/auth/components/ProfilePage';
import FormLayout from '@/components/Layout/FormLayout';

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
            { index: true, element: <ArticlesPage /> },
            { path: 'articles', element: <ArticlesPage /> },
            {
              path: 'articles/:slug',
              element: <ArticlePage />,
              loader: articleLoader,
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
                  element: <SignInPage />,
                },
                {
                  path: 'sign-up',
                  element: <SignUpPage />,
                },
                {
                  path: 'profile',
                  element: <ProfilePage />,
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

  return <RouterProvider router={router} />;
};
